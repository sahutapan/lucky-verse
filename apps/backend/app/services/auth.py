from decimal import Decimal
from typing import Any
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from jose import jwt, JWTError

from app.core import security
from app.core.config import settings
from app.models.user import User
from app.models.wallet import Wallet
from app.schemas.user import UserCreate
from app.schemas.token import Token
from app.services.wallet import WalletService
from app.utils.referral import get_unique_referral_code, get_user_by_referral_code

class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def authenticate_user(self, email: str, password: str) -> User:
        result = await self.db.execute(select(User).where(User.email == email))
        user = result.scalars().first()
        
        if not user or not security.verify_password(password, user.hashed_password):
            return None
        return user

    async def register_user(self, user_in: UserCreate) -> User:
        result = await self.db.execute(select(User).where(User.email == user_in.email))
        if result.scalars().first():
            raise HTTPException(
                status_code=400,
                detail="The user with this email already exists",
            )

        result = await self.db.execute(select(User).where(User.username == user_in.username))
        if result.scalars().first():
            raise HTTPException(
                status_code=400,
                detail="This username is already taken",
            )

        # Validate referral code if provided
        referred_by_user = None
        if user_in.referral_code:
            referred_by_user = await get_user_by_referral_code(
                self.db,
                user_in.referral_code
            )
            if not referred_by_user:
                raise HTTPException(
                    status_code=400,
                    detail="Invalid referral code",
                )

        # Generate unique referral code for new user
        referral_code = await get_unique_referral_code(self.db)

        user = User(
            email=user_in.email,
            username=user_in.username,
            hashed_password=security.get_password_hash(user_in.password),
            provider="credentials",
            referral_code=referral_code,
            referred_by_id=referred_by_user.id if referred_by_user else None
        )
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)

        # Create wallet for new user
        wallet = Wallet(user_id=user.id)
        self.db.add(wallet)
        await self.db.commit()

        wallet_service = WalletService(self.db)


        signup_bonus = Decimal("5000")
        await wallet_service.update_balance(
            user_id=user.id,
            amount=signup_bonus,
            transaction_type="signup_bonus"
        )
        if referred_by_user:
            referral_bonus = Decimal("1000") 
            await wallet_service.update_balance(
                user_id=user.id,
                amount=referral_bonus,
                transaction_type="join_referral_bonus"
            )
            await wallet_service.update_balance(
                user_id=referred_by_user.id,
                amount=referral_bonus,
                transaction_type="referral_bonus"
            )

        return user

    def create_tokens(self, user_id: Any) -> Token:
        access_token = security.create_access_token(user_id)
        refresh_token = security.create_refresh_token(user_id)
        return Token(
            access_token=access_token,
            refresh_token=refresh_token,
            token_type="bearer"
        )

    async def refresh_access_token(self, refresh_token: str) -> Token:
        try:
            payload = jwt.decode(
                refresh_token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
            )
            token_type = payload.get("type")
            if token_type != "refresh":
                 raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token type",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            user_id = payload.get("sub")
            if user_id is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token payload",
                    headers={"WWW-Authenticate": "Bearer"},
                )
        except JWTError:
             raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
            
        return self.create_tokens(user_id)

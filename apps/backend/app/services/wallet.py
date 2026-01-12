from decimal import Decimal
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.wallet import Wallet
from app.models.transaction import Transaction
from app.models.user import User

class WalletService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_wallet_by_user_id(self, user_id: str) -> Optional[Wallet]:
        result = await self.db.execute(select(Wallet).where(Wallet.user_id == user_id))
        return result.scalars().first()

    async def update_balance(self, user_id: str, amount: Decimal, transaction_type: str, reference_id: Optional[str] = None) -> Wallet:
        """
        Update user wallet balance and log transaction.
        Amount should be positive for deposits/wins and negative for withdrawals/wagers.
        """
        wallet = await self.get_wallet_by_user_id(user_id)
        if not wallet:
            # Should ideally create one if not exists, but for now assume it exists from registration
            raise ValueError("Wallet not found")

        # Check sufficient funds for deductions
        if amount < 0 and (Decimal(str(wallet.balance)) + Decimal(str(amount))) < 0:
            raise ValueError("Insufficient funds")

        # Update balance
        wallet.balance = Decimal(str(wallet.balance)) + Decimal(str(amount))
        self.db.add(wallet)

        # Log transaction
        transaction = Transaction(
            wallet_id=wallet.id,
            type=transaction_type,
            amount=abs(amount),
            status="success",
            reference_id=reference_id
        )
        self.db.add(transaction)
        
        await self.db.commit()
        await self.db.refresh(wallet)
        return wallet

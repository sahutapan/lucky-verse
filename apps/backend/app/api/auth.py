from typing import Any
from fastapi import APIRouter, Depends, HTTPException

from app.utils.deps import get_auth_service
from app.schemas.token import Token
from app.schemas.user import UserCreate, User as UserSchema, LoginRequest, UserRegisterResponse
from app.services.auth import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])

from fastapi.security import OAuth2PasswordRequestForm


@router.post("/login-oauth2", response_model=Token)
async def login_oauth2(
    form_data: OAuth2PasswordRequestForm = Depends(),
    auth_service: AuthService = Depends(get_auth_service)
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    In Swagger UI, use the 'username' field for your email.
    """
    user = await auth_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
        
    return auth_service.create_tokens(user.id)

@router.post("/login", response_model=Token)
async def login(
    form_data: LoginRequest,
    auth_service: AuthService = Depends(get_auth_service)
) -> Any:
    """
    JSON based login for cleaner API usage.
    """
    user = await auth_service.authenticate_user(form_data.email, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
        
    return auth_service.create_tokens(user.id)

@router.post("/register", response_model=UserRegisterResponse)
async def register_user(
    user_in: UserCreate,
    auth_service: AuthService = Depends(get_auth_service),
) -> Any:
    """
    Create new user without the need to be logged in
    """
    user = await auth_service.register_user(user_in)
    tokens = auth_service.create_tokens(user.id)
    return {"user": user, "tokens": tokens}

@router.post("/refresh", response_model=Token)
async def refresh_token(
    refresh_token: str,
    auth_service: AuthService = Depends(get_auth_service),
) -> Any:
    """
    Refresh access token using refresh token
    """
    return await auth_service.refresh_access_token(refresh_token)

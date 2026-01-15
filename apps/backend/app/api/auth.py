from typing import Any
from fastapi import APIRouter, Depends, HTTPException, Response
from app.core.config import settings

from app.utils.deps import get_auth_service
from app.utils.auth import set_auth_cookies
from app.schemas.token import Token
from app.schemas.user import UserCreate, User as UserSchema, LoginRequest, UserRegisterResponse
from app.services.auth import AuthService

router = APIRouter(prefix="/auth", tags=["auth"])

from fastapi.security import OAuth2PasswordRequestForm




@router.post("/login-oauth2", response_model=Token)
async def login_oauth2(
    response: Response,
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
        
    tokens = auth_service.create_tokens(user.id)
    set_auth_cookies(response, tokens)
    return tokens

@router.post("/login", response_model=Token)
async def login(
    response: Response,
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
        
    tokens = auth_service.create_tokens(user.id)
    set_auth_cookies(response, tokens)
    return tokens

@router.post("/register", response_model=UserRegisterResponse)
async def register_user(
    response: Response,
    user_in: UserCreate,
    auth_service: AuthService = Depends(get_auth_service),
) -> Any:
    """
    Create new user without the need to be logged in
    """
    user = await auth_service.register_user(user_in)
    tokens = auth_service.create_tokens(user.id)
    set_auth_cookies(response, tokens)
    return {"user": user, "tokens": tokens}

@router.post("/refresh", response_model=Token)
async def refresh_token(
    response: Response,
    refresh_token: str = None, # Can now be optional in body if provided via cookie
    auth_service: AuthService = Depends(get_auth_service),
) -> Any:
    """
    Refresh access token using refresh token
    """
    tokens = await auth_service.refresh_access_token(refresh_token)
    set_auth_cookies(response, tokens)
    return tokens

@router.post("/logout")
async def logout(response: Response) -> Any:
    """
    Logout by clearing auth cookies.
    """
    response.delete_cookie(
        key=settings.ACCESS_TOKEN_COOKIE_NAME,
        httponly=True,
        samesite=settings.COOKIE_SAMESITE,
        secure=settings.COOKIE_SECURE,
        domain=settings.COOKIE_DOMAIN,
    )
    response.delete_cookie(
        key=settings.REFRESH_TOKEN_COOKIE_NAME,
        httponly=True,
        samesite=settings.COOKIE_SAMESITE,
        secure=settings.COOKIE_SECURE,
        domain=settings.COOKIE_DOMAIN,
    )
    return {"message": "Successfully logged out"}


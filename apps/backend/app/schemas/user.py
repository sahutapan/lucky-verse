from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator

class UserBase(BaseModel):
    email: EmailStr
    username: str

    @field_validator("email")
    @classmethod
    def lowercase_email(cls, v: str) -> str:
        return v.lower()

class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    
    @field_validator("email")
    @classmethod
    def lowercase_email(cls, v: str) -> str:
        return v.lower()

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, max_length=128)
    referral_code: Optional[str] = None  # Optional referral code from a friend

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = Field(None, min_length=8, max_length=128)

class UserInDBBase(UserBase):
    id: int
    is_active: bool
    is_superuser: bool
    elo_rating: int
    provider: str
    referral_code: str  # User's own referral code

    class Config:
        from_attributes = True

class User(UserInDBBase):
    pass

class UserInDB(UserInDBBase):
    hashed_password: str

from app.schemas.token import Token

class UserRegisterResponse(BaseModel):
    user: User
    tokens: Token

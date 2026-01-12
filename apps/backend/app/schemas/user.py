from typing import Optional
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    username: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    password: Optional[str] = None

class UserInDBBase(UserBase):
    id: int
    is_active: bool
    is_superuser: bool
    elo_rating: int
    provider: str

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

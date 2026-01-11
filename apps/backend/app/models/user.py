from sqlalchemy import Column, String, Integer, Boolean
from app.models.base import BaseModel

class User(BaseModel):
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True)
    provider = Column(String, default="credentials") # credentials, google
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    elo_rating = Column(Integer, default=1000)

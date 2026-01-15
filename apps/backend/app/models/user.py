from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class User(BaseModel):
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True)
    provider = Column(String, default="credentials") # credentials, google
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    elo_rating = Column(Integer, default=1000)

    # Referral system
    referral_code = Column(String(8), unique=True, index=True, nullable=False)
    referred_by_id = Column(Integer, ForeignKey("user.id"), nullable=True)

    # Self-referential relationship
    referred_by = relationship("User", remote_side="User.id", backref="referrals", foreign_keys=[referred_by_id])

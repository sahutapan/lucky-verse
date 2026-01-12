from decimal import Decimal
from sqlalchemy import Column, String, Numeric, ForeignKey, Integer
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Wallet(BaseModel):
    user_id = Column(Integer, ForeignKey("user.id"), nullable=False)
    balance = Column(Numeric(10, 2), default=Decimal("0.00"))
    currency = Column(String, default="LVC")

    user = relationship("User", backref="wallet")

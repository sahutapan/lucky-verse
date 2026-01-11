from sqlalchemy import Column, String, Numeric, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Wallet(BaseModel):
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"), nullable=False)
    balance = Column(Numeric(10, 2), default=0.00)
    currency = Column(String, default="LVC")

    user = relationship("User", backref="wallet")

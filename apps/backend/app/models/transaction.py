from sqlalchemy import Column, String, Numeric, ForeignKey, Integer
from app.models.base import BaseModel

class Transaction(BaseModel):
    wallet_id = Column(Integer, ForeignKey("wallet.id"), nullable=False)
    type = Column(String, nullable=False) # deposit, withdrawal, wager, win
    amount = Column(Numeric(10, 2), nullable=False)
    status = Column(String, default="pending") # pending, success, failed
    reference_id = Column(String, nullable=True)

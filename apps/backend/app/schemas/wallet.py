from pydantic import BaseModel
from decimal import Decimal
from typing import Optional

class WalletBalance(BaseModel):
    balance: Decimal
    currency: str

class TransactionCreate(BaseModel):
    amount: Decimal
    method: str # card, upi, crypto

class TransactionResponse(BaseModel):
    transaction_id: str
    status: str
    amount: Decimal
    message: str

from typing import Any
from fastapi import APIRouter, Depends, HTTPException

from app.utils.deps import get_current_user, get_wallet_service
from app.models.user import User
from app.services.wallet import WalletService
from app.services.payment import PaymentService
from app.schemas.wallet import WalletBalance, TransactionCreate, TransactionResponse

router = APIRouter(prefix="/wallet", tags=["wallet"])

@router.get("/balance", response_model=WalletBalance)
async def get_balance(
    current_user: User = Depends(get_current_user),
    wallet_service: WalletService = Depends(get_wallet_service)
) -> Any:
    """
    Get current user's wallet balance.
    """
    wallet = await wallet_service.get_wallet_by_user_id(current_user.id)
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    return {"balance": wallet.balance, "currency": wallet.currency}

@router.post("/deposit", response_model=TransactionResponse)
async def deposit(
    transaction_in: TransactionCreate,
    current_user: User = Depends(get_current_user),
    wallet_service: WalletService = Depends(get_wallet_service)
) -> Any:
    """
    Simulate a deposit (Sandbox).
    """
    if transaction_in.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be positive")

    # 1. Simulate Payment Gateway
    payment_result = PaymentService.initiate_deposit(float(transaction_in.amount), transaction_in.method)
    
    if payment_result["status"] == "success":
        # 2. Update Wallet
        await wallet_service.update_balance(
            user_id=current_user.id,
            amount=transaction_in.amount,
            transaction_type="deposit",
            reference_id=payment_result["transaction_id"]
        )
    
    return {
        "transaction_id": payment_result["transaction_id"],
        "status": payment_result["status"],
        "amount": transaction_in.amount,
        "message": payment_result["message"]
    }

@router.post("/withdraw", response_model=TransactionResponse)
async def withdraw(
    transaction_in: TransactionCreate,
    current_user: User = Depends(get_current_user),
    wallet_service: WalletService = Depends(get_wallet_service)
) -> Any:
    """
    Simulate a withdrawal (Sandbox).
    """
    if transaction_in.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be positive")
    
    try:
        # 1. Deduct from Wallet first (optimistic)
        await wallet_service.update_balance(
            user_id=current_user.id,
            amount=-transaction_in.amount,
            transaction_type="withdrawal"
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # 2. Simulate Payment Gateway Payout
    payment_result = PaymentService.process_withdrawal(
        float(transaction_in.amount), 
        transaction_in.method, 
        {}
    )
    
    return {
        "transaction_id": payment_result["transaction_id"],
        "status": payment_result["status"],
        "amount": transaction_in.amount,
        "message": payment_result["message"]
    }

import uuid
import random
from typing import Dict, Any

class PaymentService:
    """
    Simulates a fake payment gateway.
    """
    
    @staticmethod
    def initiate_deposit(amount: float, method: str) -> Dict[str, Any]:
        """
        Simulate initiating a deposit.
        """
        # Simulate a transaction ID from the "gateway"
        gateway_tx_id = f"PAY-{uuid.uuid4().hex[:12].upper()}"
        
        # Simulate status (mostly success for sandbox, occasional pending/failure)
        rand = random.random()
        if rand < 0.9:
            status = "success"
        elif rand < 0.95:
            status = "pending"
        else:
            status = "failure"
            
        return {
            "transaction_id": gateway_tx_id,
            "status": status,
            "amount": amount,
            "method": method,
            "message": "Payment simulation completed"
        }

    @staticmethod
    def process_withdrawal(amount: float, method: str, details: Dict[str, Any]) -> Dict[str, Any]:
        """
        Simulate processing a withdrawal.
        """
        gateway_tx_id = f"WD-{uuid.uuid4().hex[:12].upper()}"
        
        return {
            "transaction_id": gateway_tx_id,
            "status": "success", # Withdrawals in sandbox are always instant success
            "amount": amount,
            "method": method,
            "message": "Withdrawal processed successfully"
        }

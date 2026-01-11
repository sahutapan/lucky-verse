import hashlib
import hmac
import random
from abc import abstractmethod
from typing import Any, Dict, Tuple
from app.services.game_engine.base import GameEngine

class LuckGameEngine(GameEngine):
    """
    Base class for Luck-Based Games (e.g., Slots, Roulette).
    Implements Provably Fair logic.
    """

    def generate_server_seed(self) -> str:
        """Generate a random server seed."""
        return hashlib.sha256(str(random.getrandbits(256)).encode()).hexdigest()

    def hash_seed(self, seed: str) -> str:
        """Hash the server seed for public display."""
        return hashlib.sha256(seed.encode()).hexdigest()

    def generate_result(self, server_seed: str, client_seed: str, nonce: int) -> float:
        """
        Generate a deterministic float between 0 and 1 using HMAC-SHA256.
        """
        message = f"{client_seed}:{nonce}"
        hmac_obj = hmac.new(server_seed.encode(), message.encode(), hashlib.sha256)
        hex_digest = hmac_obj.hexdigest()
        
        # Take first 8 chars (32 bits) and convert to int
        decimal_value = int(hex_digest[:8], 16)
        
        # Max value of 32 bits is 2^32 - 1
        return decimal_value / (2**32 - 1)

    @abstractmethod
    def play(self, wager: float, client_seed: str, nonce: int) -> Dict[str, Any]:
        """Execute a single round of the game."""
        pass

from typing import Any, Dict, Optional
from app.services.game_engine.luck_engine import LuckGameEngine

class SlotsEngine(LuckGameEngine):
    SYMBOLS = ["🍒", "🍋", "🍊", "🍇", "🔔", "💎", "7️⃣"]
    PAYOUTS = {
        "7️⃣": 50,
        "💎": 20,
        "🔔": 10,
        "🍇": 5,
        "🍊": 3,
        "🍋": 2,
        "🍒": 1
    }

    def get_game_type(self) -> str:
        return "slots"

    def validate_move(self, game_state: Dict[str, Any], move: Dict[str, Any]) -> bool:
        # For slots, a "move" is just a spin request with a wager
        wager = move.get("wager", 0)
        return wager > 0

    def process_move(self, game_state: Dict[str, Any], move: Dict[str, Any]) -> Dict[str, Any]:
        # Not used for single-turn luck games in the same way as skill games
        pass

    def check_game_over(self, game_state: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        return None

    def play(self, wager: float, client_seed: str, nonce: int) -> Dict[str, Any]:
        server_seed = self.generate_server_seed()
        
        # Generate 3 reels
        reels = []
        for i in range(3):
            # Use nonce + i to get different results for each reel from same seed pair
            rand_val = self.generate_result(server_seed, client_seed, nonce + i)
            symbol_index = int(rand_val * len(self.SYMBOLS))
            reels.append(self.SYMBOLS[symbol_index])
            
        # Calculate payout
        payout_multiplier = 0
        if reels[0] == reels[1] == reels[2]:
            payout_multiplier = self.PAYOUTS.get(reels[0], 0)
        elif reels[0] == reels[1] or reels[1] == reels[2] or reels[0] == reels[2]:
             # Small payout for 2 matches? Let's keep it simple: only 3 matches win for now
             pass
             
        winnings = wager * payout_multiplier
        
        return {
            "reels": reels,
            "payout_multiplier": payout_multiplier,
            "winnings": winnings,
            "server_seed": server_seed, # Reveal seed after game
            "hash_seed": self.hash_seed(server_seed), # This would usually be sent BEFORE the game
            "nonce": nonce
        }

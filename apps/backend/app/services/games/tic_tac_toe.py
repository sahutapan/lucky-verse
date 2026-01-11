from typing import Any, Dict, Optional, List
from app.services.game_engine.skill_engine import SkillGameEngine

class TicTacToeEngine(SkillGameEngine):
    def get_game_type(self) -> str:
        return "tic-tac-toe"

    def initialize_game(self, players: list[str]) -> Dict[str, Any]:
        if len(players) != 2:
            raise ValueError("Tic-Tac-Toe requires exactly 2 players")
        return {
            "board": [None] * 9, # Flat list representation
            "turn": players[0],
            "players": {players[0]: "X", players[1]: "O"},
            "winner": None,
            "is_draw": False
        }

    def validate_move(self, game_state: Dict[str, Any], move: Dict[str, Any]) -> bool:
        player = move.get("player")
        position = move.get("position")

        if game_state["winner"] or game_state["is_draw"]:
            return False
        
        if player != game_state["turn"]:
            return False
            
        if not (0 <= position < 9):
            return False
            
        if game_state["board"][position] is not None:
            return False
            
        return True

    def process_move(self, game_state: Dict[str, Any], move: Dict[str, Any]) -> Dict[str, Any]:
        player = move.get("player")
        position = move.get("position")
        
        # Update board
        symbol = game_state["players"][player]
        game_state["board"][position] = symbol
        
        # Check game over
        result = self.check_game_over(game_state)
        if result:
            game_state["winner"] = result.get("winner")
            game_state["is_draw"] = result.get("is_draw", False)
        else:
            # Switch turn
            players = list(game_state["players"].keys())
            next_player = players[1] if players[0] == player else players[0]
            game_state["turn"] = next_player
            
        return game_state

    def check_game_over(self, game_state: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        board = game_state["board"]
        winning_combinations = [
            (0, 1, 2), (3, 4, 5), (6, 7, 8), # Rows
            (0, 3, 6), (1, 4, 7), (2, 5, 8), # Cols
            (0, 4, 8), (2, 4, 6)             # Diagonals
        ]
        
        for a, b, c in winning_combinations:
            if board[a] and board[a] == board[b] == board[c]:
                # Find player who owns this symbol
                symbol = board[a]
                winner_id = next(pid for pid, sym in game_state["players"].items() if sym == symbol)
                return {"winner": winner_id, "is_draw": False}
        
        if all(cell is not None for cell in board):
            return {"winner": None, "is_draw": True}
            
        return None

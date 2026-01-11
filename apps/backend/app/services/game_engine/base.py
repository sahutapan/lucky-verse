from abc import ABC, abstractmethod
from typing import Any, Dict, Optional

class GameEngine(ABC):
    """
    Abstract Base Class for all Game Engines.
    """
    
    @abstractmethod
    def get_game_type(self) -> str:
        """Return the unique identifier for the game type."""
        pass

    @abstractmethod
    def validate_move(self, game_state: Dict[str, Any], move: Dict[str, Any]) -> bool:
        """Validate if a move is legal in the current state."""
        pass

    @abstractmethod
    def process_move(self, game_state: Dict[str, Any], move: Dict[str, Any]) -> Dict[str, Any]:
        """Process a move and return the new game state."""
        pass

    @abstractmethod
    def check_game_over(self, game_state: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Check if the game has ended and return results if so."""
        pass

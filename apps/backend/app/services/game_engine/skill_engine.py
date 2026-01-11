from abc import abstractmethod
from typing import Any, Dict
from app.services.game_engine.base import GameEngine

class SkillGameEngine(GameEngine):
    """
    Base class for Skill-Based Games (e.g., Tic-Tac-Toe, Chess).
    """
    
    @abstractmethod
    def initialize_game(self, players: list[str]) -> Dict[str, Any]:
        """Initialize a new game session with players."""
        pass

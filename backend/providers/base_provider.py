from abc import ABC, abstractmethod
from typing import Dict, Any, List, Optional
import time

class BaseTravelProvider(ABC):
    """
    Abstract base class for all travel research data providers.
    Enforces timeout, error handling, and structured data contracts.
    """
    def __init__(self, name: str, timeout: int = 8):
        self.name = name
        self.timeout = timeout
        self.headers = {
            "User-Agent": "WanderAgent-IndiaTravelPlanner/2.0 (student.project@college.edu; travel research)",
            "Accept": "application/json"
        }

    @abstractmethod
    def health_check(self) -> bool:
        """Verifies if the upstream provider is accessible."""
        pass

from pydantic_settings import BaseSettings
from typing import List
import os

class Settings(BaseSettings):
    # Firebase Admin SDK
    FIREBASE_CREDENTIALS_PATH: str = "serviceAccountKey.json"
    
    # CORS - Parse from comma-separated string or use default
    ALLOWED_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000"
    
    # API Settings
    API_V1_PREFIX: str = "/api"
    PROJECT_NAME: str = "VAANI Auth API"
    
    @property
    def allowed_origins_list(self) -> List[str]:
        """Convert comma-separated string to list"""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

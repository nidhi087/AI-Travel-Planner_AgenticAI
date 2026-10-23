import os
from dotenv import load_dotenv

# Load variables from .env file explicitly
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
load_dotenv(env_path)

class Config:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()
    PORT = int(os.getenv("PORT", 5000))
    FLASK_ENV = os.getenv("FLASK_ENV", "development")
    DEBUG = FLASK_ENV == "development"
    
    # Model configuration
    # Updated to gemini-3.8-flash for active Gemini API accounts
    DEFAULT_MODEL = "gemini-3.8-flash"
    FALLBACK_MODEL = "gemini-2.0-flash"

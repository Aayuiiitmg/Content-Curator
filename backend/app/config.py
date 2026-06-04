from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    OPERNROUTER_API_KEY: str
    OPENROUTER_MODEL: str
    OPENROUTER_BASE_URL: str

    APP_NAME: str = 'CONTENT CURATOR'
    APP_VERSION: str = '1.0.0'
    DEBUG: bool = True

    CORS_ORIGIN: list[str] = ["http://localhost:3000"]

    TEMP_DIR: Path = Path("temp")
    MAX_UPLOAD_SIZE_MB: int = 20
    ALLOWED_EXTENSIONS: list[str] = ["pdf", "docx", "pptx", "eml", "txt"]

    LLM_MAX_OUTPUT_TOKENS: int = 8192
    LLM_TEMPERATURE: float = 0.7

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
settings.TEMP_DIR.mkdir(parents=True, exist_ok=True)
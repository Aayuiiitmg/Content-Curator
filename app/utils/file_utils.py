import os
import uuid
import mimetypes
from pathlib import Path
from typing import Optional
from fastapi import UploadFile

from app.config import settings

ALLOWED_MIME_TYPES = {
    "application/pdf": ".pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": ".pptx",
    "text/plain": ".txt",
    "message/rfc822": ".eml",
}

EXTENSION_TO_TYPE = {v: k for k, v in ALLOWED_MIME_TYPES.items()}


def detect_mime_type(filename: str, content_type: Optional[str] = None) -> str:
    """Detect MIME type from filename extension, falling back to provided content_type."""
    ext = Path(filename).suffix.lower()
    if ext in EXTENSION_TO_TYPE:
        return EXTENSION_TO_TYPE[ext]
    if content_type:
        return content_type
    guessed, _ = mimetypes.guess_type(filename)
    return guessed or "application/octet-stream"


def is_allowed_file(mime_type: str) -> bool:
    return mime_type in ALLOWED_MIME_TYPES


def generate_temp_path(suffix: str = "") -> Path:
    """Generate a unique temp file path."""
    filename = f"{uuid.uuid4().hex}{suffix}"
    return Path(settings.temp_dir) / filename


async def save_upload_file(upload_file: UploadFile) -> Path:
    """Save an uploaded file to temp directory. Returns the path."""
    ext = Path(upload_file.filename or "file").suffix.lower()
    temp_path = generate_temp_path(suffix=ext)
    content = await upload_file.read()
    temp_path.write_bytes(content)
    return temp_path


def cleanup_temp_file(path: Path) -> None:
    """Safely delete a temp file."""
    try:
        if path.exists():
            os.remove(path)
    except OSError:
        pass


def get_file_extension(mime_type: str) -> str:
    return ALLOWED_MIME_TYPES.get(mime_type, ".bin")

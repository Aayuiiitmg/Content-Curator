from pydantic import BaseModel, Field
from typing import Optional


class UploadResponse(BaseModel):
    session_id: str = Field(..., description="Unique session ID for this upload")
    filename: str
    mime_type: str
    char_count: int
    preview: str = Field(..., description="First 300 chars of extracted text")
    message: str = "File ingested successfully"


class ExtractedContent(BaseModel):
    session_id: str
    raw_text: str
    source_filename: Optional[str] = None
    mime_type: Optional[str] = None


class PasteRequest(BaseModel):
    text: str = Field(..., min_length=10, description="Raw email or plain text to ingest")
    label: Optional[str] = Field(default=None, description="Optional label for this content")

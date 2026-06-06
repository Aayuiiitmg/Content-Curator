from pathlib import Path
from app.services.ingestion.pdf_ingestor import extract_text_from_pdf
from app.services.ingestion.docx_ingestor import extract_text_from_docx
from app.services.ingestion.pptx_ingestor import extract_text_from_pptx
from app.services.ingestion.email_ingestor import extract_text_from_email, extract_text_from_plain


MIME_HANDLER_MAP = {
    "application/pdf": extract_text_from_pdf,
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": extract_text_from_docx,
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": extract_text_from_pptx,
    "message/rfc822": extract_text_from_email,
}


def dispatch_ingestion(file_path: Path, mime_type: str) -> str:
    """Route file to the correct ingestor based on MIME type."""
    handler = MIME_HANDLER_MAP.get(mime_type)
    if handler is None:
        # Fallback: try reading as plain text
        try:
            return extract_text_from_plain(file_path.read_text(encoding="utf-8", errors="ignore"))
        except Exception as e:
            raise ValueError(f"Unsupported file type: {mime_type}") from e
    return handler(file_path)

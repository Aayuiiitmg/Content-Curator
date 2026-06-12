import uuid
from pathlib import Path
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import JSONResponse

from backend.app.schemas.ingestion import UploadResponse, ExtractedContent, PasteRequest
from backend.app.services.ingestion.dispatcher import dispatch_ingestion
from backend.app.services.ingestion.email_ingestor import extract_text_from_plain
from backend.app.utils.file_utils import detect_mime_type, is_allowed_file, save_upload_file, cleanup_temp_file
from backend.app.utils.logger import logger
from backend.app.config import settings
from backend.app.services.ingestion.session_store import session_store

router = APIRouter(prefix="/ingest", tags=["Ingestion"])


@router.post("/upload", response_model=UploadResponse)
async def upload_file(
    file: UploadFile = File(...),
):
    """Upload a PDF, DOCX, PPTX, or .eml file and extract its text."""
    if file.size and file.size > settings.max_upload_bytes:
        raise HTTPException(413, f"File too large (max {settings.max_upload_size_mb} MB)")

    mime = detect_mime_type(file.filename or "", file.content_type)
    if not is_allowed_file(mime):
        raise HTTPException(
            415,
            f"Unsupported file type: {mime}. Allowed: PDF, DOCX, PPTX, EML, TXT",
        )

    temp_path: Path | None = None
    try:
        temp_path = await save_upload_file(file)
        text = dispatch_ingestion(temp_path, mime)
    except ValueError as e:
        raise HTTPException(422, str(e))
    except Exception as e:
        logger.exception("Ingestion failed")
        raise HTTPException(500, f"Ingestion error: {e}")
    finally:
        if temp_path:
            cleanup_temp_file(temp_path)

    if not text.strip():
        raise HTTPException(422, "No text could be extracted from the file.")

    session_id = uuid.uuid4().hex
    session_store.set(session_id, ExtractedContent(
        session_id=session_id,
        raw_text=text,
        source_filename=file.filename,
        mime_type=mime,
    ))
    logger.info(f"Ingested file={file.filename} session={session_id} chars={len(text)}")

    return UploadResponse(
        session_id=session_id,
        filename=file.filename or "unknown",
        mime_type=mime,
        char_count=len(text),
        preview=text[:300],
    )


@router.post("/paste", response_model=UploadResponse)
async def paste_text(
    body: PasteRequest,
):
    """Accept pasted email or plain text."""
    text = extract_text_from_plain(body.text)
    if len(text) < 10:
        raise HTTPException(422, "Text too short after cleaning.")

    session_id = uuid.uuid4().hex
    session_store.set(session_id, ExtractedContent(
        session_id=session_id,
        raw_text=text,
        source_filename=body.label or "pasted_text",
        mime_type="text/plain",
    ))
    logger.info(f"Pasted text session={session_id} chars={len(text)}")

    return UploadResponse(
        session_id=session_id,
        filename=body.label or "pasted_text",
        mime_type="text/plain",
        char_count=len(text),
        preview=text[:300],
    )


@router.get("/session/{session_id}", response_model=ExtractedContent)
async def get_session(session_id: str):
    content = session_store.get(session_id)
    if not content:
        raise HTTPException(404, f"Session {session_id} not found.")
    return content

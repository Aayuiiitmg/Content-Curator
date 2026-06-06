from fastapi import APIRouter, HTTPException, Depends

from backend.app.schemas.generation import (
    GenerationRequest,
    OutlineResponse,
    GenerationResponse,
)
from backend.app.services.llm.outline_generator import generate_outline
from backend.app.services.llm.slide_generator import generate_slides
from backend.app.api.ingestion import get_session_store
from backend.app.utils.logger import logger

router = APIRouter(prefix="/generate", tags=["Generation"])

# In-memory presentation store
_presentation_store: dict[str, GenerationResponse] = {}


def get_presentation_store():
    return _presentation_store


@router.post("/outline", response_model=OutlineResponse)
async def create_outline(
    req: GenerationRequest,
    session_store: dict = Depends(get_session_store),
):
    """Generate a slide outline from ingested content."""
    content_obj = session_store.get(req.session_id)
    if not content_obj:
        raise HTTPException(404, f"Session {req.session_id} not found. Ingest content first.")

    try:
        outline = await generate_outline(
            content=content_obj.raw_text,
            num_slides=req.num_slides,
            audience=req.audience or "general audience",
            tone=req.tone or "professional",
            focus=req.focus or "key insights",
            session_id=req.session_id,
        )
    except Exception as e:
        logger.exception("Outline generation failed")
        raise HTTPException(500, f"Outline generation failed: {e}")

    return outline


@router.post("/slides", response_model=GenerationResponse)
async def create_slides(
    req: GenerationRequest,
    session_store: dict = Depends(get_session_store),
    pres_store: dict = Depends(get_presentation_store),
):
    """Generate full slide content (outline + per-slide) from ingested content."""
    content_obj = session_store.get(req.session_id)
    if not content_obj:
        raise HTTPException(404, f"Session {req.session_id} not found. Ingest content first.")

    try:
        outline = await generate_outline(
            content=content_obj.raw_text,
            num_slides=req.num_slides,
            audience=req.audience or "general audience",
            tone=req.tone or "professional",
            focus=req.focus or "key insights",
            session_id=req.session_id,
        )
        slides = await generate_slides(
            outline_items=outline.outline,
            presentation_title=outline.title,
            source_content=content_obj.raw_text,
            audience=req.audience or "general audience",
            tone=req.tone or "professional",
        )
    except Exception as e:
        logger.exception("Slide generation failed")
        raise HTTPException(500, f"Slide generation failed: {e}")

    result = GenerationResponse(
        session_id=req.session_id,
        presentation_title=outline.title,
        slides=slides,
        total_slides=len(slides),
    )
    pres_store[req.session_id] = result
    logger.info(f"Generated {len(slides)} slides for session={req.session_id}")
    return result


@router.get("/slides/{session_id}", response_model=GenerationResponse)
async def get_slides(
    session_id: str,
    pres_store: dict = Depends(get_presentation_store),
):
    """Retrieve previously generated slides."""
    result = pres_store.get(session_id)
    if not result:
        raise HTTPException(404, f"No slides found for session {session_id}.")
    return result

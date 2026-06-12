from typing import List
from backend.app.services.llm.client import llm_client
from backend.app.services.llm.prompts import OUTLINE_SYSTEM, OUTLINE_USER
from backend.app.schemas.generation import OutlineResponse, OutlineItem
from backend.app.utils.logger import logger

MAX_CONTENT_CHARS = 6000  # Trim content to stay within context window


async def generate_outline(
    content: str,
    num_slides: int = 8,
    audience: str = "general",
    tone: str = "professional",
    focus: str = "key insights",
    session_id: str = "",
) -> OutlineResponse:
    """Generate a structured slide outline from source content."""

    # Trim content to avoid exceeding context window
    trimmed = content[:MAX_CONTENT_CHARS]
    if len(content) > MAX_CONTENT_CHARS:
        logger.info(f"Content trimmed from {len(content)} to {MAX_CONTENT_CHARS} chars")

    user_prompt = OUTLINE_USER.format(
        num_slides=num_slides,
        audience=audience or "general audience",
        tone=tone or "professional",
        focus=focus or "key insights and findings",
        content=trimmed,
    )

    data = await llm_client.chat_json(
        system_prompt=OUTLINE_SYSTEM,
        user_prompt=user_prompt,
        max_tokens=4000,
        temperature=0.5
    )

    outline_items = [OutlineItem(**item) for item in data.get("outline", [])]
    return OutlineResponse(
        session_id=session_id,
        title=data.get("title", "Untitled Presentation"),
        outline=outline_items,
        total_slides=len(outline_items),
    )

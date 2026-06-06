import json
import asyncio
from typing import List
from backend.app.services.llm.client import llm_client
from backend.app.services.llm.prompts import SLIDE_SYSTEM, SLIDE_USER, SLIDE_EDIT_SYSTEM, SLIDE_EDIT_USER
from backend.app.schemas.slide import SlideContent
from backend.app.schemas.generation import OutlineItem
from backend.app.utils.logger import logger

CONCURRENCY = 3  # Generate N slides at a time to avoid rate limits


async def _generate_single_slide(
    outline_item: OutlineItem,
    presentation_title: str,
    audience: str,
    tone: str,
    source_excerpt: str,
) -> SlideContent:
    user_prompt = SLIDE_USER.format(
        presentation_title=presentation_title,
        audience=audience,
        tone=tone,
        slide_number=outline_item.slide_number,
        title=outline_item.title,
        purpose=outline_item.purpose,
        key_points=", ".join(outline_item.key_points),
        source_excerpt=source_excerpt[:1500],
    )
    data = await llm_client.chat_json(
        system_prompt=SLIDE_SYSTEM,
        user_prompt=user_prompt,
        max_tokens=800,
    )
    return SlideContent(**data)


async def generate_slides(
    outline_items: List[OutlineItem],
    presentation_title: str,
    source_content: str,
    audience: str = "general",
    tone: str = "professional",
) -> List[SlideContent]:
    """Generate all slide contents from outline items, with limited concurrency."""
    semaphore = asyncio.Semaphore(CONCURRENCY)
    excerpt = source_content[:4000]

    async def guarded(item: OutlineItem) -> SlideContent:
        async with semaphore:
            try:
                return await _generate_single_slide(
                    item, presentation_title, audience, tone, excerpt
                )
            except Exception as e:
                logger.error(f"Failed to generate slide {item.slide_number}: {e}")
                # Return a placeholder slide on error
                return SlideContent(
                    slide_number=item.slide_number,
                    title=item.title,
                    bullets=item.key_points[:5],
                    speaker_notes="[Generation failed — edit manually]",
                )

    tasks = [guarded(item) for item in outline_items]
    slides = await asyncio.gather(*tasks)
    return sorted(slides, key=lambda s: s.slide_number)


async def edit_slide(
    current_slide: SlideContent,
    instruction: str,
) -> SlideContent:
    """Edit a single slide based on a natural language instruction."""
    user_prompt = SLIDE_EDIT_USER.format(
        instruction=instruction,
        current_slide_json=json.dumps(current_slide.model_dump(), indent=2),
        slide_number=current_slide.slide_number,
    )
    data = await llm_client.chat_json(
        system_prompt=SLIDE_EDIT_SYSTEM,
        user_prompt=user_prompt,
        max_tokens=800,
    )
    return SlideContent(**data)

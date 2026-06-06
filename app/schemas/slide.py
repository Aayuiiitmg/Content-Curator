from pydantic import BaseModel, Field
from typing import List, Optional


class SlideContent(BaseModel):
    slide_number: int
    title: str
    bullets: List[str] = Field(default_factory=list)
    speaker_notes: Optional[str] = None
    layout: Optional[str] = Field(
        default="bullets",
        description="Layout hint: bullets | two_column | big_stat | image_text | title_only",
    )
    visual_suggestion: Optional[str] = Field(
        default=None, description="Suggestion for image or icon to include"
    )


class SlideUpdateRequest(BaseModel):
    session_id: str
    slide_number: int
    instruction: str = Field(..., description="Natural language instruction for what to change")
    current_slide: SlideContent


class SlideRegenerateRequest(BaseModel):
    session_id: str
    slide_number: int
    context: Optional[str] = Field(
        default=None, description="Additional context for regeneration"
    )

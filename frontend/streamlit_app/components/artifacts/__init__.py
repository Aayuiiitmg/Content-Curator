"""
Artifacts Module

Contains viewers for all artifact types:
- Presentation
- Document
- SOP
- Handbook
- Spreadsheet
- Video
- Podcast
"""

from .presentation import render_presentation
from .document import render_document
from .sop import render_sop
from .handbook import render_handbook
from .spreadsheet import render_spreadsheet
from .video import render_video
from .podcast import render_podcast

__all__ = [
    "render_presentation",
    "render_document",
    "render_sop",
    "render_handbook",
    "render_spreadsheet",
    "render_video",
    "render_podcast",
]

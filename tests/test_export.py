import pytest
from pathlib import Path
from app.schemas.slide import SlideContent
from app.services.generation.pptx_builder import build_pptx
from app.services.generation.pdf_builder import build_pdf
from app.utils.file_utils import cleanup_temp_file

SAMPLE_SLIDES = [
    SlideContent(
        slide_number=1,
        title="Q3 Performance Overview",
        bullets=["Record $45M revenue", "+22% growth YoY", "12,000 active users"],
        speaker_notes="This was our best quarter ever.",
        layout="bullets",
    ),
    SlideContent(
        slide_number=2,
        title="Key Metric",
        bullets=["22%", "Year-over-year revenue growth", "Driven by enterprise segment"],
        speaker_notes="Revenue growth accelerated.",
        layout="big_stat",
    ),
    SlideContent(
        slide_number=3,
        title="Next Steps",
        bullets=["Reach $52M in Q4", "Close Series B", "Expand to APAC"],
        speaker_notes="Ambitious but achievable.",
        layout="bullets",
    ),
]


def test_build_pptx_creates_file():
    path = build_pptx(SAMPLE_SLIDES, "Q3 Report", theme_name="midnight_executive")
    try:
        assert path.exists()
        assert path.suffix == ".pptx"
        assert path.stat().st_size > 0
    finally:
        cleanup_temp_file(path)


def test_build_pptx_all_themes():
    themes = ["midnight_executive", "forest_moss", "coral_energy", "charcoal_minimal"]
    for theme in themes:
        path = build_pptx(SAMPLE_SLIDES, "Test Deck", theme_name=theme)
        try:
            assert path.exists(), f"Theme {theme} failed"
        finally:
            cleanup_temp_file(path)


def test_build_pdf_creates_file():
    path = build_pdf(SAMPLE_SLIDES, "Q3 Report", theme_name="midnight_executive")
    try:
        assert path.exists()
        assert path.stat().st_size > 0
    finally:
        cleanup_temp_file(path)

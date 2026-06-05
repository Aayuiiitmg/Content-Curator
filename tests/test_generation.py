import pytest
from unittest.mock import AsyncMock, patch
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.schemas.generation import OutlineResponse, OutlineItem
from app.schemas.slide import SlideContent


SAMPLE_TEXT = """
Q3 2024 Business Performance Report

Executive Summary:
Our company achieved record revenue of $45M in Q3, up 22% year-over-year.
Customer base expanded to 12,000 active users across 35 countries.
We launched 3 major product features: AI Assistant, Advanced Analytics, and Team Collaboration.

Key Metrics:
- Revenue: $45M (+22% YoY)
- New Customers: 2,400
- Churn Rate: 1.8% (down from 2.4%)
- NPS Score: 72

Challenges:
Infrastructure costs rose 18% due to AI workload expansion.
Hiring targets were missed by 15% due to competitive talent market.

Outlook:
Q4 revenue target: $52M
Planning Series B fundraise of $30M
Expanding to APAC market in Q1 2025
"""

MOCK_OUTLINE = OutlineResponse(
    session_id="test_session",
    title="Q3 2024 Business Performance",
    outline=[
        OutlineItem(
            slide_number=1,
            title="Q3 2024 Overview",
            purpose="Set the stage",
            key_points=["Record revenue", "Growth metrics", "Key achievements"],
        ),
        OutlineItem(
            slide_number=2,
            title="Financial Highlights",
            purpose="Show revenue growth",
            key_points=["$45M revenue", "+22% YoY", "Profitability"],
        ),
        OutlineItem(
            slide_number=3,
            title="Next Steps",
            purpose="Outline Q4 plan",
            key_points=["$52M target", "Series B", "APAC expansion"],
        ),
    ],
    total_slides=3,
)

MOCK_SLIDES = [
    SlideContent(
        slide_number=1,
        title="Q3 2024 Overview",
        bullets=["Record $45M revenue", "+22% year-over-year growth"],
        speaker_notes="Strong quarter across all metrics.",
    ),
    SlideContent(
        slide_number=2,
        title="Financial Highlights",
        bullets=["$45M revenue achieved", "12,000 active users"],
        speaker_notes="Revenue driven by enterprise segment.",
    ),
    SlideContent(
        slide_number=3,
        title="Next Steps",
        bullets=["Target $52M in Q4", "Series B fundraise of $30M"],
        speaker_notes="Ambitious but achievable targets.",
    ),
]


@pytest.mark.asyncio
async def test_generate_outline():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        # First ingest
        paste_resp = await ac.post(
            "/api/v1/ingest/paste",
            json={"text": SAMPLE_TEXT},
        )
        session_id = paste_resp.json()["session_id"]

        with patch(
            "app.api.generation.generate_outline",
            new_callable=AsyncMock,
            return_value=MOCK_OUTLINE,
        ):
            resp = await ac.post(
                "/api/v1/generate/outline",
                json={"session_id": session_id, "num_slides": 3},
            )

    assert resp.status_code == 200
    data = resp.json()
    assert "outline" in data
    assert len(data["outline"]) == 3


@pytest.mark.asyncio
async def test_generate_slides():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        paste_resp = await ac.post(
            "/api/v1/ingest/paste",
            json={"text": SAMPLE_TEXT},
        )
        session_id = paste_resp.json()["session_id"]

        with patch(
            "app.api.generation.generate_outline",
            new_callable=AsyncMock,
            return_value=MOCK_OUTLINE,
        ), patch(
            "app.api.generation.generate_slides",
            new_callable=AsyncMock,
            return_value=MOCK_SLIDES,
        ):
            resp = await ac.post(
                "/api/v1/generate/slides",
                json={"session_id": session_id, "num_slides": 3},
            )

    assert resp.status_code == 200
    data = resp.json()
    assert data["total_slides"] == 3
    assert len(data["slides"]) == 3

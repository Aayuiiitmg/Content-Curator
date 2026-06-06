import io
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.mark.asyncio
async def test_paste_text():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post(
            "/api/v1/ingest/paste",
            json={"text": "This is a sample business report about Q3 earnings. Revenue grew by 15% YoY. Customer acquisition was strong across all regions. We plan to expand into APAC next quarter."},
        )
    assert response.status_code == 200
    data = response.json()
    assert "session_id" in data
    assert data["char_count"] > 0


@pytest.mark.asyncio
async def test_paste_text_too_short():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post(
            "/api/v1/ingest/paste",
            json={"text": "hi"},
        )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_get_session_not_found():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/api/v1/ingest/session/nonexistent_session_id")
    assert response.status_code == 404


@pytest.mark.asyncio
async def test_upload_unsupported_type():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post(
            "/api/v1/ingest/upload",
            files={"file": ("test.xyz", b"fake content", "application/octet-stream")},
        )
    assert response.status_code == 415

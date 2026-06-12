# backend/app/services/ingestion/session_store.py
import json
import threading
from pathlib import Path
from backend.app.config import settings
from backend.app.schemas.ingestion import ExtractedContent

SESSION_FILE = Path(settings.temp_dir) / "sessions.json"
SESSION_FILE.parent.mkdir(parents=True, exist_ok=True)
_lock = threading.Lock()


class SessionStore:
    def get(self, session_id: str) -> ExtractedContent | None:
        data = self._read()
        entry = data.get(session_id)
        return ExtractedContent(**entry) if entry else None

    def set(self, session_id: str, content: ExtractedContent):
        with _lock:
            data = self._read()
            data[session_id] = content.model_dump()
            self._write(data)

    def _read(self) -> dict:
        if not SESSION_FILE.exists():
            return {}
        with open(SESSION_FILE, "r") as f:
            return json.load(f)

    def _write(self, data: dict):
        with open(SESSION_FILE, "w") as f:
            json.dump(data, f, indent=2, default=str)


session_store = SessionStore()
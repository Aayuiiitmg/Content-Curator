# Content Curator 🎯

AI-powered presentation generator. Upload a PDF, DOCX, PPTX, or paste text — get a polished slide deck in seconds.

## Tech Stack

- **Backend**: FastAPI + Python 3.11+
- **LLM**: OpenRouter (free tier — `mistralai/mistral-7b-instruct:free`)
- **File parsing**: PyMuPDF, python-docx, python-pptx
- **Export**: python-pptx (PPTX), ReportLab (PDF)
- **Deploy**: Render (free tier)

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/yourname/content-curator
cd content-curator
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# 2. Configure
cp .env.example .env
# Edit .env — add your OPENROUTER_API_KEY

# 3. Run
uvicorn app.main:app --reload
```

API docs at http://localhost:8000/docs

## Get a Free OpenRouter Key

1. Sign up at https://openrouter.ai
2. Go to Keys → Create Key
3. Free models available: `mistralai/mistral-7b-instruct:free`, `google/gemma-3-4b-it:free`
4. Add to `.env` as `OPENROUTER_API_KEY=sk-or-...`

## API Flow

```
POST /api/v1/ingest/upload        → { session_id }
POST /api/v1/ingest/paste         → { session_id }

POST /api/v1/generate/outline     → { outline[] }
POST /api/v1/generate/slides      → { slides[] }

PATCH /api/v1/slides/edit         → { updated_slide }
PUT  /api/v1/slides/{id}/{num}    → { slide }

POST /api/v1/export               → { download_url }
GET  /api/v1/export/download/{f}  → file download
```

## Themes

| Theme | Primary | Use Case |
|-------|---------|----------|
| `midnight_executive` | Navy `#1E2761` | Corporate / Finance |
| `forest_moss` | Forest `#2C5F2D` | Sustainability / Nature |
| `coral_energy` | Coral `#F96167` | Startup / Marketing |
| `charcoal_minimal` | Charcoal `#36454F` | Minimal / Design |

## Running Tests

```bash
pytest tests/ -v
```

## Deploy to Render

1. Push to GitHub
2. Connect repo in Render dashboard
3. Set `OPENROUTER_API_KEY` in Environment
4. Deploy — `render.yaml` handles the rest

## Project Structure

```
app/
├── main.py              # FastAPI app + CORS + routes
├── config.py            # Settings via pydantic-settings
├── api/                 # Route handlers
│   ├── ingestion.py     # Upload / paste endpoints
│   ├── generation.py    # Outline + slides endpoints
│   ├── slides.py        # Edit / update slide endpoints
│   └── export.py        # PPTX / PDF export endpoints
├── services/
│   ├── ingestion/       # PDF, DOCX, PPTX, email parsers
│   ├── llm/             # OpenRouter client + prompt templates
│   └── generation/      # python-pptx builder + PDF builder
├── schemas/             # Pydantic request/response models
└── utils/               # Logger, file utilities
```

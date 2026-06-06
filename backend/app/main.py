from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import os

from backend.app.config import settings
from backend.app.utils.logger import setup_logger, logger
from backend.app.api import ingestion_router, generation_router, slides_router, export_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logger(debug=settings.debug)
    os.makedirs(settings.temp_dir, exist_ok=True)
    os.makedirs("logs", exist_ok=True)
    logger.info(f"🚀 {settings.app_name} v{settings.app_version} starting up")
    logger.info(f"LLM model: {settings.openrouter_model}")
    yield
    logger.info("Shutting down")


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="AI-powered content curator and presentation generator — ingest documents, generate slides, export PPTX/PDF.",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(ingestion_router, prefix="/api/v1")
app.include_router(generation_router, prefix="/api/v1")
app.include_router(slides_router, prefix="/api/v1")
app.include_router(export_router, prefix="/api/v1")


@app.get("/", tags=["Health"])
async def root():
    return {"status": "ok", "app": settings.app_name, "version": settings.app_version}


@app.get("/health", tags=["Health"])
async def health():
    return {"status": "healthy"}

from .ingestion import router as ingestion_router
from .generation import router as generation_router
from .slides import router as slides_router
from .export import router as export_router

__all__ = ["ingestion_router", "generation_router", "slides_router", "export_router"]

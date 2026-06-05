from pathlib import Path
import fitz  # PyMuPDF


def extract_text_from_pdf(file_path: Path) -> str:
    """Extract all text from a PDF using PyMuPDF."""
    doc = fitz.open(str(file_path))
    pages_text = []
    for page_num, page in enumerate(doc, start=1):
        text = page.get_text("text")
        if text.strip():
            pages_text.append(f"[Page {page_num}]\n{text.strip()}")
    doc.close()
    return "\n\n".join(pages_text)

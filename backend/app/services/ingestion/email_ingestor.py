import re
from pathlib import Path
from bs4 import BeautifulSoup


def extract_text_from_email(file_path: Path) -> str:
    """Extract and clean text from a raw .eml file."""
    raw = file_path.read_text(encoding="utf-8", errors="ignore")
    return clean_email_text(raw)


def clean_email_text(raw_text: str) -> str:
    """Clean raw email or pasted text: strip headers, HTML, quoted lines."""
    # Strip email headers block (lines like "From: ...", "Subject: ..." at top)
    lines = raw_text.splitlines()
    body_start = 0
    for i, line in enumerate(lines):
        if line.strip() == "":
            body_start = i + 1
            break

    body_lines = lines[body_start:]

    # Join and strip HTML if present
    body = "\n".join(body_lines)
    if "<html" in body.lower() or "<body" in body.lower():
        soup = BeautifulSoup(body, "html.parser")
        body = soup.get_text(separator="\n")

    # Remove quoted reply lines (> prefix)
    cleaned = []
    for line in body.splitlines():
        stripped = line.strip()
        if stripped.startswith(">"):
            continue
        cleaned.append(stripped)

    # Collapse multiple blank lines
    result = re.sub(r"\n{3,}", "\n\n", "\n".join(cleaned))
    return result.strip()


def extract_text_from_plain(text: str) -> str:
    """Minimal cleanup for pasted plain text."""
    text = re.sub(r"\r\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()

"""
Styles Module

Contains CSS styling and theme utilities for Streamlit app.
"""

import streamlit as st
from pathlib import Path


def style_app():
    """Load and apply custom CSS styling to the app."""
    
    # Load external CSS
    css_path = Path(__file__).parent / "style.css"
    
    if css_path.exists():
        with open(css_path, "r") as f:
            css = f.read()
            st.markdown(f"<style>{css}</style>", unsafe_allow_html=True)


__all__ = ["style_app"]

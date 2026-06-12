"""
Document Artifact Viewer

Renders executive reports and documents with sections.
"""

import streamlit as st


def render_document(artifact_data: dict):
    """
    Render document viewer.
    
    Args:
        artifact_data: Document data with sections
    """
    st.markdown("#### 📄 Executive Report")
    
    sections = artifact_data.get("sections", [])
    
    if not sections:
        st.info("No sections available")
        return
    
    # Section navigation
    section_titles = [s.get("title", "Untitled") for s in sections]
    selected_section = st.selectbox(
        "Select Section:",
        section_titles,
        key="doc_section_selector"
    )
    
    # Find and display selected section
    for section in sections:
        if section.get("title") == selected_section:
            st.markdown(f"### {section['title']}")
            st.markdown(section.get("content", ""))
            
            # Additional metadata if available
            if section.get("metadata"):
                with st.expander("📋 Metadata"):
                    for key, value in section["metadata"].items():
                        st.caption(f"**{key}:** {value}")
            
            break
    
    # Table of contents
    with st.expander("📑 Table of Contents"):
        for i, title in enumerate(section_titles, 1):
            st.caption(f"{i}. {title}")

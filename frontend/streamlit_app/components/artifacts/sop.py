"""
SOP Artifact Viewer

Renders Standard Operating Procedures with sections.
"""

import streamlit as st


def render_sop(artifact_data: dict):
    """
    Render SOP viewer.
    
    Args:
        artifact_data: SOP data with sections
    """
    st.markdown("#### 📋 Standard Operating Procedure")
    
    # SOP Metadata
    title = artifact_data.get("title", "SOP")
    st.markdown(f"### {title}")
    
    if artifact_data.get("document_id"):
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Document ID", artifact_data["document_id"])
        with col2:
            st.metric("Version", artifact_data.get("version", "1.0"))
        with col3:
            st.metric("Status", artifact_data.get("status", "Active"))
    
    st.divider()
    
    # Sections
    sections = artifact_data.get("sections", [])
    
    if not sections:
        st.info("No sections available")
        return
    
    section_titles = [s.get("title", "Untitled") for s in sections]
    selected_section = st.selectbox(
        "Select Section:",
        section_titles,
        key="sop_section_selector"
    )
    
    for section in sections:
        if section.get("title") == selected_section:
            st.markdown(f"### {section['title']}")
            st.markdown(section.get("content", ""))
            break
    
    # Quick Access
    with st.expander("⚡ Quick Access"):
        for i, title in enumerate(section_titles, 1):
            if st.button(f"{i}. {title}", key=f"sop_nav_{i}"):
                st.selectbox(
                    "Select Section:",
                    section_titles,
                    index=i-1,
                    key="sop_section_selector"
                )
                st.rerun()

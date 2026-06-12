"""
Handbook Artifact Viewer

Renders handbook chapters with navigation.
"""

import streamlit as st


def render_handbook(artifact_data: dict):
    """
    Render handbook viewer.
    
    Args:
        artifact_data: Handbook data with chapters
    """
    st.markdown("#### 📖 Handbook")
    
    # Handbook Title
    title = artifact_data.get("title", "Handbook")
    st.markdown(f"### {title}")
    
    if artifact_data.get("description"):
        st.info(artifact_data["description"])
    
    st.divider()
    
    # Chapters
    chapters = artifact_data.get("chapters", [])
    
    if not chapters:
        st.info("No chapters available")
        return
    
    chapter_titles = [c.get("title", "Untitled") for c in chapters]
    selected_chapter = st.selectbox(
        "Select Chapter:",
        chapter_titles,
        key="handbook_chapter_selector"
    )
    
    # Display selected chapter
    for chapter in chapters:
        if chapter.get("title") == selected_chapter:
            st.markdown(f"### {chapter['title']}")
            
            if chapter.get("content"):
                st.markdown(chapter["content"])
            
            # Chapter metadata
            if chapter.get("sections"):
                with st.expander("📚 Sections in this Chapter"):
                    for section in chapter["sections"]:
                        st.caption(f"• {section}")
            
            break
    
    # Navigation
    col1, col2, col3 = st.columns([1, 2, 1])
    with col1:
        current_idx = chapter_titles.index(selected_chapter)
        if current_idx > 0 and st.button("◀ Previous Chapter"):
            st.rerun()
    
    with col3:
        if current_idx < len(chapters) - 1 and st.button("Next Chapter ▶"):
            st.rerun()
    
    # Progress
    progress = (current_idx + 1) / len(chapters)
    st.progress(progress, text=f"Chapter {current_idx + 1} of {len(chapters)}")

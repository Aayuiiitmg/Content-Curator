"""
Presentation Artifact Viewer

Renders presentation slides with navigation.
"""

import streamlit as st


def render_presentation(artifact_data: dict):
    """
    Render presentation viewer.
    
    Args:
        artifact_data: Presentation data with slides
    """
    st.markdown("#### 📊 Presentation")
    
    slides = artifact_data.get("slides", [])
    
    if not slides:
        st.info("No slides available")
        return
    
    # Slide navigation
    col1, col2, col3 = st.columns([1, 3, 1])
    
    with col1:
        if st.button("◀ Previous"):
            st.session_state.current_slide = max(0, st.session_state.get("current_slide", 0) - 1)
            st.rerun()
    
    with col2:
        current_slide = st.session_state.get("current_slide", 0)
        st.selectbox(
            "Slide",
            range(len(slides)),
            index=current_slide,
            key="slide_selector"
        )
    
    with col3:
        if st.button("Next ▶"):
            st.session_state.current_slide = min(len(slides) - 1, st.session_state.get("current_slide", 0) + 1)
            st.rerun()
    
    # Display current slide
    current_idx = st.session_state.get("current_slide", 0)
    slide = slides[current_idx]
    
    st.markdown(f"### {slide.get('title', 'Untitled')}")
    
    if slide.get('subtitle'):
        st.markdown(f"_{slide['subtitle']}_")
    
    if slide.get('bullets'):
        for bullet in slide['bullets']:
            st.markdown(f"• {bullet}")
    
    st.progress((current_idx + 1) / len(slides), text=f"Slide {current_idx + 1} of {len(slides)}")

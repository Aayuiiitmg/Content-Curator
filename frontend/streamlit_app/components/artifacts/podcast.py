"""
Podcast Artifact Viewer

Renders podcast scripts with segments and speakers.
"""

import streamlit as st


def render_podcast(artifact_data: dict):
    """
    Render podcast script viewer.
    
    Args:
        artifact_data: Podcast script data
    """
    st.markdown("#### 🎙️ Podcast Script")
    
    # Title
    title = artifact_data.get("title", "Podcast Script")
    st.markdown(f"### {title}")
    
    if artifact_data.get("description"):
        st.info(artifact_data["description"])
    
    # Metadata
    if artifact_data.get("duration") or artifact_data.get("language"):
        col1, col2 = st.columns(2)
        with col1:
            if artifact_data.get("duration"):
                st.metric("Duration", artifact_data["duration"])
        with col2:
            if artifact_data.get("language"):
                st.metric("Language", artifact_data["language"])
    
    st.divider()
    
    # Segments/Script
    segments = artifact_data.get("segments", [])
    
    if not segments:
        st.info("No segments available")
        return
    
    # Segment selector
    segment_options = [s.get("segment", f"Segment {i+1}") for i, s in enumerate(segments)]
    selected_segment = st.selectbox(
        "Select Segment:",
        segment_options,
        key="podcast_segment_selector"
    )
    
    # Display selected segment
    for segment in segments:
        if segment.get("segment") == selected_segment:
            st.markdown(f"### {segment['segment']}")
            
            # Speaker and dialogue
            speaker = segment.get("speaker", "Unknown")
            dialogue = segment.get("dialogue", "")
            
            st.markdown(f"**Speaker:** {speaker}")
            st.markdown(f"**Dialogue:**")
            st.markdown(f"> {dialogue}")
            
            # Notes if available
            if segment.get("notes"):
                with st.expander("📝 Notes"):
                    st.write(segment["notes"])
            
            break
    
    # Timeline
    with st.expander("⏱️ Segment Timeline"):
        for i, seg in enumerate(segments, 1):
            duration = seg.get("duration", "")
            time_badge = f" ({duration})" if duration else ""
            st.caption(f"{i}. {seg.get('segment', 'Segment')}{time_badge}")

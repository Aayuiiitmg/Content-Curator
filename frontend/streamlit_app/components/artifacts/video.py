"""
Video Artifact Viewer

Renders video scripts and scene descriptions.
"""

import streamlit as st


def render_video(artifact_data: dict):
    """
    Render video script viewer.
    
    Args:
        artifact_data: Video script data
    """
    st.markdown("#### 🎬 Video Script")
    
    # Title
    title = artifact_data.get("title", "Video Script")
    st.markdown(f"### {title}")
    
    if artifact_data.get("description"):
        st.info(artifact_data["description"])
    
    st.divider()
    
    # Scenes
    scenes = artifact_data.get("scenes", [])
    
    if not scenes:
        st.info("No scenes available")
        return
    
    scene_titles = [s.get("scene", f"Scene {i+1}") for i, s in enumerate(scenes)]
    selected_scene = st.selectbox(
        "Select Scene:",
        scene_titles,
        key="video_scene_selector"
    )
    
    # Display selected scene
    for i, scene in enumerate(scenes):
        if scene.get("scene") == selected_scene:
            st.markdown(f"### {scene['scene']}")
            
            col1, col2 = st.columns(2)
            
            with col1:
                st.markdown("#### 📹 Visual")
                st.write(scene.get("visual", "No visual description"))
            
            with col2:
                st.markdown("#### 🎤 Audio")
                st.write(scene.get("audio", "No audio description"))
            
            # Script duration if available
            if scene.get("duration"):
                st.metric("Duration", scene["duration"])
            
            break
    
    # Navigation
    current_idx = scene_titles.index(selected_scene)
    col1, col2, col3 = st.columns([1, 2, 1])
    
    with col1:
        if current_idx > 0 and st.button("◀ Previous"):
            st.rerun()
    
    with col3:
        if current_idx < len(scenes) - 1 and st.button("Next ▶"):
            st.rerun()
    
    st.progress((current_idx + 1) / len(scenes), text=f"Scene {current_idx + 1} of {len(scenes)}")

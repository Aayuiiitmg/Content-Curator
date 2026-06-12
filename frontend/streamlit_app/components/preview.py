"""
Preview Component

Renders content preview panel with:
- Asset type switcher
- Artifact viewer delegation
- Navigation within artifact
"""

import streamlit as st
from streamlit_app import state
from streamlit_app.config import GENERATED_ASSETS_BY_OUTPUT


def render_preview_panel():
    """Render the preview panel component."""
    st.markdown("### 👁️ Preview")
    
    active_asset = state.get_active_asset()
    
    if not active_asset["type"] or not active_asset["data"]:
        st.info("Select or generate content to preview here")
        return
    
    asset_type = active_asset["type"]
    asset_data = active_asset["data"]
    
    # Asset Type Tabs
    tab_options = []
    for output_type, assets in GENERATED_ASSETS_BY_OUTPUT.items():
        for asset in assets:
            tab_options.append((asset['label'], asset['artifact']))
    
    if tab_options:
        selected_tab = st.selectbox(
            "View Asset Type:",
            [t[0] for t in tab_options],
            key="preview_tabs"
        )
        
        # Delegate to appropriate viewer
        _render_artifact_viewer(asset_type, asset_data)
    else:
        st.info("No assets available for preview")


def _render_artifact_viewer(artifact_type: str, artifact_data: dict):
    """
    Delegate to appropriate artifact viewer.
    
    Args:
        artifact_type: Type of artifact (presentation, document, etc.)
        artifact_data: Artifact data
    """
    if artifact_type == "presentation":
        from streamlit_app.components.artifacts.presentation import render_presentation
        render_presentation(artifact_data)
    
    elif artifact_type == "document":
        from streamlit_app.components.artifacts.document import render_document
        render_document(artifact_data)
    
    elif artifact_type == "sop":
        from streamlit_app.components.artifacts.sop import render_sop
        render_sop(artifact_data)
    
    elif artifact_type == "handbook":
        from streamlit_app.components.artifacts.handbook import render_handbook
        render_handbook(artifact_data)
    
    elif artifact_type == "spreadsheet":
        from streamlit_app.components.artifacts.spreadsheet import render_spreadsheet
        render_spreadsheet(artifact_data)
    
    elif artifact_type == "video":
        from streamlit_app.components.artifacts.video import render_video
        render_video(artifact_data)
    
    elif artifact_type == "podcast":
        from streamlit_app.components.artifacts.podcast import render_podcast
        render_podcast(artifact_data)
    
    else:
        st.warning(f"Unknown artifact type: {artifact_type}")

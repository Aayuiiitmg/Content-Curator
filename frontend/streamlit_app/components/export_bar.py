"""
Export Bar Component

Renders export section with:
- Export format buttons (PDF, Word, PPT, etc.)
- Download handlers
- Refinement/improvement suggestions
"""

import streamlit as st
from streamlit_app import state
from streamlit_app.api_client import get_api_client
from streamlit_app.config import IMPROVEMENT_SUGGESTIONS


def render_export_bar():
    """Render the export bar component."""
    active_asset = state.get_active_asset()
    
    if not active_asset["type"] or not active_asset["data"]:
        st.info("Generate content first to export")
        return
    
    st.markdown("### 📥 Export & Refine")
    
    # Export Options
    st.markdown("#### Export Formats")
    col1, col2, col3, col4 = st.columns(4)
    
    export_formats = ["PDF", "Word", "PowerPoint", "Excel"]
    
    with col1:
        if st.button("📄 PDF", use_container_width=True):
            _handle_export(active_asset, "pdf")
    
    with col2:
        if st.button("📝 Word", use_container_width=True):
            _handle_export(active_asset, "docx")
    
    with col3:
        if st.button("🎯 PowerPoint", use_container_width=True):
            _handle_export(active_asset, "pptx")
    
    with col4:
        if st.button("📊 Excel", use_container_width=True):
            _handle_export(active_asset, "xlsx")
    
    # Divider
    st.divider()
    
    # Refinement Section
    st.markdown("#### Refine Content")
    st.markdown("**Suggested Improvements:**")
    
    for suggestion in IMPROVEMENT_SUGGESTIONS:
        col1, col2 = st.columns([3, 1])
        with col1:
            st.caption(suggestion)
        with col2:
            if st.button("✓", key=f"improve_{suggestion}", use_container_width=True):
                state.add_improvement(
                    improvement_id=suggestion.replace(" ", "_"),
                    improvement_text=suggestion
                )
                st.success("Improvement applied!")
                st.rerun()
    
    # Custom Refinement
    st.markdown("**Custom Request:**")
    custom_request = st.text_area(
        "Enter custom refinement...",
        placeholder="e.g., Make it more executive-focused...",
        height=60,
        key="custom_refinement"
    )
    
    if st.button("🔄 Apply Refinement", use_container_width=True):
        if custom_request.strip():
            state.add_improvement(
                improvement_id="custom",
                improvement_text=custom_request
            )
            st.success("Refinement applied!")
            st.rerun()
        else:
            st.warning("Please enter a refinement request")


def _handle_export(active_asset: dict, format_type: str):
    """
    Handle export action.
    
    Args:
        active_asset: Current active asset
        format_type: Export format (pdf, docx, etc.)
    """
    try:
        api_client = get_api_client()
        asset_type = active_asset["type"]
        asset_data = active_asset["data"]
        
        response = api_client.export_asset(
            asset_id=asset_data.get("id", "asset"),
            format_type=format_type,
            asset_data=asset_data
        )
        
        if "error" not in response and "file_data" in response:
            st.download_button(
                label=f"⬇️ Download {format_type.upper()}",
                data=response["file_data"],
                file_name=f"{asset_type}.{format_type}",
                mime=_get_mime_type(format_type)
            )
            st.success(f"✓ Ready to download as {format_type.upper()}")
        else:
            st.error(f"Export failed: {response.get('error', 'Unknown error')}")
    
    except Exception as e:
        st.error(f"Export error: {str(e)}")


def _get_mime_type(format_type: str) -> str:
    """Get MIME type for format."""
    mime_types = {
        "pdf": "application/pdf",
        "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
    return mime_types.get(format_type, "application/octet-stream")

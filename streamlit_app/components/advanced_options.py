"""
Advanced Options Component

Renders advanced configuration options near the prompt bar with:
- Compliance frameworks selection
- Style template upload
"""

import streamlit as st
from streamlit_app.config import COMPLIANCE_FRAMEWORKS, SAMPLE_TEMPLATE_FILES
from streamlit_app import state


def render_advanced_options():
    """Render advanced options section below generate button."""
    
    with st.expander("⚡ Advanced Options (Compliance & Templates)", expanded=False):
        col1, col2 = st.columns(2)
        
        with col1:
            st.markdown("#### 📋 Compliance Frameworks")
            selected_frameworks = st.multiselect(
                "Select applicable compliance frameworks:",
                COMPLIANCE_FRAMEWORKS,
                key="compliance_select",
                default=st.session_state.get("selected_compliance_frameworks", [])
            )
            st.session_state.selected_compliance_frameworks = selected_frameworks
            
            if selected_frameworks:
                st.success(f"✓ {len(selected_frameworks)} framework(s) selected")
        
        with col2:
            st.markdown("#### 🎨 Style Templates")
            st.markdown("**Upload or select a style template:**")
            
            # Template upload
            template_file = st.file_uploader(
                "Upload style template (PPTX, DOCX)",
                type=["pptx", "docx"],
                key="template_uploader"
            )
            
            if template_file:
                st.session_state.uploaded_template = template_file
                st.success(f"✓ Template '{template_file.name}' uploaded")
            
            # Or select from sample templates
            st.markdown("**Or use a sample template:**")
            if SAMPLE_TEMPLATE_FILES:
                template_names = [f["name"] for f in SAMPLE_TEMPLATE_FILES]
                selected_template = st.selectbox(
                    "Choose sample template:",
                    template_names,
                    key="sample_template_select",
                    label_visibility="collapsed"
                )
                if selected_template:
                    st.session_state.selected_sample_template = selected_template
                    st.info(f"📌 Sample template '{selected_template}' selected")
            else:
                st.caption("No sample templates available")

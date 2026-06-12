"""
Sidebar Component

Renders left sidebar with:
- Domain & output type filters
- Session/recent documents
- Suggested actions
"""

import streamlit as st
from streamlit_app.config import (
    DOMAINS,
    DIVISIONS,
    OUTPUT_TYPES,
    FILE_TYPES,
    RECENT_DOCUMENTS,
    SUGGESTED_ACTIONS,
)
from streamlit_app import state


def render_sidebar():
    """Render the sidebar component."""
    with st.sidebar:
        st.markdown("### ⚙️ Content Configuration")
        
        # Domain Selector
        st.session_state.selected_domain = st.selectbox(
            "Select Domain",
            DOMAINS,
            key="domain_select"
        )
        
        # Division Selector
        st.session_state.selected_division = st.selectbox(
            "Select Division",
            DIVISIONS,
            key="division_select"
        )
        
        # Output Type Selector
        st.session_state.selected_output_type = st.selectbox(
            "Output Type",
            OUTPUT_TYPES,
            key="output_type_select"
        )
        
        # File Type Selector
        st.session_state.selected_file_type = st.selectbox(
            "Preferred File Type",
            FILE_TYPES,
            key="file_type_select"
        )
        
        # Divider
        st.divider()
        
        # Recent Documents Section
        st.markdown("### 📄 Recent Documents")
        if RECENT_DOCUMENTS:
            for doc in RECENT_DOCUMENTS:
                col1, col2 = st.columns([3, 1])
                with col1:
                    st.caption(f"**{doc['name']}**")
                    st.caption(f"_{doc['type']} • {doc['date']}_")
                with col2:
                    if st.button("📂", key=f"doc_{doc['id']}"):
                        state.set_active_asset(doc['type'], doc)
        else:
            st.info("No recent documents")
        
        # Divider
        st.divider()
        
        # Suggested Actions
        st.markdown("### 💡 Suggested Actions")
        for action in SUGGESTED_ACTIONS[:3]:  # Show top 3
            if st.button(
                f"➜ {action['label']}",
                key=f"action_{action['label']}",
                use_container_width=True
            ):
                st.session_state.current_prompt = action['prompt']
                st.session_state.selected_output_type = action['outputType']
                st.rerun()
        
        # Advanced Options moved to prompt bar
        st.info("💡 Tip: Advanced options (compliance frameworks, style templates) are in the Generate section below.")

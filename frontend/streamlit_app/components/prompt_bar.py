"""
Prompt Bar Component

Renders prompt input area with:
- File upload zone
- Text prompt input
- Generate button
- Progress indication
"""

import streamlit as st
from streamlit_app import state
from streamlit_app.api_client import get_api_client


def render_prompt_bar():
    """Render the prompt bar component."""
    st.markdown("### 📝 Generate Content")
    
    # File Upload Zone - Single uploader only
    col1, col2 = st.columns([3, 1])
    
    with col1:
        uploaded_files = st.file_uploader(
            "📎 Upload Documents (PDF, DOCX, XLSX, PPTX, TXT)",
            type=["pdf", "docx", "xlsx", "pptx", "txt"],
            accept_multiple_files=True,
            key="file_uploader"
        )
        
        if uploaded_files:
            st.session_state.uploaded_files = uploaded_files
            st.success(f"✓ {len(uploaded_files)} file(s) uploaded")
    
    with col2:
        if st.button("🗑️", use_container_width=True, help="Clear all uploads"):
            st.session_state.uploaded_files = []
            st.rerun()
    
    # Prompt Input
    st.markdown("#### Your Prompt")
    prompt = st.text_area(
        "Describe what you want to generate...",
        value=st.session_state.get("current_prompt", ""),
        height=100,
        key="prompt_input",
        placeholder="e.g., Create a safety training program for blast furnace operations..."
    )
    st.session_state.current_prompt = prompt
    
    # Generate Button
    col1, col2, col3 = st.columns([2, 1, 1])
    
    with col1:
        if st.button(
            "✨ Generate Content",
            use_container_width=True,
            type="primary",
            disabled=not prompt or state.is_generating()
        ):
            _handle_generate(prompt)
    
    with col2:
        if st.button("Clear", use_container_width=True):
            st.session_state.current_prompt = ""
            st.rerun()
    
    # Advanced Options Section (moved from sidebar)
    from streamlit_app.components.advanced_options import render_advanced_options
    render_advanced_options()
    
    # Generation Progress
    if state.is_generating():
        st.info("⏳ Generating your content...")
        progress_bar = st.progress(0)
        for i in range(100):
            progress_bar.progress(i + 1)


def _handle_generate(prompt: str):
    """
    Handle content generation.
    
    Args:
        prompt: User prompt text
    """
    if not prompt.strip():
        st.error("Please enter a prompt")
        return
    
    state.set_generating(True)
    
    try:
        # Add user message to chat
        from streamlit_app.components.chat import add_user_message
        add_user_message(prompt)
        
        # Call API
        api_client = get_api_client()
        domain = st.session_state.get("selected_domain", "General")
        division = st.session_state.get("selected_division", "Operations")
        output_type = st.session_state.get("selected_output_type", "Presentation")
        file_type = st.session_state.get("selected_file_type", "PDF")
        compliance_frameworks = st.session_state.get("selected_compliance_frameworks", [])
        style_template = st.session_state.get("selected_sample_template", None)
        
        response = api_client.generate_content(
            output_type=output_type,
            domain=domain,
            division=division,
            file_type=file_type,
            compliance_frameworks=compliance_frameworks,
            style_template=style_template,
            user_prompt=prompt,
            context={"compliance_frameworks": compliance_frameworks}
        )
        
        if "error" not in response:
            # Add assistant response
            from streamlit_app.components.chat import add_assistant_message
            add_assistant_message(f"Generated {output_type} successfully!")
            
            # Store generated assets
            st.session_state.generated_assets = response.get("assets", {})
            st.success("✓ Content generated successfully!")
        else:
            st.error(f"Generation failed: {response.get('error', 'Unknown error')}")
    
    finally:
        state.set_generating(False)
        st.rerun()

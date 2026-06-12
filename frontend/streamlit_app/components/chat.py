"""
Chat Component

Renders chat thread with:
- Message history (user & assistant)
- Message rendering with proper formatting
- Chat thread container
"""

import streamlit as st
from datetime import datetime
from streamlit_app import state


def render_chat_thread():
    """Render the chat thread component."""
    st.markdown("### 💬 Conversation")
    
    chat_history = state.get_chat_history()
    
    if not chat_history:
        st.info("No messages yet. Start by uploading documents or entering a prompt.")
        return
    
    # Render all messages
    for message in chat_history:
        _render_message(message)


def _render_message(message: dict):
    """
    Render individual message.
    
    Args:
        message: Message dict with role, content, timestamp
    """
    role = message.get("role", "user")
    content = message.get("content", "")
    timestamp = message.get("timestamp", "")
    
    if role == "user":
        st.markdown(
            f"""
            <div style='text-align: right; margin-bottom: 12px;'>
                <div style='display: inline-block; background-color: #EEF2FF; 
                           border: 1px solid #C7D2FE; border-radius: 14px; 
                           padding: 10px 14px; max-width: 85%;'>
                    <p style='margin: 0; color: #1F2937; font-size: 13.5px;'>{content}</p>
                </div>
            </div>
            """,
            unsafe_allow_html=True
        )
    else:  # assistant
        st.markdown(
            f"""
            <div style='display: flex; gap: 10px; margin-bottom: 16px; align-items: flex-start;'>
                <div style='width: 30px; height: 30px; border-radius: 50%; 
                           background-color: #003B7A; color: white; font-size: 10px; 
                           font-weight: 600; display: flex; align-items: center; 
                           justify-content: center; flex-shrink: 0;'>CC</div>
                <div style='flex-grow: 1; background-color: white; border: 1px solid #DCE3EC; 
                           border-radius: 2px 14px 14px 14px; padding: 12px 16px;'>
                    <p style='margin: 0; color: #1F2937; font-size: 13.5px;'>{content}</p>
                </div>
            </div>
            """,
            unsafe_allow_html=True
        )


def add_user_message(content: str):
    """Add user message to history."""
    state.add_to_chat_history("user", content)


def add_assistant_message(content: str):
    """Add assistant message to history."""
    state.add_to_chat_history("assistant", content)

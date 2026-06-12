"""
Spreadsheet Artifact Viewer

Renders tabular data and compliance matrices.
"""

import streamlit as st
import pandas as pd


def render_spreadsheet(artifact_data: dict):
    """
    Render spreadsheet viewer.
    
    Args:
        artifact_data: Spreadsheet data
    """
    st.markdown("#### 📊 Spreadsheet")
    
    # Title
    title = artifact_data.get("title", "Spreadsheet")
    st.markdown(f"### {title}")
    
    # Data
    data = artifact_data.get("data", [])
    
    if not data:
        st.info("No data available")
        return
    
    # Convert to DataFrame if not already
    if isinstance(data, list):
        df = pd.DataFrame(data)
    else:
        df = data
    
    # Display options
    col1, col2 = st.columns(2)
    
    with col1:
        if st.checkbox("Show as Table", value=True, key="show_table"):
            st.dataframe(df, use_container_width=True)
    
    with col2:
        if st.checkbox("Show Statistics", key="show_stats"):
            st.write(df.describe())
    
    # Export options
    if st.button("📥 Download as CSV"):
        csv = df.to_csv(index=False)
        st.download_button(
            label="Download CSV",
            data=csv,
            file_name="spreadsheet.csv",
            mime="text/csv"
        )
    
    # Filters
    if st.checkbox("🔍 Apply Filters", key="show_filters"):
        for col in df.columns:
            if df[col].dtype == 'object':
                selected = st.multiselect(f"Filter {col}:", df[col].unique(), key=f"filter_{col}")
                if selected:
                    df = df[df[col].isin(selected)]
        
        st.markdown("### Filtered Data")
        st.dataframe(df, use_container_width=True)

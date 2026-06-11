import os
import sys
import uuid
import time
import base64
from pathlib import Path

import streamlit as st

# ── Path setup ──────────────────────────────────────────────────────────────
ROOT = Path(__file__).parent
sys.path.insert(0, str(ROOT))

from streamlit_app.mock_data import (
    DOMAINS, OUTPUT_TYPES, DIVISIONS, FILE_TYPES, COMPLIANCE_FRAMEWORKS,
    SUGGESTED_ACTIONS, RECENT_DOCUMENTS, SAMPLE_TEMPLATE_FILES,
    PRESENTATION_SLIDES, DOCUMENT_SECTIONS, SPREADSHEET_DATA,
    HANDBOOK_CHAPTERS, SOP_SECTIONS, VIDEO_SCRIPT, PODCAST_SCRIPT,
    GENERATED_ASSETS_BY_OUTPUT, SIMPLE_PROGRESS_STEPS, ASSISTANT_CHECKS,
    DOMAIN_EXAMPLES, IMPROVEMENT_SUGGESTIONS,
    infer_output_type_from_prompt, get_applied_deltas,
    merge_presentation_slides, merge_document_sections, merge_sop_sections,
    merge_handbook_chapters, get_video_meta, get_podcast_meta,
)
from streamlit_app.exporters import (
    export_to_docx, export_to_xlsx, export_to_pptx, export_to_pdf,
)

# ── Page config ──────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="TATA STEEL Content Curator",
    page_icon="🏭",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ── Base64 Image Helper ──────────────────────────────────────────────────────
def get_base64_image(img_path):
    p = Path(img_path)
    if p.exists():
        with open(p, "rb") as image_file:
            return f"data:image/png;base64,{base64.b64encode(image_file.read()).decode('utf-8')}"
    return ""

ts_logo_b64 = get_base64_image(ROOT / "streamlit_app" / "tata_steel_logo.png")
tata_logo_b64 = get_base64_image(ROOT / "streamlit_app" / "tata_logo.png")

# ── Inject CSS ────────────────────────────────────────────────────────────────
css_path = ROOT / "streamlit_app" / "style.css"
if css_path.exists():
    st.html(f"<style>{css_path.read_text(encoding='utf-8')}</style>")

# Also inject viewport adjustment style overrides
st.html("""
<style>
/* Adjust main block padding to make room for fixed header */
section.main > div.block-container {
    padding-top: 90px !important;
    padding-left: 32px !important;
    padding-right: 32px !important;
    max-width: 100% !important;
}
/* Reduce default widget gaps */
.stSelectbox, .stTextInput, .stTextArea, .stFileUploader {
    margin-bottom: 8px !important;
}
</style>
""")

# ── Session state defaults ────────────────────────────────────────────────────
def _init_state():
    defaults = {
        "messages": [],
        "source_files": [],
        "template_files": list(SAMPLE_TEMPLATE_FILES),
        "custom_instructions": "",
        "compliance_sel": [COMPLIANCE_FRAMEWORKS[0], COMPLIANCE_FRAMEWORKS[1], COMPLIANCE_FRAMEWORKS[3]],
        "active_asset": None,
        "active_out_type": None,
        "applied_improvements": [],
        "history": [],
        "slide_idx": 0,
        "pending_prompt": None,
        "pending_type": None,
        "domain": "Steel Manufacturing",
        "division": "Safety, Health & Sustainability",
        "output_type": "Training Program",
        "file_type": "PPT",
    }
    for k, v in defaults.items():
        if k not in st.session_state:
            st.session_state[k] = v

_init_state()

# ── Helpers ───────────────────────────────────────────────────────────────────
def ts():
    return time.strftime("%I:%M %p")

def run_generation(prompt: str, out_type: str):
    """Append user + assistant messages and simulate generation."""
    doc_count = max(len(st.session_state.source_files) + len(st.session_state.template_files), 1)
    checks = [c.replace("documents analyzed", f"{doc_count} documents analyzed")
              for c in ASSISTANT_CHECKS]
    assets = GENERATED_ASSETS_BY_OUTPUT.get(out_type, GENERATED_ASSETS_BY_OUTPUT["Training Program"])

    mid = f"msg-{uuid.uuid4().hex[:8]}"
    st.session_state.messages.append({"role": "user", "content": prompt})
    st.session_state.messages.append({
        "id": mid, "role": "assistant", "status": "complete",
        "checks": checks, "assets": assets,
        "timestamp": ts(), "outputType": out_type,
    })

    # Set preview to first asset
    if assets:
        st.session_state.active_asset = assets[0]
        st.session_state.active_out_type = out_type
        st.session_state.applied_improvements = []
        st.session_state.slide_idx = 0

    # Save to history
    st.session_state.history.append({
        "title": f"{out_type}: {prompt[:28]}…",
        "timestamp": ts(),
        "snapshot_messages": list(st.session_state.messages),
        "out_type": out_type,
    })

# ── Fixed Header ──────────────────────────────────────────────────────────────
st.html(f"""
<div class="tata-header">
    <div class="tata-header-left">
        <img src="{ts_logo_b64}" style="height: 32px;" alt="TATA STEEL" />
    </div>
    <div class="tata-header-center">
        <span class="app-title">TATA STEEL Content Curator</span>
    </div>
    <div class="tata-header-right">
        <span style="font-size:12.5px; font-weight:500; color:#4B5563; margin-right:4px;">Enterprise</span>
        <!-- Space for the overlapping toggle -->
        <div style="width: 50px;"></div>
        <img src="{tata_logo_b64}" style="height: 30px;" alt="TATA" />
        <span class="icon-btn" style="margin-left: 10px;" title="Notifications">🔔</span>
        <span class="profile-btn" style="margin-left: 8px;" title="Profile">AS</span>
    </div>
</div>
""")

# Overlay interactive Streamlit toggle over the space prepared in the header
st.html('<div class="header-toggle-container">')
st.toggle("Enterprise Mode", value=True, label_visibility="collapsed", key="enterprise_toggle")
st.html('</div>')

# ── Sidebar ───────────────────────────────────────────────────────────────────
with st.sidebar:
    # FILTERS Section
    st.markdown('<span class="sidebar-section-title">Filters</span>', unsafe_allow_html=True)

    # 1. Industry Domain (A-Z)
    sorted_domains = sorted(DOMAINS)
    st.session_state.domain = st.selectbox(
        "Industry Domain",
        options=sorted_domains,
        index=sorted_domains.index(st.session_state.domain)
        if st.session_state.domain in sorted_domains else 0,
    )

    # 2. Division (A-Z)
    sorted_divs = sorted(DIVISIONS)
    st.session_state.division = st.selectbox(
        "Division",
        options=sorted_divs,
        index=sorted_divs.index(st.session_state.division)
        if st.session_state.division in sorted_divs else 0,
    )

    # 3. Output Type
    st.session_state.output_type = st.selectbox(
        "Output Type",
        options=OUTPUT_TYPES,
        index=OUTPUT_TYPES.index(st.session_state.output_type)
        if st.session_state.output_type in OUTPUT_TYPES else 0,
    )
    custom_output = ""
    if st.session_state.output_type == "Others":
        custom_output = st.text_input("Custom output type", placeholder="e.g. Technical Memo")

    # 4. File Type
    st.session_state.file_type = st.selectbox(
        "File Type",
        options=FILE_TYPES,
        index=FILE_TYPES.index(st.session_state.file_type)
        if st.session_state.file_type in FILE_TYPES else 0,
    )

    # SESSIONS Section
    st.markdown('<span class="sidebar-section-title">Sessions</span>', unsafe_allow_html=True)

    if st.button("➕ New Chat", use_container_width=True):
        st.session_state.messages = []
        st.session_state.active_asset = None
        st.session_state.applied_improvements = []
        st.session_state.slide_idx = 0
        st.rerun()

    if st.session_state.history:
        for hi, hist in enumerate(reversed(st.session_state.history[-5:])):
            if st.button(f"💬 {hist['title']}", key=f"hist_{hi}", use_container_width=True):
                st.session_state.messages = list(hist["snapshot_messages"])
                st.session_state.active_asset = None
                st.session_state.applied_improvements = []
                st.session_state.slide_idx = 0
                st.rerun()
    else:
        st.caption("No previous sessions.")

    # RECENT DOCUMENTS Section
    st.markdown('<span class="sidebar-section-title">Recent Documents</span>', unsafe_allow_html=True)
    for doc in RECENT_DOCUMENTS:
        st.markdown(
            f'<div class="recent-doc-card">'
            f'<span class="recent-doc-name">{doc["name"]}</span>'
            f'<span class="recent-doc-meta">{doc["type"]} · {doc["date"]}</span>'
            f'</div>',
            unsafe_allow_html=True,
        )

# ── Main side-by-side Layout ──────────────────────────────────────────────────
chat_col, preview_col = st.columns([1, 1], gap="large")

# ════════════════════════════════════════════════════════════════════════════════
# LEFT COLUMN — Chat Interface
# ════════════════════════════════════════════════════════════════════════════════
with chat_col:

    # Welcome screen
    if not st.session_state.messages:
        st.markdown(
            '<div class="welcome-container">'
            '<h2 class="welcome-title">What would you like to create today?</h2>'
            '<p class="welcome-subtitle">'
            'Select filters in the sidebar, attach documents, and choose a suggested action or '
            'type your own instructions below.</p></div>',
            unsafe_allow_html=True,
        )

        # Suggested action pills
        for i in range(0, len(SUGGESTED_ACTIONS), 2):
            c1, c2 = st.columns(2)
            for ci, sa in zip([c1, c2], SUGGESTED_ACTIONS[i:i+2]):
                with ci:
                    if st.button(
                        f"✨ {sa['label']}",
                        key=f"sa_{sa['label']}",
                        use_container_width=True,
                        help=sa["prompt"],
                    ):
                        resolved = sa["outputType"]
                        run_generation(sa["prompt"], resolved)
                        st.rerun()

        # Recent documents teaser
        st.markdown('<div style="margin-top:24px;">', unsafe_allow_html=True)
        st.markdown('<span class="export-section-title">Recent Documents</span>', unsafe_allow_html=True)
        rdcols = st.columns(3)
        for ri, doc in enumerate(RECENT_DOCUMENTS):
            with rdcols[ri % 3]:
                st.markdown(
                    f'<div style="padding:10px; background:#FFFFFF; border:1px solid #DCE3EC; '
                    f'border-radius:8px; font-size:12px; height: 100%;">'
                    f'<strong style="color:#003B7A; display:block; margin-bottom:2px;">{doc["name"]}</strong>'
                    f'<span style="color:#6B7280; font-size:10.5px;">{doc["type"]} · {doc["date"]}</span>'
                    f'</div>',
                    unsafe_allow_html=True,
                )
        st.markdown('</div>', unsafe_allow_html=True)

    # Chat thread
    else:
        chat_container = st.container(height=450, border=False)
        with chat_container:
            for msg in st.session_state.messages:
                if msg["role"] == "user":
                    st.markdown(
                        f'<div class="user-msg-container">'
                        f'<div class="user-msg-bubble">{msg["content"]}</div>'
                        f'</div>',
                        unsafe_allow_html=True,
                    )
                else:
                    a_col, b_col = st.columns([1, 12])
                    with a_col:
                        st.markdown('<div class="assistant-avatar">CC</div>', unsafe_allow_html=True)
                    with b_col:
                        with st.container(border=True):
                            # Verification checks
                            for chk in msg.get("checks", []):
                                st.markdown(f'<div class="check-item">{chk}</div>', unsafe_allow_html=True)

                            # Asset buttons inside the message
                            if msg.get("assets"):
                                st.markdown(
                                    '<p style="font-size:11px; font-weight:600; color:#6B7280; '
                                    'text-transform:uppercase; letter-spacing:0.05em; margin:10px 0 6px;">Generated Assets</p>',
                                    unsafe_allow_html=True,
                                )
                                asset_cols = st.columns(len(msg["assets"]))
                                for ai, asset in enumerate(msg["assets"]):
                                    with asset_cols[ai]:
                                        icon_map = {
                                            "presentation": "📊", "document": "📄",
                                            "handbook": "📖", "sop": "📋",
                                            "spreadsheet": "📈", "video": "🎬", "podcast": "🎙️",
                                        }
                                        ico = icon_map.get(asset["artifact"], "📄")
                                        if st.button(
                                            f"{ico} {asset['label']}",
                                            key=f"asset_{msg['id']}_{asset['id']}",
                                            use_container_width=True,
                                            help=asset["description"],
                                        ):
                                            st.session_state.active_asset = asset
                                            st.session_state.active_out_type = msg["outputType"]
                                            st.session_state.applied_improvements = []
                                            st.session_state.slide_idx = 0
                                            st.rerun()
                            # Timestamp
                            if msg.get("timestamp"):
                                st.markdown(
                                    f'<div style="font-size:10px; color:#9CA3AF; text-align:right; '
                                    f'margin-top:6px;">{msg["timestamp"]}</div>',
                                    unsafe_allow_html=True,
                                )

    # Advanced Options (Compliance · Templates)
    with st.expander("⚙️ Advanced Options (Compliance · Templates)", expanded=False):
        adv1, adv2 = st.columns(2)

        # ── LEFT: Compliance Frameworks ──────────────────────────────────────
        with adv1:
            st.markdown(
                '<p style="font-size:13px; font-weight:600; color:#1F2937; margin-bottom:10px;">Compliance Frameworks</p>',
                unsafe_allow_html=True,
            )

            # Render selected frameworks as navy chip tags
            compliance_to_remove = None
            chips_html_parts = []
            for ci, fw in enumerate(st.session_state.compliance_sel):
                short = (fw[:18] + "…") if len(fw) > 18 else fw
                chips_html_parts.append(
                    f'<span class="adv-chip" id="chip_{ci}">{short}</span>'
                )
            chips_row = "".join(chips_html_parts)
            st.markdown(
                f'<div class="adv-chips-row">{chips_row}</div>',
                unsafe_allow_html=True,
            )

            # Individual remove buttons rendered as small ✕ per chip
            if st.session_state.compliance_sel:
                btn_cols = st.columns(len(st.session_state.compliance_sel) + 1)
                for ci, fw in enumerate(st.session_state.compliance_sel):
                    with btn_cols[ci]:
                        if st.button("✕", key=f"rm_fw_{ci}", help=f"Remove: {fw}"):
                            compliance_to_remove = ci
                with btn_cols[-1]:
                    pass  # spacer
                if compliance_to_remove is not None:
                    st.session_state.compliance_sel.pop(compliance_to_remove)
                    st.rerun()

            # Add framework dropdown
            available = [f for f in COMPLIANCE_FRAMEWORKS if f not in st.session_state.compliance_sel]
            if available:
                add_fw = st.selectbox(
                    "Add framework",
                    [""] + available,
                    label_visibility="collapsed",
                    key="add_fw_select",
                )
                if add_fw:
                    st.session_state.compliance_sel.append(add_fw)
                    st.rerun()

        # ── RIGHT: Style Templates ────────────────────────────────────────────
        with adv2:
            st.markdown(
                '<p style="font-size:13px; font-weight:600; color:#1F2937; margin-bottom:10px;">Style Templates</p>',
                unsafe_allow_html=True,
            )

            # Upload zone — styled like the screenshot
            st.markdown(
                '<div class="adv-upload-zone">'
                '<span class="adv-upload-icon">⬆</span>'
                '<span class="adv-upload-btn-label">Upload</span>'
                '<span class="adv-upload-hint">200MB per file&nbsp;•&nbsp;PPTX, DOCX, PDF</span>'
                '</div>',
                unsafe_allow_html=True,
            )
            tpl_up = st.file_uploader(
                "Upload template",
                type=["pptx", "docx", "pdf"],
                key="tpl_uploader",
                label_visibility="collapsed",
            )
            if tpl_up and tpl_up.name not in [t["name"] for t in st.session_state.template_files]:
                st.session_state.template_files.append({
                    "name": tpl_up.name,
                    "size": f"{tpl_up.size//1024} KB",
                    "type": tpl_up.name.split('.')[-1],
                })
                st.rerun()

            # File list with icons and × buttons
            tpl_to_remove = None
            for ti, tpl in enumerate(st.session_state.template_files):
                ext = tpl["type"].lower()
                icon = "🟦" if ext == "pptx" else ("📝" if ext == "docx" else "📄")
                tc1, tc2 = st.columns([6, 1])
                with tc1:
                    st.markdown(
                        f'<div class="adv-file-row">'
                        f'<span class="adv-file-icon">{icon}</span>'
                        f'<span class="adv-file-name">{tpl["name"]}</span>'
                        f'</div>',
                        unsafe_allow_html=True,
                    )
                with tc2:
                    if st.button("✕", key=f"rm_tpl_{ti}", help=f"Remove {tpl['name']}"):
                        tpl_to_remove = ti
            if tpl_to_remove is not None:
                st.session_state.template_files.pop(tpl_to_remove)
                st.rerun()

    # ── Upload & Prompt Box Area (Structured exactly as requested) ─────────────
    st.markdown('<div class="prompt-box-container">', unsafe_allow_html=True)

    # 1. Attach Files
    src_up = st.file_uploader(
        "Attach Files",
        type=["pdf", "docx", "pptx", "xlsx", "txt", "csv"],
        accept_multiple_files=True,
        key="src_uploader",
        label_visibility="visible",
    )
    if src_up:
        for f in src_up:
            if f.name not in [s["name"] for s in st.session_state.source_files]:
                st.session_state.source_files.append({
                    "name": f.name,
                    "size": f"{f.size//1024} KB",
                    "type": f.name.split('.')[-1].lower(),
                    "bytes": f.read(),
                })
        st.rerun()

    # Show active attached file chips
    if st.session_state.source_files:
        chips_html = " ".join(
            f'<span style="background:#EEF2FF; border:1px solid #C7D2FE; color:#003B7A; '
            f'padding:4px 10px; border-radius:6px; font-size:11.5px; margin-right:6px; display:inline-block;">📎 {f["name"]}</span>'
            for f in st.session_state.source_files
        )
        st.markdown(f'<div style="margin-top:8px; margin-bottom:8px;">{chips_html}</div>', unsafe_allow_html=True)

    st.markdown('<hr style="margin:12px 0; border-color:#DCE3EC;"/>', unsafe_allow_html=True)

    # 2. Prompt Text Area
    prompt_val = st.text_area(
        "Prompt",
        placeholder="Create a Blast Furnace Safety Training Program for new employees…",
        height=80,
        label_visibility="collapsed",
        key="prompt_input",
    )

    st.markdown('<hr style="margin:12px 0; border-color:#DCE3EC;"/>', unsafe_allow_html=True)

    # 3. Custom Instructions & Generate Button
    ci1, ci2 = st.columns([3, 1])
    with ci1:
        custom_instr = st.text_input(
            "Custom instructions",
            placeholder="Custom instructions (e.g. simple language, focus on PPE compliance)…",
            label_visibility="collapsed",
            value=st.session_state.custom_instructions,
            key="custom_instr_input",
        )
        st.session_state.custom_instructions = custom_instr
    with ci2:
        if st.button("⚡ Generate", type="primary", use_container_width=True):
            txt = (prompt_val or "").strip()
            if txt:
                resolved = st.session_state.output_type
                if resolved == "Others":
                    resolved = custom_output.strip() or "Custom Deliverable"
                run_generation(txt, resolved)
                st.rerun()
            else:
                st.warning("Please enter a prompt.")

    st.markdown('</div>', unsafe_allow_html=True)


# ════════════════════════════════════════════════════════════════════════════════
# RIGHT COLUMN — Preview & Export Panel
# ════════════════════════════════════════════════════════════════════════════════
with preview_col:
    asset = st.session_state.active_asset
    out_t = st.session_state.active_out_type

    # Auto-pick latest asset if none chosen
    if not asset:
        done = [m for m in st.session_state.messages
                if m["role"] == "assistant" and m.get("assets")]
        if done:
            last = done[-1]
            asset = last["assets"][0]
            out_t = last["outputType"]
            st.session_state.active_asset = asset
            st.session_state.active_out_type = out_t

    if not asset:
        st.markdown(
            '<div class="preview-panel-container">'
            '<div class="preview-header-bar">'
            '<div class="preview-header-title">📋 Preview</div>'
            '</div>'
            '<div class="preview-content-area" style="display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:100px 24px;">'
            '<div style="font-size:48px; margin-bottom:16px;">📊</div>'
            '<h3 style="font-size:16px; font-weight:600; color:#003B7A; margin-bottom:8px;">Preview Panel</h3>'
            '<p style="font-size:13px; color:#4B5563; max-width:280px; margin:0;">Generated content will appear here once you select a suggested action or click Generate.</p>'
            '</div>'
            '</div>',
            unsafe_allow_html=True,
        )
    else:
        deltas = get_applied_deltas(st.session_state.applied_improvements)
        ver = f"v{len(st.session_state.applied_improvements) + 1}"

        # Preview Container Box
        st.markdown(
            f'<div class="preview-header-bar" style="border: 1px solid #DCE3EC; border-radius: 12px 12px 0 0; background-color: #FFFFFF;">'
            f'<div class="preview-header-title">📋 {out_t} Preview</div>'
            f'<div class="preview-header-version">{ver}</div>'
            f'</div>',
            unsafe_allow_html=True,
        )

        with st.container(border=True):
            artifact = asset["artifact"]

            # ── PRESENTATION ──────────────────────────────────────────────────
            if artifact == "presentation":
                slides = merge_presentation_slides(PRESENTATION_SLIDES, deltas)
                idx = min(st.session_state.slide_idx, len(slides) - 1)
                slide = slides[idx]

                if slide.get("type") == "title":
                    st.markdown(
                        f'<div style="text-align:center; padding:28px 16px;">'
                        f'<div style="background:#EEF2FF; border:1px solid #C7D2FE; color:#003B7A; font-size:10px; font-weight:600; '
                        f'padding:3px 10px; border-radius:4px; display:inline-block; margin-bottom:10px;">TATA STEEL</div>'
                        f'<h2 style="font-size:22px; font-weight:600; color:#003B7A; margin-bottom:8px;">{slide["title"]}</h2>'
                        f'<p style="font-size:13px; color:#4B5563; font-style:italic;">{slide.get("subtitle","")}</p>'
                        f'<p style="font-size:10.5px; color:#6B7280; margin-top:20px;">Jamshedpur Plant · FY2026</p>'
                        f'</div>',
                        unsafe_allow_html=True,
                    )
                else:
                    st.markdown(
                        f'<h3 style="font-size:17px; font-weight:600; color:#003B7A; '
                        f'border-bottom:1.5px solid #DCE3EC; padding-bottom:6px; margin-bottom:12px;">'
                        f'{slide["title"]}</h3>',
                        unsafe_allow_html=True,
                    )
                    for b in slide.get("bullets", []):
                        st.markdown(
                            f'<div style="display:flex; gap:8px; margin-bottom:8px; align-items:flex-start;">'
                            f'<span style="color:#003B7A; font-weight:700; flex-shrink:0; margin-top:1px;">●</span>'
                            f'<span style="font-size:13px; color:#374151; line-height:1.45;">{b}</span></div>',
                            unsafe_allow_html=True,
                        )

                st.markdown(
                    f'<div style="text-align:center; font-size:10.5px; color:#6B7280; '
                    f'margin-top:8px; border-top:1px solid #F3F4F6; padding-top:6px;">'
                    f'Slide {idx+1} of {len(slides)}</div>',
                    unsafe_allow_html=True,
                )

                # Thumbnails row
                thumb_cols = st.columns(min(len(slides), 5))
                for ti, (tc, sl) in enumerate(zip(thumb_cols, slides[:5])):
                    with tc:
                        is_active = (ti == idx)
                        border = "border:2px solid #003B7A;" if is_active else "border:1px solid #DCE3EC;"
                        st.markdown(
                            f'<div style="{border} border-radius:5px; padding:5px; '
                            f'background:{"#EEF2FF" if is_active else "#F9FAFB"}; '
                            f'cursor:pointer; text-align:center;">'
                            f'<span style="font-size:9px; font-weight:600; color:#003B7A; '
                            f'display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">'
                            f'{sl["title"][:18]}</span>'
                            f'<span style="font-size:8px; color:#6B7280;">{ti+1}</span></div>',
                            unsafe_allow_html=True,
                        )
                        if st.button("▣", key=f"thumb_{ti}",
                                     use_container_width=True):
                            st.session_state.slide_idx = ti
                            st.rerun()

                nav1, nav2, nav3 = st.columns([1, 2, 1])
                with nav1:
                    if st.button("◀ Prev", use_container_width=True,
                                 disabled=(idx == 0)):
                        st.session_state.slide_idx = max(0, idx - 1)
                        st.rerun()
                with nav2:
                    st.markdown(
                        f'<div style="text-align:center; font-size:12px; '
                        f'font-weight:600; color:#475569; padding-top:6px;">'
                        f'{idx+1} / {len(slides)}</div>',
                        unsafe_allow_html=True,
                    )
                with nav3:
                    if st.button("Next ▶", use_container_width=True,
                                 disabled=(idx == len(slides) - 1)):
                        st.session_state.slide_idx = min(len(slides) - 1, idx + 1)
                        st.rerun()

            # ── DOCUMENT (Executive Report) ───────────────────────────────────
            elif artifact == "document":
                sections = merge_document_sections(DOCUMENT_SECTIONS, deltas)
                for s in sections:
                    st.markdown(
                        f'<h4 style="font-size:14px; font-weight:600; color:#003B7A; '
                        f'margin-top:14px; margin-bottom:4px;">{s["title"]}</h4>'
                        f'<p style="font-size:13px; color:#374151; line-height:1.55; '
                        f'margin-bottom:6px;">{s["content"]}</p>',
                        unsafe_allow_html=True,
                    )

            # ── HANDBOOK ──────────────────────────────────────────────────────
            elif artifact == "handbook":
                chapters = merge_handbook_chapters(HANDBOOK_CHAPTERS, deltas)
                for ch in chapters:
                    st.markdown(
                        f'<h4 style="font-size:14px; font-weight:600; color:#003B7A; '
                        f'margin-top:14px;">Chapter {ch["id"]}: {ch["title"]}</h4>'
                        f'<p style="font-size:13px; color:#374151; line-height:1.55;">{ch["content"]}</p>',
                        unsafe_allow_html=True,
                    )

            # ── SOP ───────────────────────────────────────────────────────────
            elif artifact == "sop":
                sections, title_ovr = merge_sop_sections(SOP_SECTIONS, deltas)
                sop_title = title_ovr or "SOP-EHS-CON-001: Contractor Safety Management"
                st.markdown(
                    f'<h3 style="font-size:16px; font-weight:600; color:#003B7A; '
                    f'text-align:center; margin-bottom:14px;">{sop_title}</h3>',
                    unsafe_allow_html=True,
                )
                for s in sections:
                    st.markdown(
                        f'<h4 style="font-size:13px; font-weight:600; color:#4B5563; '
                        f'border-bottom:1px solid #F3F4F6; margin-top:12px; '
                        f'padding-bottom:3px;">{s["title"]}</h4>'
                        f'<p style="font-size:12px; color:#374151;">{s["content"]}</p>',
                        unsafe_allow_html=True,
                    )

            # ── SPREADSHEET (Training Checklist) ──────────────────────────────
            elif artifact == "spreadsheet":
                st.markdown(
                    '<h4 style="font-size:15px; font-weight:600; color:#003B7A; margin-bottom:10px;">'
                    '📈 Training Compliance Checklist</h4>',
                    unsafe_allow_html=True,
                )
                st.dataframe(SPREADSHEET_DATA, use_container_width=True, hide_index=True)

            # ── VIDEO SCRIPT ──────────────────────────────────────────────────
            elif artifact == "video":
                t_suffix, caption_extra = get_video_meta(deltas)
                st.markdown(
                    f'<h4 style="font-size:15px; font-weight:600; color:#003B7A; margin-bottom:10px;">'
                    f'🎬 Safety Training Video Script{t_suffix}</h4>',
                    unsafe_allow_html=True,
                )
                if caption_extra:
                    st.info(f"🎯 Refinement note: {caption_extra}")
                for scene in VIDEO_SCRIPT:
                    with st.expander(scene["scene"], expanded=True):
                        st.markdown(f'*Visual:* {scene["visual"]}')
                        st.markdown(f'🗣️ **Dialogue:** {scene["audio"]}')

            # ── PODCAST SCRIPT ────────────────────────────────────────────────
            elif artifact == "podcast":
                t_suffix, narrator_note = get_podcast_meta(deltas)
                st.markdown(
                    f'<h4 style="font-size:15px; font-weight:600; color:#003B7A; margin-bottom:10px;">'
                    f'🎙️ Executive Audio Briefing Script{t_suffix}</h4>',
                    unsafe_allow_html=True,
                )
                if narrator_note:
                    st.info(f"🎙️ Narrator guidance: {narrator_note}")
                for seg in PODCAST_SCRIPT:
                    st.markdown(
                        f'<p style="font-size:13px; margin-bottom:8px; line-height:1.45;">'
                        f'<strong style="color:#003B7A;">[{seg["segment"]}] {seg["speaker"]}:</strong> '
                        f'{seg["dialogue"]}</p>',
                        unsafe_allow_html=True,
                    )

        # ── Export buttons (Clean Card Design) ───────────────────────────────
        st.markdown('<span class="export-section-title">📥 Export Options</span>', unsafe_allow_html=True)
        exp1, exp2, exp3, exp4 = st.columns(4)

        # Build export data depending on artifact type
        if artifact == "presentation":
            slides_data = merge_presentation_slides(PRESENTATION_SLIDES, deltas)
            pptx_b = export_to_pptx(slides_data, asset["label"])
            pdf_b  = export_to_pdf(slides_data, asset["label"])
            docx_b = export_to_docx(slides_data, asset["label"])
            xlsx_b = export_to_xlsx(slides_data)
        elif artifact == "document":
            sdata = merge_document_sections(DOCUMENT_SECTIONS, deltas)
            pptx_b = None
            pdf_b  = export_to_docx(sdata, asset["label"])
            docx_b = export_to_docx(sdata, asset["label"])
            xlsx_b = export_to_xlsx(sdata)
        elif artifact == "handbook":
            cdata = merge_handbook_chapters(HANDBOOK_CHAPTERS, deltas)
            pptx_b = None
            pdf_b  = export_to_docx(cdata, asset["label"])
            docx_b = export_to_docx(cdata, asset["label"])
            xlsx_b = export_to_xlsx(cdata)
        elif artifact == "sop":
            secs, _ = merge_sop_sections(SOP_SECTIONS, deltas)
            pptx_b = None
            pdf_b  = export_to_docx(secs, asset["label"])
            docx_b = export_to_docx(secs, asset["label"])
            xlsx_b = export_to_xlsx(secs)
        elif artifact == "spreadsheet":
            pptx_b = None
            pdf_b  = export_to_docx(SPREADSHEET_DATA, asset["label"])
            docx_b = export_to_docx(SPREADSHEET_DATA, asset["label"])
            xlsx_b = export_to_xlsx(SPREADSHEET_DATA)
        elif artifact == "video":
            pptx_b = None
            pdf_b  = export_to_docx(VIDEO_SCRIPT, asset["label"])
            docx_b = export_to_docx(VIDEO_SCRIPT, asset["label"])
            xlsx_b = export_to_xlsx(VIDEO_SCRIPT)
        else:  # podcast
            pptx_b = None
            pdf_b  = export_to_docx(PODCAST_SCRIPT, asset["label"])
            docx_b = export_to_docx(PODCAST_SCRIPT, asset["label"])
            xlsx_b = export_to_xlsx(PODCAST_SCRIPT)

        fname_base = asset["label"].replace(" ", "_")
        with exp1:
            if pdf_b:
                st.download_button("📄 PDF", data=pdf_b,
                    file_name=f"{fname_base}.pdf", mime="application/pdf",
                    use_container_width=True)
            else:
                st.button("PDF N/A", disabled=True, use_container_width=True)
        with exp2:
            if pptx_b:
                st.download_button("📊 PPT", data=pptx_b,
                    file_name=f"{fname_base}.pptx",
                    mime="application/vnd.openxmlformats-officedocument.presentationml.presentation",
                    use_container_width=True)
            else:
                st.button("PPT N/A", disabled=True, use_container_width=True)
        with exp3:
            if docx_b:
                st.download_button("📝 Word", data=docx_b,
                    file_name=f"{fname_base}.docx",
                    mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    use_container_width=True)
            else:
                st.button("Word N/A", disabled=True, use_container_width=True)
        with exp4:
            if xlsx_b:
                st.download_button("📈 Excel", data=xlsx_b,
                    file_name=f"{fname_base}.xlsx",
                    mime="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    use_container_width=True)
            else:
                st.button("Excel N/A", disabled=True, use_container_width=True)

        # ── Refinement section ────────────────────────────────────────────────
        st.markdown('<span class="export-section-title" style="margin-top:14px;">🛠️ Refine Content</span>', unsafe_allow_html=True)
        ref1, ref2 = st.columns([4, 1])
        with ref1:
            preset = st.selectbox(
                "Refinement preset",
                [""] + IMPROVEMENT_SUGGESTIONS,
                label_visibility="collapsed",
                key="refine_select",
            )
        with ref2:
            if st.button("Apply", use_container_width=True):
                if preset:
                    st.session_state.applied_improvements.append(
                        {"id": uuid.uuid4().hex[:8], "text": preset}
                    )
                    st.rerun()

        # Active refinements as dismissible chips
        imp_to_remove = None
        if st.session_state.applied_improvements:
            for ii, imp in enumerate(st.session_state.applied_improvements):
                ic1, ic2 = st.columns([5, 1])
                with ic1:
                    st.markdown(
                        f'<span style="font-size:11.5px; background:#F0FDF4; border:1px solid #BBF7D0; '
                        f'color:#166534; padding:3px 8px; border-radius:5px; display:inline-block;">🛠️ {imp["text"]}</span>',
                        unsafe_allow_html=True,
                    )
                with ic2:
                    if st.button("✕", key=f"rm_imp_{ii}"):
                        imp_to_remove = ii
            if imp_to_remove is not None:
                st.session_state.applied_improvements.pop(imp_to_remove)
                st.rerun()

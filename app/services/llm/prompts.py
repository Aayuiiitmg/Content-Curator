"""All LLM prompt templates in one place."""

OUTLINE_SYSTEM = """You are an expert presentation designer and strategist.
Your job is to create a structured slide outline from source content.
Always respond with valid JSON only — no markdown fences, no extra prose."""

OUTLINE_USER = """Create a slide presentation outline from the following source content.

Target slides: {num_slides}
Audience: {audience}
Tone: {tone}
Focus: {focus}

SOURCE CONTENT:
{content}

Respond with this exact JSON structure:
{{
  "title": "Presentation title here",
  "outline": [
    {{
      "slide_number": 1,
      "title": "Slide title",
      "purpose": "What this slide achieves",
      "key_points": ["point 1", "point 2", "point 3"]
    }}
  ]
}}

Rules:
- First slide must be a title/overview slide
- Last slide must be a conclusion/next steps slide
- Each slide should have 3-5 key points
- Keep titles concise (max 8 words)
- Make the outline logical and flow naturally"""


SLIDE_SYSTEM = """You are a presentation content writer.
You create compelling, concise slide content from outlines.
Always respond with valid JSON only — no markdown fences, no extra prose."""

SLIDE_USER = """Generate full slide content for this outline item.

Presentation title: {presentation_title}
Audience: {audience}
Tone: {tone}

Slide outline:
- Number: {slide_number}
- Title: {title}
- Purpose: {purpose}
- Key points: {key_points}

SOURCE MATERIAL (for reference):
{source_excerpt}

Respond with this exact JSON structure:
{{
  "slide_number": {slide_number},
  "title": "Slide title (concise, max 8 words)",
  "bullets": [
    "Bullet point 1 (concise, actionable)",
    "Bullet point 2",
    "Bullet point 3"
  ],
  "speaker_notes": "2-3 sentences the presenter would say to expand on this slide.",
  "layout": "bullets",
  "visual_suggestion": "Brief suggestion for an image or icon (optional)"
}}

Layout options: bullets | two_column | big_stat | image_text | title_only
Rules:
- 3-5 bullets per slide (except title_only)
- Each bullet max 12 words
- Speaker notes should add context not on the slide
- big_stat layout: first bullet is the stat (e.g. "47% increase"), rest are context"""


SLIDE_EDIT_SYSTEM = """You are a presentation editor. You update slide content based on user instructions.
Always respond with valid JSON only — no markdown fences, no extra prose."""

SLIDE_EDIT_USER = """Edit this slide based on the instruction below.

Instruction: {instruction}

Current slide:
{current_slide_json}

Respond with the complete updated slide in this exact JSON structure:
{{
  "slide_number": {slide_number},
  "title": "...",
  "bullets": ["...", "..."],
  "speaker_notes": "...",
  "layout": "...",
  "visual_suggestion": "..."
}}"""

# Content Curator — Tata Steel Edition

Enterprise knowledge transformation platform for converting organizational knowledge into polished deliverables including presentations, reports, SOPs, handbooks, training materials, videos, and podcasts.

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Application Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── WorkflowTracker.jsx
│   ├── LeftPanel.jsx
│   ├── CenterPanel.jsx
│   ├── RightPanel.jsx
│   ├── BusinessContextCard.jsx
│   ├── DomainSelector.jsx
│   ├── OutputTypeSelector.jsx
│   ├── UploadZone.jsx
│   ├── ObjectiveCard.jsx
│   ├── InstructionsCard.jsx
│   ├── GenerationSummary.jsx
│   ├── ImprovementBar.jsx
│   ├── ArtifactTabs.jsx
│   ├── PresentationPreview.jsx
│   ├── DocumentPreview.jsx
│   ├── SpreadsheetPreview.jsx
│   ├── VideoPreview.jsx
│   ├── PodcastPreview.jsx
│   ├── HandbookPreview.jsx
│   ├── SOPPreview.jsx
│   └── TrustPanel.jsx
├── data/
│   └── mockData.js
├── App.jsx
├── main.jsx
└── index.css
```

## Workflow

1. **Provide Context** — Enter business context and select industry domain
2. **Upload Documents** — Add templates and source reference materials
3. **Define Objective** — Set business objective and generation instructions
4. **Generate Assets** — Click Generate to create enterprise deliverables
5. **Review & Export** — Preview outputs across 7 artifact types and export

import {
  FileOutput,
  Maximize2,
  Download,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import PresentationPreview from './PresentationPreview'
import DocumentPreview from './DocumentPreview'
import SpreadsheetPreview from './SpreadsheetPreview'
import VideoPreview from './VideoPreview'
import PodcastPreview from './PodcastPreview'
import HandbookPreview from './HandbookPreview'
import SOPPreview from './SOPPreview'
import TrustPanel from './TrustPanel'
import RefinementBanner from './RefinementBanner'
import { PanelHeader } from './PanelLayout'
import { OUTPUT_TYPE_LABELS } from '../data/mockData'

const PREVIEW_MAP = {
  presentation: PresentationPreview,
  document: DocumentPreview,
  spreadsheet: SpreadsheetPreview,
  video: VideoPreview,
  podcast: PodcastPreview,
  handbook: HandbookPreview,
  sop: SOPPreview,
}

export default function RightPanel({
  activeArtifact,
  outputType,
  hasGenerated,
  trustItems,
  sourceCount,
  lastGenerated,
  appliedImprovements,
  isImproving,
}) {
  const PreviewComponent = PREVIEW_MAP[activeArtifact] || PresentationPreview
  const previewLabel = OUTPUT_TYPE_LABELS[activeArtifact] || outputType

  return (
    <main className="flex-1 flex flex-col min-w-0 min-h-0 bg-white">
      <PanelHeader
        title="Enterprise Workspace"
        subtitle="Review, refine, and export your deliverable"
        badge="Output"
        icon={FileOutput}
      />

      <div className="flex-shrink-0 px-4 py-2.5 bg-white border-b border-slate-200/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-semibold text-slate-800 truncate">{outputType}</span>
          <span className="text-[10px] text-slate-400 bg-slate-100 border border-slate-200/80 px-2 py-0.5 rounded-md flex-shrink-0">
            {previewLabel}
          </span>
          {hasGenerated && appliedImprovements.length > 0 && (
            <span className="text-[10px] font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md flex-shrink-0">
              v{appliedImprovements.length + 1}
            </span>
          )}
        </div>

        {hasGenerated && (
          <div className="flex items-center gap-1 flex-shrink-0">
            <button type="button" className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Zoom out">
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button type="button" className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Zoom in">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button type="button" className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Fullscreen">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button type="button" className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" aria-label="Download">
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <RefinementBanner appliedImprovements={appliedImprovements} isImproving={isImproving} />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="flex-1 min-h-0 workspace-canvas">
          <PreviewComponent
            hasGenerated={hasGenerated}
            outputType={outputType}
            appliedImprovements={appliedImprovements}
            isImproving={isImproving}
          />
        </div>
        <TrustPanel
          items={trustItems}
          sourceCount={sourceCount}
          lastGenerated={lastGenerated}
          hasGenerated={hasGenerated}
          outputType={outputType}
          appliedImprovements={appliedImprovements}
        />
      </div>
    </main>
  )
}

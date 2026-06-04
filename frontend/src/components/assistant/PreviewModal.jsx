import { X, Download } from 'lucide-react'
import PresentationPreview from '../PresentationPreview'
import DocumentPreview from '../DocumentPreview'
import SpreadsheetPreview from '../SpreadsheetPreview'
import VideoPreview from '../VideoPreview'
import PodcastPreview from '../PodcastPreview'
import HandbookPreview from '../HandbookPreview'
import SOPPreview from '../SOPPreview'

const PREVIEW_MAP = {
  presentation: PresentationPreview,
  document: DocumentPreview,
  spreadsheet: SpreadsheetPreview,
  video: VideoPreview,
  podcast: PodcastPreview,
  handbook: HandbookPreview,
  sop: SOPPreview,
}

export default function PreviewModal({ asset, outputType, appliedImprovements, onClose }) {
  if (!asset) return null

  const PreviewComponent = PREVIEW_MAP[asset.artifact] || PresentationPreview

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-up">
        <div className="flex-shrink-0 flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-900">{asset.label}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{outputType}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Close preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden bg-slate-50">
          <PreviewComponent
            hasGenerated
            outputType={outputType}
            appliedImprovements={appliedImprovements}
            isImproving={false}
          />
        </div>
      </div>
    </div>
  )
}

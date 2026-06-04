import {
  Presentation,
  BookOpen,
  ClipboardList,
  FileText,
  FileSpreadsheet,
  Video,
  Mic,
  ChevronRight,
} from 'lucide-react'

const ICONS = {
  presentation: Presentation,
  handbook: BookOpen,
  sop: ClipboardList,
  document: FileText,
  spreadsheet: FileSpreadsheet,
  video: Video,
  podcast: Mic,
}

export default function AssetCard({ asset, onClick }) {
  const Icon = ICONS[asset.artifact] || FileText

  return (
    <button
      type="button"
      onClick={() => onClick(asset)}
      className="flex items-center gap-3 p-4 bg-white hover:bg-slate-50 rounded-xl border border-slate-200/80 hover:border-slate-300 text-left transition-all group w-full sm:w-auto sm:min-w-[200px]"
    >
      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
        <Icon className="w-5 h-5 text-indigo-600" strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900">{asset.label}</p>
        {asset.description && (
          <p className="text-xs text-slate-500 mt-0.5">{asset.description}</p>
        )}
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 flex-shrink-0" />
    </button>
  )
}

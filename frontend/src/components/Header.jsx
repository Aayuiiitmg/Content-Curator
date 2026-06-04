import { Save, Download, Sparkles } from 'lucide-react'

export default function Header({ lastSaved, onGenerate, onSaveDraft, onExport, outputType, isGenerating }) {
  return (
    <header className="flex-shrink-0 h-[60px] bg-white border-b border-slate-200/80 px-5 flex items-center justify-between z-20">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-[11px] font-bold tracking-tight">TS</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900 leading-none">Content Curator</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Tata Steel Enterprise</p>
          </div>
        </div>

        <div className="hidden lg:block h-6 w-px bg-slate-200 mx-1" />

        <div className="hidden lg:flex items-center gap-2 min-w-0">
          <span className="text-sm text-slate-700 font-medium truncate max-w-[220px]">
            Blast Furnace Safety Training
          </span>
          <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md flex-shrink-0">
            Q3 2026
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200/80 rounded-lg">
        <span className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">Output</span>
        <span className="text-xs font-medium text-slate-700">{outputType}</span>
        <span className="text-slate-300">·</span>
        <span className="text-[11px] text-slate-400">{lastSaved}</span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <button type="button" onClick={onSaveDraft} className="btn-secondary hidden sm:inline-flex">
          <Save className="w-4 h-4 text-slate-500" />
          Save
        </button>
        <button type="button" onClick={onExport} className="btn-secondary hidden sm:inline-flex">
          <Download className="w-4 h-4 text-slate-500" />
          Export
        </button>
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-pulse' : ''}`} />
          {isGenerating ? 'Generating…' : 'Generate'}
        </button>
        <button
          type="button"
          className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center hover:bg-slate-200/60 transition-colors"
        >
          <span className="text-xs font-semibold text-slate-600">AS</span>
        </button>
      </div>
    </header>
  )
}

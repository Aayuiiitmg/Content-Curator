import { Send, Loader2, CheckCircle2 } from 'lucide-react'
import { IMPROVEMENT_SUGGESTIONS } from '../utils/improvements'
import { Card, CardLabel } from './PanelLayout'

export default function ImprovementBar({
  value,
  onChange,
  onSubmit,
  hasGenerated,
  isImproving,
  lastFeedback,
}) {
  const canSubmit = hasGenerated && !isImproving && value.trim().length > 0

  return (
    <Card>
      <div className="p-4">
        <CardLabel>Improve Results</CardLabel>
        <p className="text-[11px] text-slate-500 mb-3 -mt-1">
          {hasGenerated ? 'Refine the generated content with specific feedback.' : 'Available after your first generation.'}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {IMPROVEMENT_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              disabled={!hasGenerated || isImproving}
              onClick={() => onChange(suggestion)}
              className="text-[10px] px-2 py-1 rounded-md border border-slate-200 text-slate-500 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-35 disabled:cursor-not-allowed transition-all duration-150"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            id="improvement"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={!hasGenerated || isImproving}
            placeholder={hasGenerated ? 'Describe your refinement…' : 'Generate content first'}
            className="input-field flex-1 !py-2"
            onKeyDown={(e) => e.key === 'Enter' && canSubmit && onSubmit()}
          />
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-200 disabled:hover:text-slate-500 transition-all duration-150 flex-shrink-0"
            aria-label="Submit improvement"
          >
            {isImproving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>

        {lastFeedback && (
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            {lastFeedback}
          </div>
        )}
      </div>
    </Card>
  )
}

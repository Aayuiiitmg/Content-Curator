import { Sparkles, CheckCircle2 } from 'lucide-react'

export default function RefinementBanner({ appliedImprovements, isImproving }) {
  if (!isImproving && appliedImprovements.length === 0) return null

  return (
    <div className="flex-shrink-0 mx-4 mt-3 px-3.5 py-2.5 bg-indigo-600/[0.06] border border-indigo-200/60 rounded-xl">
      <div className="flex items-start gap-2.5">
        <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${isImproving ? 'bg-indigo-100' : 'bg-emerald-100'}`}>
          {isImproving ? (
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-800">
            {isImproving ? 'Applying your refinement…' : `${appliedImprovements.length} refinement${appliedImprovements.length > 1 ? 's' : ''} applied`}
          </p>
          {!isImproving && (
            <ul className="mt-1 space-y-0.5">
              {appliedImprovements.map((item) => (
                <li key={item.id} className="text-[11px] text-slate-500 truncate">
                  {item.text}
                  <span className="text-slate-400 ml-2">{item.timestamp}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

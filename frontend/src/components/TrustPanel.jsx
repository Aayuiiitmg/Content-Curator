import { CheckCircle2, Shield, FileText, Clock, Sparkles } from 'lucide-react'

export default function TrustPanel({
  items,
  sourceCount,
  lastGenerated,
  hasGenerated,
  outputType,
  appliedImprovements = [],
}) {
  if (!hasGenerated) return null

  return (
    <div className="flex-shrink-0 border-t border-slate-200/80 bg-white px-5 py-3">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mr-1">Verified</span>
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span className="text-[11px] text-slate-600">{item.label}</span>
            </div>
          ))}
          {appliedImprovements.length > 0 && (
            <div className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span className="text-[11px] text-indigo-600">{appliedImprovements.length} refinements</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{sourceCount} sources</span>
          <span className="flex items-center gap-1 text-emerald-600 font-medium"><Shield className="w-3 h-3" />High confidence</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{lastGenerated}</span>
        </div>
      </div>
    </div>
  )
}

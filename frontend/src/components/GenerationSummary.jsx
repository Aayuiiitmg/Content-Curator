import { CheckCircle2, Circle, Loader2 } from 'lucide-react'
import { Card } from './PanelLayout'

export default function GenerationSummary({ items, isGenerating }) {
  if (items.length === 0 && !isGenerating) {
    return (
      <Card>
        <div className="p-4 text-center">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-2.5">
            <Circle className="w-4 h-4 text-slate-300" />
          </div>
          <p className="text-xs font-medium text-slate-600">Awaiting generation</p>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            Progress steps will appear here after you click Generate.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="p-4">
        <div className="space-y-0">
          {items.map((item, index) => (
            <div key={item.id} className="flex gap-3">
              <div className="flex flex-col items-center pt-0.5">
                {item.status === 'complete' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                ) : item.status === 'in-progress' ? (
                  <Loader2 className="w-4 h-4 text-indigo-500 animate-spin flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-200 flex-shrink-0" />
                )}
                {index < items.length - 1 && (
                  <div className="w-px flex-1 bg-slate-100 my-1 min-h-[14px]" />
                )}
              </div>
              <div className="pb-3 flex-1 min-w-0">
                <p className={`text-xs leading-snug ${item.status === 'complete' ? 'text-slate-700' : 'text-slate-500'}`}>
                  {item.description}
                </p>
                {item.timestamp && (
                  <p className="text-[10px] text-slate-400 mt-0.5 tabular-nums">{item.timestamp}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

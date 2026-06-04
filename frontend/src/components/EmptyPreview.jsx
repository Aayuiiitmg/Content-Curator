import { Monitor, ArrowRight, Sparkles } from 'lucide-react'

export default function EmptyPreview({ outputType, label }) {
  const steps = [
    'Configure context in the left panel',
    'Set your objective and click Generate',
    'Review your deliverable here',
  ]

  return (
    <div className="flex-1 flex items-center justify-center p-8 workspace-canvas">
      <div className="text-center max-w-xs animate-fade-up">
        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center mx-auto mb-5">
          <Monitor className="w-7 h-7 text-slate-300" strokeWidth={1.5} />
        </div>
        <p className="text-sm font-semibold text-slate-800">Preview workspace</p>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
          Your <span className="font-medium text-indigo-600">{outputType}</span> will render here as a {label}.
        </p>

        <div className="mt-6 space-y-2.5 text-left">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2.5 text-xs text-slate-500">
              <span className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 text-[10px] font-bold text-indigo-600 flex items-center justify-center flex-shrink-0">
                {i + 1}
              </span>
              {step}
              {i < steps.length - 1 && <ArrowRight className="w-3 h-3 text-slate-300 ml-auto hidden sm:block" />}
            </div>
          ))}
        </div>

        <div className="mt-6 inline-flex items-center gap-1.5 text-[11px] text-slate-400 bg-white border border-slate-200/80 rounded-full px-3 py-1.5">
          <Sparkles className="w-3 h-3" />
          Click Generate to begin
        </div>
      </div>
    </div>
  )
}

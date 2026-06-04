import { Check } from 'lucide-react'
import { WORKFLOW_STEPS } from '../data/mockData'

export default function WorkflowTracker({ currentStep }) {
  return (
    <div className="flex-shrink-0 bg-white border-b border-slate-200/80 px-5 py-3">
      <div className="flex items-center gap-1 max-w-3xl">
        {WORKFLOW_STEPS.map((step, index) => {
          const isComplete = step.id < currentStep
          const isCurrent = step.id === currentStep
          const isLast = index === WORKFLOW_STEPS.length - 1

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 transition-all duration-200 ${
                    isComplete
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                        ? 'bg-indigo-600 text-white ring-[3px] ring-indigo-100'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isComplete ? <Check className="w-3 h-3" strokeWidth={2.5} /> : step.id}
                </div>
                <span
                  className={`text-xs truncate hidden sm:block ${
                    isCurrent
                      ? 'font-semibold text-indigo-600'
                      : isComplete
                        ? 'font-medium text-slate-600'
                        : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div className="flex-1 mx-2 sm:mx-3 h-px bg-slate-200 relative min-w-[12px]">
                  <div
                    className="absolute inset-y-0 left-0 bg-emerald-400 transition-all duration-300"
                    style={{ width: isComplete ? '100%' : isCurrent ? '50%' : '0%' }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

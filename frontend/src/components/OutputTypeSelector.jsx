import {
  FileText,
  GraduationCap,
  ClipboardList,
  BookOpen,
  Presentation,
  Video,
  Mic,
} from 'lucide-react'
import { OUTPUT_TYPES } from '../data/mockData'
import { Card } from './PanelLayout'

const OUTPUT_ICONS = {
  'Executive Report': FileText,
  'Training Program': GraduationCap,
  SOP: ClipboardList,
  Handbook: BookOpen,
  Presentation: Presentation,
  'Video Script': Video,
  'Podcast Script': Mic,
}

export default function OutputTypeSelector({ value, onChange }) {
  return (
    <Card>
      <div className="p-3.5 pb-2">
        <span className="block text-sm font-medium text-slate-800">Output Type</span>
        <p className="text-xs text-slate-500 mt-0.5">Choose your deliverable format</p>
      </div>
      <div className="px-3.5 pb-3.5 grid grid-cols-2 gap-1.5">
        {OUTPUT_TYPES.map((type) => {
          const isActive = value === type
          const Icon = OUTPUT_ICONS[type] || FileText
          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-left transition-all duration-150 ${
                isActive
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-600/25'
                  : 'bg-white border-slate-200/80 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-indigo-100' : 'text-slate-400'}`} strokeWidth={1.75} />
              <span className="text-[11px] font-medium leading-tight">{type}</span>
            </button>
          )
        })}
      </div>
    </Card>
  )
}

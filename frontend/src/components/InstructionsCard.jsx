import { LayoutTemplate, Paperclip, Sparkles } from 'lucide-react'
import { Card, CardLabel } from './PanelLayout'

export default function InstructionsCard({ value, onChange, onGenerate, isGenerating, outputType }) {
  return (
    <Card>
      <div className="p-4">
        <CardLabel>Generation Instructions</CardLabel>
        <textarea
          id="instructions"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Describe your ${outputType} requirements…`}
          rows={4}
          className="input-field resize-none"
        />
      </div>
      <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
        <button type="button" className="btn-secondary !px-2.5 !py-1.5 !text-xs">
          <LayoutTemplate className="w-3.5 h-3.5" />
          Templates
        </button>
        <button type="button" className="btn-secondary !px-2.5 !py-1.5 !text-xs">
          <Paperclip className="w-3.5 h-3.5" />
          Attach
        </button>
        <button
          type="button"
          onClick={onGenerate}
          disabled={isGenerating}
          className="btn-primary !px-3.5 !py-1.5 !text-xs ml-auto disabled:opacity-60"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-pulse' : ''}`} />
          {isGenerating ? 'Generating…' : 'Generate'}
        </button>
      </div>
    </Card>
  )
}

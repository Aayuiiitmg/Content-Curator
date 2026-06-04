import { ChevronDown, ChevronUp } from 'lucide-react'
import { DOMAINS, OUTPUT_TYPES, COMPLIANCE_FRAMEWORKS } from '../../data/mockData'

export default function AdvancedOptionsDrawer({
  isOpen,
  onToggle,
  domain,
  onDomainChange,
  outputType,
  onOutputTypeChange,
  complianceFrameworks,
  onComplianceToggle,
  customInstructions,
  onCustomInstructionsChange,
  templateFiles,
  onTemplateFilesAdd,
  onTemplateRemove,
}) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 mx-auto transition-colors"
      >
        Advanced Options
        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {isOpen && (
        <div className="mt-4 p-5 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-4 animate-fade-up">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Industry Domain</label>
              <select
                value={domain}
                onChange={(e) => onDomainChange(e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              >
                {DOMAINS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5">Output Type</label>
              <select
                value={outputType}
                onChange={(e) => onOutputTypeChange(e.target.value)}
                className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
              >
                {OUTPUT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Compliance Frameworks</label>
            <div className="flex flex-wrap gap-1.5">
              {COMPLIANCE_FRAMEWORKS.map((fw) => {
                const active = complianceFrameworks.includes(fw)
                return (
                  <button
                    key={fw}
                    type="button"
                    onClick={() => onComplianceToggle(fw)}
                    className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {fw.split(' — ')[0]}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Custom Instructions</label>
            <textarea
              value={customInstructions}
              onChange={(e) => onCustomInstructionsChange(e.target.value)}
              placeholder="Optional tone, format, or audience guidance..."
              rows={2}
              className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Templates</label>
            <div className="flex flex-wrap gap-2 items-center">
              <label className="text-xs text-indigo-600 hover:text-indigo-700 cursor-pointer font-medium">
                + Add template
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.pptx,.xlsx"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.length) onTemplateFilesAdd(e.target.files)
                    e.target.value = ''
                  }}
                />
              </label>
              {templateFiles.map((f) => (
                <span
                  key={f.id}
                  className="inline-flex items-center gap-1 text-[11px] bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-600"
                >
                  {f.name}
                  <button
                    type="button"
                    onClick={() => onTemplateRemove(f.id)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

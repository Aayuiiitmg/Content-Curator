import { useId } from 'react'
import { Paperclip, ArrowUp, Loader2 } from 'lucide-react'

const FILE_ACCEPT =
  '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain'

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  onFilesAdd,
  uploadedCount,
  isGenerating,
  placeholder,
}) {
  const inputId = useId()
  const canSubmit = value.trim().length > 0 && !isGenerating

  const handleFileChange = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFilesAdd(files)
    }
    e.target.value = ''
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && canSubmit) {
              e.preventDefault()
              onSubmit()
            }
          }}
          placeholder={placeholder}
          rows={3}
          disabled={isGenerating}
          className="w-full resize-none bg-transparent px-5 pt-4 pb-14 text-[15px] text-slate-900 placeholder:text-slate-400 focus:outline-none disabled:opacity-60"
        />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {isGenerating ? (
            <span className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300">
              <Paperclip className="w-4 h-4" />
              {uploadedCount > 0 ? `${uploadedCount} file${uploadedCount !== 1 ? 's' : ''} attached` : 'Attach documents'}
            </span>
          ) : (
            <label
              htmlFor={inputId}
              className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
            >
              <Paperclip className="w-4 h-4" />
              {uploadedCount > 0 ? `${uploadedCount} file${uploadedCount !== 1 ? 's' : ''} attached` : 'Attach documents'}
            </label>
          )}
          <input
            id={inputId}
            type="file"
            multiple
            accept={FILE_ACCEPT}
            disabled={isGenerating}
            className="sr-only"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            className="pointer-events-auto w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Generate"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ArrowUp className="w-4 h-4" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>
      <p className="text-center text-[11px] text-slate-400 mt-3">
        Press Enter to generate · Shift+Enter for new line
      </p>
    </div>
  )
}

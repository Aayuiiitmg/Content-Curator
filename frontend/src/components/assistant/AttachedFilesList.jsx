import { X } from 'lucide-react'
import { getFileIcon } from '../../data/mockData'

function formatSize(bytes) {
  if (!bytes || typeof bytes === 'string') return bytes || ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function AttachedFilesList({ files, onRemove }) {
  if (!files.length) return null

  return (
    <div className="w-full max-w-3xl mx-auto mb-3 flex flex-wrap gap-2">
      {files.map((file) => (
        <div
          key={file.id}
          className="inline-flex items-center gap-2 pl-2.5 pr-1.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm max-w-full"
        >
          <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-1 py-0.5 rounded">
            {getFileIcon(file.type)}
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-slate-800 truncate max-w-[180px]">{file.name}</p>
            <p className="text-[10px] text-slate-400">{formatSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(file.id)}
            className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
            aria-label={`Remove ${file.name}`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}

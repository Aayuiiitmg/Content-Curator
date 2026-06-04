import { useRef } from 'react'
import { Upload, X, File } from 'lucide-react'
import { getFileIcon } from '../data/mockData'
import { Card } from './PanelLayout'

export default function UploadZone({ files, onFilesChange, accept, label, description }) {
  const inputRef = useRef(null)
  const isDragging = useRef(false)

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      name: file.name,
      size: file.size,
      type: file.name.split('.').pop()?.toLowerCase() || 'default',
    }))
    onFilesChange([...files, ...newFiles])
  }

  const handleDrop = (e) => {
    e.preventDefault()
    isDragging.current = false
    e.currentTarget.classList.remove('!border-indigo-400', '!bg-indigo-50/40')
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    if (!isDragging.current) {
      isDragging.current = true
      e.currentTarget.classList.add('!border-indigo-400', '!bg-indigo-50/40')
    }
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    isDragging.current = false
    e.currentTarget.classList.remove('!border-indigo-400', '!bg-indigo-50/40')
  }

  const removeFile = (id) => onFilesChange(files.filter((f) => f.id !== id))

  const formatSize = (bytes) => {
    if (typeof bytes === 'string') return bytes
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <Card hover>
      <div className="p-3.5">
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5 mb-3">{description}</p>}

        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="border-2 border-dashed border-slate-200 rounded-xl p-5 flex flex-col items-center cursor-pointer hover:border-indigo-300 transition-all duration-150 group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center mb-2.5 transition-colors">
            <Upload className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </div>
          <p className="text-xs font-medium text-slate-600">Drop files or click to browse</p>
          <p className="text-[11px] text-slate-400 mt-1">PDF · DOCX · PPTX · XLSX</p>
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={accept}
            className="hidden"
            onChange={(e) => {
              if (e.target.files.length) handleFiles(e.target.files)
              e.target.value = ''
            }}
          />
        </div>

        {files.length > 0 ? (
          <div className="mt-3 space-y-1.5">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100 group/file hover:border-slate-200 transition-colors"
              >
                <div className="w-7 h-7 bg-white border border-slate-200 rounded-md flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-bold text-indigo-600">{getFileIcon(file.type)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-800 truncate">{file.name}</p>
                  <p className="text-[10px] text-slate-400">{formatSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="p-1 rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover/file:opacity-100 transition-all"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-400">
            <File className="w-3 h-3" />
            <span>No files yet</span>
          </div>
        )}
      </div>
    </Card>
  )
}

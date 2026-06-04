import { FileText, Clock } from 'lucide-react'

export default function RecentDocuments({ documents, onSelect }) {
  if (!documents.length) return null

  return (
    <section className="w-full max-w-3xl mx-auto">
      <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">Recent Documents</h3>
      <div className="space-y-1">
        {documents.map((doc) => (
          <button
            key={doc.id}
            type="button"
            onClick={() => onSelect?.(doc)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 text-left transition-colors group"
          >
            <FileText className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700 truncate">{doc.name}</p>
              <p className="text-xs text-slate-400">{doc.type}</p>
            </div>
            <span className="text-xs text-slate-400 flex items-center gap-1 flex-shrink-0">
              <Clock className="w-3 h-3" />
              {doc.date}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

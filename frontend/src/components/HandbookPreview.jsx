import { useMemo, useState } from 'react'
import { HANDBOOK_CHAPTERS } from '../data/mockData'
import { getAppliedDeltas, mergeHandbookChapters } from '../utils/improvements'
import EmptyPreview from './EmptyPreview'

export default function HandbookPreview({ hasGenerated, outputType, appliedImprovements = [], isImproving }) {
  const [activeChapter, setActiveChapter] = useState(0)

  const chapters = useMemo(() => {
    const deltas = getAppliedDeltas(appliedImprovements)
    return mergeHandbookChapters(HANDBOOK_CHAPTERS, deltas)
  }, [appliedImprovements])

  const chapter = chapters[activeChapter]

  if (!hasGenerated) {
    return <EmptyPreview outputType={outputType} label="handbook" />
  }

  return (
    <div className={`flex-1 flex min-h-0 transition-opacity ${isImproving ? 'opacity-60' : 'opacity-100'}`}>
      <nav className="w-48 flex-shrink-0 border-r border-slate-200 bg-slate-50 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-xs uppercase tracking-wide text-slate-500 font-medium mb-3">Contents</h3>
          <ul className="space-y-1">
            {chapters.map((ch, index) => (
              <li key={ch.id}>
                <button
                  type="button"
                  onClick={() => setActiveChapter(index)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    index === activeChapter
                      ? 'bg-indigo-50 text-indigo-600 font-medium'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xs text-slate-400 mr-1">Ch. {ch.id}</span>
                  {ch.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <article className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl">
          <div className="mb-6 pb-4 border-b border-slate-200">
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              Blast Furnace Operations Handbook
              {appliedImprovements.length > 0 && (
                <span className="ml-2 text-indigo-600">· v{appliedImprovements.length + 1}</span>
              )}
            </p>
            <h1 className="text-xl font-semibold text-slate-900 mt-1">
              Chapter {chapter.id}: {chapter.title}
            </h1>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{chapter.content}</p>
          <div className="flex justify-between mt-8 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setActiveChapter((p) => Math.max(0, p - 1))}
              disabled={activeChapter === 0}
              className="text-sm text-indigo-600 hover:text-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Previous Chapter
            </button>
            <button
              type="button"
              onClick={() => setActiveChapter((p) => Math.min(chapters.length - 1, p + 1))}
              disabled={activeChapter === chapters.length - 1}
              className="text-sm text-indigo-600 hover:text-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next Chapter →
            </button>
          </div>
        </div>
      </article>
    </div>
  )
}

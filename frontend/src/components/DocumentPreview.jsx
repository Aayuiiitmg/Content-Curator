import { useMemo } from 'react'
import { DOCUMENT_SECTIONS } from '../data/mockData'
import { getAppliedDeltas, mergeDocumentSections } from '../utils/improvements'
import EmptyPreview from './EmptyPreview'

export default function DocumentPreview({ hasGenerated, outputType, appliedImprovements = [], isImproving }) {
  const sections = useMemo(() => {
    const deltas = getAppliedDeltas(appliedImprovements)
    return mergeDocumentSections(DOCUMENT_SECTIONS, deltas)
  }, [appliedImprovements])

  if (!hasGenerated) {
    return <EmptyPreview outputType={outputType} label="executive report" />
  }

  return (
    <div className={`flex-1 overflow-y-auto p-5 transition-opacity duration-300 ${isImproving ? 'opacity-50' : 'opacity-100'}`}>
      <div className="max-w-2xl mx-auto bg-white border border-slate-200/80 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-8 py-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">TS</span>
            </div>
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Tata Steel Limited</p>
              <p className="text-xs text-slate-400">Internal — Confidential</p>
            </div>
          </div>
          <h1 className="text-xl font-semibold text-slate-900">
            Q3 Blast Furnace Safety Training Program
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Executive Report · Jamshedpur Plant · June 2026
            {appliedImprovements.length > 0 && (
              <span className="ml-2 text-indigo-600 font-medium">· Revised v{appliedImprovements.length + 1}</span>
            )}
          </p>
        </div>

        <div className="px-8 py-6 space-y-6">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className={index >= DOCUMENT_SECTIONS.length ? 'bg-indigo-50/50 -mx-2 px-2 py-3 rounded-lg border border-indigo-100' : ''}
            >
              <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">
                {index + 1}. {section.title}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>

        <div className="border-t border-slate-200 px-8 py-4 flex justify-between text-xs text-slate-400">
          <span>Document ID: RPT-BF-SAF-2026-Q3</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  )
}

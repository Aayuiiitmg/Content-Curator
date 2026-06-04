import { useMemo } from 'react'
import { SOP_SECTIONS } from '../data/mockData'
import { getAppliedDeltas, mergeSopSections } from '../utils/improvements'
import EmptyPreview from './EmptyPreview'

export default function SOPPreview({ hasGenerated, outputType, appliedImprovements = [], isImproving }) {
  const sections = useMemo(() => {
    const deltas = getAppliedDeltas(appliedImprovements)
    return mergeSopSections(SOP_SECTIONS, deltas)
  }, [appliedImprovements])

  const title = sections._titleOverride || 'Contractor Safety Compliance SOP'

  if (!hasGenerated) {
    return <EmptyPreview outputType={outputType} label="SOP" />
  }

  return (
    <div className={`flex-1 overflow-y-auto p-6 transition-opacity ${isImproving ? 'opacity-60' : 'opacity-100'}`}>
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="border-b-2 border-indigo-600 px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide">Standard Operating Procedure</p>
              <h1 className="text-xl font-semibold text-slate-900 mt-1">{title}</h1>
              <p className="text-sm text-slate-600 mt-1">
                SOP-EHS-CON-001 · Rev 3.{appliedImprovements.length} · June 2026
              </p>
            </div>
            <div className="text-right">
              <div className="w-10 h-10 bg-indigo-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">TS</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Tata Steel Limited</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          <table className="w-full text-xs border border-slate-200 mb-6">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="px-3 py-2 bg-slate-50 font-medium text-slate-600 w-1/4">Document ID</td>
                <td className="px-3 py-2 text-slate-900">SOP-EHS-CON-001</td>
                <td className="px-3 py-2 bg-slate-50 font-medium text-slate-600 w-1/4">Classification</td>
                <td className="px-3 py-2 text-slate-900">Internal — Controlled</td>
              </tr>
              <tr>
                <td className="px-3 py-2 bg-slate-50 font-medium text-slate-600">Effective Date</td>
                <td className="px-3 py-2 text-slate-900">01 June 2026</td>
                <td className="px-3 py-2 bg-slate-50 font-medium text-slate-600">Review Date</td>
                <td className="px-3 py-2 text-slate-900">01 June 2027</td>
              </tr>
            </tbody>
          </table>

          <div className="space-y-5">
            {sections.filter((s) => s.title).map((section, index) => (
              <section key={section.title}>
                <h2 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-600 text-white text-xs rounded flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed pl-8">{section.content}</p>
              </section>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 px-8 py-4 bg-slate-50">
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-slate-500 font-medium">Prepared By</p>
              <p className="text-slate-900 mt-0.5">EHS Team</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Approved By</p>
              <p className="text-slate-900 mt-0.5">Plant Head — Jamshedpur</p>
            </div>
            <div>
              <p className="text-slate-500 font-medium">Status</p>
              <p className="text-emerald-600 font-medium mt-0.5">
                {appliedImprovements.length > 0 ? 'Revised' : 'Active'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

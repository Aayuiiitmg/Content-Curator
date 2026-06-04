import { SPREADSHEET_DATA } from '../data/mockData'
import EmptyPreview from './EmptyPreview'

function StatusBadge({ status }) {
  const styles = {
    'On Track': 'bg-blue-50 text-blue-700',
    'Action Required': 'bg-amber-50 text-amber-700',
    Compliant: 'bg-emerald-50 text-emerald-700',
    Critical: 'bg-red-50 text-red-700',
  }
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  )
}

function RiskBadge({ risk }) {
  const styles = {
    Low: 'text-emerald-600',
    Medium: 'text-amber-600',
    High: 'text-red-600',
  }
  return <span className={`text-sm font-medium ${styles[risk] || 'text-slate-600'}`}>{risk}</span>
}

export default function SpreadsheetPreview({ hasGenerated, outputType, appliedImprovements = [], isImproving }) {
  if (!hasGenerated) {
    return <EmptyPreview outputType={outputType} label="spreadsheet" />
  }

  return (
    <div className={`flex-1 overflow-auto p-4 transition-opacity ${isImproving ? 'opacity-60' : 'opacity-100'}`}>
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
          <h3 className="text-sm font-medium text-slate-900">Department Safety Compliance Tracker</h3>
          <p className="text-xs text-slate-500">Q3 2026 · Jamshedpur Plant</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-600 uppercase tracking-wide">
                  Department
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-600 uppercase tracking-wide">
                  Training Completion
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-600 uppercase tracking-wide">
                  Compliance Score
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-600 uppercase tracking-wide">
                  Risk Rating
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-600 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-600 uppercase tracking-wide">
                  Review Date
                </th>
              </tr>
            </thead>
            <tbody>
              {SPREADSHEET_DATA.map((row, index) => (
                <tr
                  key={row.department}
                  className={`border-b border-slate-100 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                >
                  <td className="px-4 py-2.5 font-medium text-slate-900">{row.department}</td>
                  <td className="px-4 py-2.5 text-slate-700">{row.completion}</td>
                  <td className="px-4 py-2.5 text-slate-700">{row.compliance}</td>
                  <td className="px-4 py-2.5"><RiskBadge risk={row.risk} /></td>
                  <td className="px-4 py-2.5"><StatusBadge status={row.status} /></td>
                  <td className="px-4 py-2.5 text-slate-500">{row.reviewDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

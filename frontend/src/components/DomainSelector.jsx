import { ChevronDown } from 'lucide-react'
import { DOMAINS } from '../data/mockData'
import { Card, CardLabel } from './PanelLayout'

export default function DomainSelector({ value, onChange }) {
  return (
    <Card>
      <div className="p-4">
        <CardLabel>Industry Domain</CardLabel>
        <div className="relative">
          <select
            id="industry-domain"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="input-field appearance-none pr-9 cursor-pointer"
          >
            {DOMAINS.map((domain) => (
              <option key={domain} value={domain}>
                {domain}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>
    </Card>
  )
}

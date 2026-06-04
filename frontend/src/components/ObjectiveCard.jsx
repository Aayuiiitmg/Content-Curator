import { Card, CardLabel } from './PanelLayout'

export default function ObjectiveCard({ value, onChange }) {
  return (
    <Card>
      <div className="p-4">
        <CardLabel>What do you need?</CardLabel>
        <textarea
          id="business-objective"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Create a Q3 Blast Furnace Safety Training Program for New Employees."
          rows={3}
          className="input-field resize-none"
        />
      </div>
    </Card>
  )
}

import { Card, CardLabel, CardFooter } from './PanelLayout'

export default function BusinessContextCard({ value, onChange }) {
  const charCount = value.length
  const maxChars = 5000

  return (
    <Card>
      <div className="p-4">
        <CardLabel>Business Context</CardLabel>
        <textarea
          id="business-context"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste emails, meeting notes, management directives, project briefs, plant observations, incident reports, or executive instructions."
          rows={5}
          maxLength={maxChars}
          className="input-field resize-none"
        />
      </div>
      <CardFooter>
        <span className="tabular-nums float-right">{charCount.toLocaleString()} / {maxChars.toLocaleString()}</span>
      </CardFooter>
    </Card>
  )
}

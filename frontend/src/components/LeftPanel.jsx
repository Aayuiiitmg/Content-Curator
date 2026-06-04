import { Layers } from 'lucide-react'
import BusinessContextCard from './BusinessContextCard'
import DomainSelector from './DomainSelector'
import OutputTypeSelector from './OutputTypeSelector'
import UploadZone from './UploadZone'
import { PanelShell, PanelSection } from './PanelLayout'

export default function LeftPanel({
  businessContext,
  onBusinessContextChange,
  domain,
  onDomainChange,
  outputType,
  onOutputTypeChange,
  templateFiles,
  onTemplateFilesChange,
  sourceFiles,
  onSourceFilesChange,
}) {
  return (
    <PanelShell
      title="Context & Sources"
      subtitle="Business inputs and reference materials"
      badge="Input"
      icon={Layers}
      className="w-1/4 min-w-[300px]"
    >
      <PanelSection label="Business Context" number={1}>
        <BusinessContextCard value={businessContext} onChange={onBusinessContextChange} />
      </PanelSection>

      <PanelSection label="Industry Domain" number={2}>
        <DomainSelector value={domain} onChange={onDomainChange} />
      </PanelSection>

      <PanelSection label="Output Type" number={3}>
        <OutputTypeSelector value={outputType} onChange={onOutputTypeChange} />
      </PanelSection>

      <PanelSection label="Existing Templates">
        <UploadZone
          label="Company Templates"
          description="Previous SOPs, training decks, frameworks"
          files={templateFiles}
          onFilesChange={onTemplateFilesChange}
          accept=".pdf,.docx,.pptx,.xlsx,.doc,.ppt,.xls"
        />
      </PanelSection>

      <PanelSection label="Source Documents">
        <UploadZone
          label="Reference Documents"
          description="Reports, manuals, regulations, guidelines"
          files={sourceFiles}
          onFilesChange={onSourceFilesChange}
          accept=".pdf,.docx,.pptx,.xlsx,.doc,.ppt,.xls"
        />
      </PanelSection>
    </PanelShell>
  )
}

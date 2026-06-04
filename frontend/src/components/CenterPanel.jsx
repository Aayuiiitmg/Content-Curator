import { Crosshair } from 'lucide-react'
import ObjectiveCard from './ObjectiveCard'
import InstructionsCard from './InstructionsCard'
import GenerationSummary from './GenerationSummary'
import ImprovementBar from './ImprovementBar'
import { PanelShell, PanelSection } from './PanelLayout'

export default function CenterPanel({
  objective,
  onObjectiveChange,
  instructions,
  onInstructionsChange,
  generationSummary,
  isGenerating,
  onGenerate,
  improvementText,
  onImprovementTextChange,
  onImprovementSubmit,
  outputType,
  hasGenerated,
  isImproving,
  improvementFeedback,
}) {
  return (
    <PanelShell
      title="Objective & Generation"
      subtitle="Define goals and create deliverables"
      badge="Process"
      icon={Crosshair}
      className="w-1/4 min-w-[300px]"
    >
      <PanelSection label="Business Objective" number={1}>
        <ObjectiveCard value={objective} onChange={onObjectiveChange} />
      </PanelSection>

      <PanelSection label="Instructions" number={2}>
        <InstructionsCard
          value={instructions}
          onChange={onInstructionsChange}
          onGenerate={onGenerate}
          isGenerating={isGenerating}
          outputType={outputType}
        />
      </PanelSection>

      <PanelSection label="Generation Summary">
        <GenerationSummary items={generationSummary} isGenerating={isGenerating || isImproving} />
      </PanelSection>

      <PanelSection label="Improve Results">
        <ImprovementBar
          value={improvementText}
          onChange={onImprovementTextChange}
          onSubmit={onImprovementSubmit}
          hasGenerated={hasGenerated}
          isImproving={isImproving}
          lastFeedback={improvementFeedback}
        />
      </PanelSection>
    </PanelShell>
  )
}

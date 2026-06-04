import { useState, useCallback, useMemo } from 'react'
import AppHeader from './components/assistant/AppHeader'
import ChatInput from './components/assistant/ChatInput'
import AttachedFilesList from './components/assistant/AttachedFilesList'
import SuggestedActions from './components/assistant/SuggestedActions'
import AdvancedOptionsDrawer from './components/assistant/AdvancedOptionsDrawer'
import ChatThread from './components/assistant/ChatThread'
import RecentDocuments from './components/assistant/RecentDocuments'
import GeneratedAssetsList from './components/assistant/GeneratedAssetsList'
import PreviewModal from './components/assistant/PreviewModal'
import {
  SUGGESTED_ACTIONS,
  RECENT_DOCUMENTS,
  SAMPLE_TEMPLATE_FILES,
  GENERATED_ASSETS_BY_OUTPUT,
  SIMPLE_PROGRESS_STEPS,
  ASSISTANT_CHECKS,
  inferOutputTypeFromPrompt,
  COMPLIANCE_FRAMEWORKS,
} from './data/mockData'

function formatTimestamp() {
  return new Date().toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

function makeFileEntry(file) {
  return {
    id: `${file.name}-${Date.now()}-${Math.random()}`,
    name: file.name,
    size: file.size,
    type: file.name.split('.').pop()?.toLowerCase() || 'file',
  }
}

export default function App() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [advancedOpen, setAdvancedOpen] = useState(false)

  const [domain, setDomain] = useState('Steel Manufacturing')
  const [outputType, setOutputType] = useState('Training Program')
  const [complianceFrameworks, setComplianceFrameworks] = useState([
    COMPLIANCE_FRAMEWORKS[0],
    COMPLIANCE_FRAMEWORKS[1],
    COMPLIANCE_FRAMEWORKS[3],
  ])
  const [customInstructions, setCustomInstructions] = useState('')
  const [sourceFiles, setSourceFiles] = useState([])
  const [templateFiles, setTemplateFiles] = useState(
    SAMPLE_TEMPLATE_FILES.map((f, i) => ({ ...f, id: `template-${i}` }))
  )
  const [appliedImprovements, setAppliedImprovements] = useState([])
  const [previewAsset, setPreviewAsset] = useState(null)
  const [previewContext, setPreviewContext] = useState(null)

  const uploadedCount = sourceFiles.length
  const hasConversation = messages.length > 0

  const allGeneratedAssets = useMemo(() => {
    const assets = []
    messages.forEach((msg) => {
      if (msg.role === 'assistant' && msg.assets) {
        msg.assets.forEach((a) => assets.push({ ...a, messageId: msg.id }))
      }
    })
    return assets
  }, [messages])

  const handleFilesAdd = useCallback((fileList) => {
    const incoming = Array.from(fileList)
    if (!incoming.length) return
    const newFiles = incoming.map(makeFileEntry)
    setSourceFiles((prev) => {
      const existingNames = new Set(prev.map((f) => f.name))
      const unique = newFiles.filter((f) => !existingNames.has(f.name))
      return [...prev, ...unique]
    })
  }, [])

  const handleFileRemove = useCallback((id) => {
    setSourceFiles((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const handleTemplateAdd = useCallback((fileList) => {
    const newFiles = Array.from(fileList).map(makeFileEntry)
    setTemplateFiles((prev) => [...prev, ...newFiles])
  }, [])

  const handleComplianceToggle = useCallback((fw) => {
    setComplianceFrameworks((prev) =>
      prev.includes(fw) ? prev.filter((f) => f !== fw) : [...prev, fw]
    )
  }, [])

  const runGeneration = useCallback(
    (userPrompt, resolvedOutputType) => {
      const docCount = Math.max(sourceFiles.length + templateFiles.length, 1)
      const steps = SIMPLE_PROGRESS_STEPS[resolvedOutputType] || SIMPLE_PROGRESS_STEPS['Training Program']
      const assets = GENERATED_ASSETS_BY_OUTPUT[resolvedOutputType] || GENERATED_ASSETS_BY_OUTPUT['Training Program']
      const assistantId = `assistant-${Date.now()}`

      const checks = ASSISTANT_CHECKS.map((c) =>
        c.replace('documents analyzed', `${docCount} documents analyzed`)
      )

      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, role: 'user', content: userPrompt },
        {
          id: assistantId,
          role: 'assistant',
          status: 'generating',
          progressStep: steps[0],
          checks: null,
          assets: null,
          timestamp: '',
          outputType: resolvedOutputType,
        },
      ])

      setIsGenerating(true)

      steps.forEach((step, index) => {
        setTimeout(() => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, progressStep: step } : m
            )
          )
        }, index * 700)
      })

      const totalDuration = steps.length * 700 + 500

      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  status: 'complete',
                  progressStep: null,
                  checks,
                  assets,
                  timestamp: formatTimestamp(),
                }
              : m
          )
        )
        setIsGenerating(false)
      }, totalDuration)
    },
    [sourceFiles.length, templateFiles.length]
  )

  const handleSubmit = useCallback(() => {
    const text = prompt.trim()
    if (!text || isGenerating) return

    const resolvedType = advancedOpen
      ? outputType
      : inferOutputTypeFromPrompt(text, outputType)

    if (!advancedOpen) setOutputType(resolvedType)
    setPrompt('')
    runGeneration(text, resolvedType)
  }, [prompt, isGenerating, advancedOpen, outputType, runGeneration])

  const handleSuggestedAction = useCallback(
    (action) => {
      setPrompt(action.prompt)
      setOutputType(action.outputType)
      runGeneration(action.prompt, action.outputType)
    },
    [runGeneration]
  )

  const handleAssetClick = useCallback((asset, messageOutputType) => {
    setPreviewAsset(asset)
    setPreviewContext(messageOutputType || outputType)
  }, [outputType])

  const handleThreadAssetClick = useCallback(
    (asset) => {
      const msg = messages.find((m) => m.assets?.some((a) => a.id === asset.id))
      handleAssetClick(asset, msg?.outputType)
    },
    [messages, handleAssetClick]
  )

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <AppHeader />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-10 sm:py-14">
          {!hasConversation && (
            <div className="text-center mb-10 sm:mb-14">
              <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
                What would you like to create today?
              </h1>
              <p className="text-base text-slate-500 mt-3 max-w-lg mx-auto leading-relaxed">
                Upload your documents, describe what you need, and receive enterprise-ready
                deliverables in minutes.
              </p>
            </div>
          )}

          <ChatThread messages={messages} onAssetClick={handleThreadAssetClick} />

          {!hasConversation && (
            <div className="mb-8">
              <SuggestedActions
                actions={SUGGESTED_ACTIONS}
                onSelect={handleSuggestedAction}
                disabled={isGenerating}
              />
            </div>
          )}

          {hasConversation && allGeneratedAssets.length > 0 && (
            <div className="mb-10">
              <GeneratedAssetsList
                assets={allGeneratedAssets}
                onAssetClick={(asset) => {
                  const msg = messages.find((m) => m.id === asset.messageId)
                  handleAssetClick(asset, msg?.outputType)
                }}
              />
            </div>
          )}

          {!hasConversation && (
            <div className="mb-10">
              <RecentDocuments documents={RECENT_DOCUMENTS} />
            </div>
          )}
        </div>
      </main>

      <footer className="flex-shrink-0 border-t border-slate-100 bg-white/80 backdrop-blur-sm px-6 py-5">
        <AttachedFilesList files={sourceFiles} onRemove={handleFileRemove} />
        <ChatInput
          value={prompt}
          onChange={setPrompt}
          onSubmit={handleSubmit}
          onFilesAdd={handleFilesAdd}
          uploadedCount={uploadedCount}
          isGenerating={isGenerating}
          placeholder="Create a Blast Furnace Safety Training Program for new employees using the uploaded SOPs and incident reports."
        />
        <div className="mt-4">
          <AdvancedOptionsDrawer
            isOpen={advancedOpen}
            onToggle={() => setAdvancedOpen((o) => !o)}
            domain={domain}
            onDomainChange={setDomain}
            outputType={outputType}
            onOutputTypeChange={setOutputType}
            complianceFrameworks={complianceFrameworks}
            onComplianceToggle={handleComplianceToggle}
            customInstructions={customInstructions}
            onCustomInstructionsChange={setCustomInstructions}
            templateFiles={templateFiles}
            onTemplateFilesAdd={handleTemplateAdd}
            onTemplateRemove={(id) => setTemplateFiles((p) => p.filter((f) => f.id !== id))}
          />
        </div>
      </footer>

      <PreviewModal
        asset={previewAsset}
        outputType={previewContext || outputType}
        appliedImprovements={appliedImprovements}
        onClose={() => {
          setPreviewAsset(null)
          setPreviewContext(null)
        }}
      />
    </div>
  )
}

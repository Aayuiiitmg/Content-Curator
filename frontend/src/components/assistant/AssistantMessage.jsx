import { Check, Loader2 } from 'lucide-react'
import AssetCard from './AssetCard'

export default function AssistantMessage({ message, onAssetClick }) {
  const isGenerating = message.status === 'generating'

  return (
    <div className="flex gap-4 max-w-3xl">
      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-white text-[10px] font-bold">CC</span>
      </div>
      <div className="flex-1 min-w-0 space-y-4">
        {isGenerating && message.progressStep && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Loader2 className="w-4 h-4 text-indigo-500 animate-spin flex-shrink-0" />
            <span className="animate-pulse-soft">{message.progressStep}</span>
          </div>
        )}

        {message.checks && message.checks.length > 0 && (
          <ul className="space-y-1.5">
            {message.checks.map((check) => (
              <li key={check} className="flex items-center gap-2 text-sm text-slate-700">
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" strokeWidth={2.5} />
                {check}
              </li>
            ))}
          </ul>
        )}

        {message.assets && message.assets.length > 0 && (
          <div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
              Generated Assets
            </p>
            <div className="flex flex-wrap gap-2">
              {message.assets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} onClick={onAssetClick} />
              ))}
            </div>
          </div>
        )}

        {message.status === 'complete' && (
          <p className="text-xs text-slate-400">{message.timestamp}</p>
        )}
      </div>
    </div>
  )
}

import { Layers } from 'lucide-react'
import AssetCard from './AssetCard'

export default function GeneratedAssetsList({ assets, onAssetClick }) {
  if (!assets.length) return null

  return (
    <section className="w-full max-w-3xl mx-auto">
      <h3 className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-1.5">
        <Layers className="w-3.5 h-3.5" />
        Generated Assets
      </h3>
      <div className="flex flex-wrap gap-2">
        {assets.map((asset) => (
          <AssetCard key={`${asset.messageId}-${asset.id}`} asset={asset} onClick={() => onAssetClick(asset)} />
        ))}
      </div>
    </section>
  )
}

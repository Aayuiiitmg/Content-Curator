import { useMemo, useState } from 'react'
import { Play, Pause, Volume2, Maximize, Subtitles } from 'lucide-react'
import { getAppliedDeltas, getVideoMeta } from '../utils/improvements'
import EmptyPreview from './EmptyPreview'

export default function VideoPreview({ hasGenerated, outputType, appliedImprovements = [], isImproving }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const { titleSuffix, captionExtra } = useMemo(() => {
    const deltas = getAppliedDeltas(appliedImprovements)
    return getVideoMeta(deltas)
  }, [appliedImprovements])

  if (!hasGenerated) {
    return <EmptyPreview outputType={outputType} label="video script" />
  }

  const baseCaption = 'Hot metal handling procedures and emergency evacuation protocols'
  const caption = captionExtra ? `${baseCaption} · ${captionExtra}` : baseCaption

  return (
    <div className={`flex-1 flex items-center justify-center p-6 transition-opacity ${isImproving ? 'opacity-60' : 'opacity-100'}`}>
      <div className="w-full max-w-2xl">
        <div className="bg-slate-900 rounded-lg overflow-hidden shadow-lg">
          <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-600 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-indigo-400 rounded-full blur-3xl" />
            </div>
            <div className="relative text-center z-10">
              <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Tata Steel Training</p>
              <h2 className="text-lg font-semibold text-white px-8">
                Blast Furnace Safety Awareness Program{titleSuffix}
              </h2>
              <p className="text-white/50 text-sm mt-2">Jamshedpur Plant · Q3 2026</p>
            </div>
            {!isPlaying && (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
              >
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Play className="w-7 h-7 text-indigo-600 ml-1" />
                </div>
              </button>
            )}
          </div>

          <div className="bg-slate-950 px-4 py-3">
            <div className="flex items-center gap-3 mb-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-white hover:text-indigo-400 transition-colors"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <div className="flex-1">
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden cursor-pointer">
                  <div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: '35%' }} />
                </div>
              </div>
              <span className="text-xs text-slate-400 whitespace-nowrap">4:32 / 12:45</span>
              <button type="button" className="text-slate-400 hover:text-white transition-colors">
                <Subtitles className="w-4 h-4" />
              </button>
              <button type="button" className="text-slate-400 hover:text-white transition-colors">
                <Volume2 className="w-4 h-4" />
              </button>
              <button type="button" className="text-slate-400 hover:text-white transition-colors">
                <Maximize className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500">CC: {caption}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { getAppliedDeltas, getPodcastMeta } from '../utils/improvements'
import EmptyPreview from './EmptyPreview'

export default function PodcastPreview({ hasGenerated, outputType, appliedImprovements = [], isImproving }) {
  const [isPlaying, setIsPlaying] = useState(false)

  const { titleSuffix, narratorNote } = useMemo(() => {
    const deltas = getAppliedDeltas(appliedImprovements)
    return getPodcastMeta(deltas)
  }, [appliedImprovements])

  const waveformBars = Array.from({ length: 60 }, (_, i) => {
    const height = 20 + Math.sin(i * 0.5) * 15 + Math.cos(i * 0.3) * 10
    return Math.max(8, Math.min(48, height))
  })

  if (!hasGenerated) {
    return <EmptyPreview outputType={outputType} label="podcast script" />
  }

  return (
    <div className={`flex-1 flex items-center justify-center p-6 transition-opacity ${isImproving ? 'opacity-60' : 'opacity-100'}`}>
      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-lg shadow-sm p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg font-bold">TS</span>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Executive Audio Briefing</p>
            <h2 className="text-lg font-semibold text-slate-900 mt-0.5">
              Weekly Plant Safety Briefing{titleSuffix}
            </h2>
            <p className="text-sm text-slate-600 mt-1">Episode 24 · Blast Furnace Operations Update</p>
            <p className="text-xs text-slate-500 mt-2">
              Narrator: Rajesh Kumar, Chief Safety Officer
              {narratorNote && <span className="block text-indigo-600 mt-1">{narratorNote}</span>}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-center gap-0.5 h-12 mb-6 px-2">
          {waveformBars.map((height, i) => (
            <div
              key={i}
              className={`w-1 rounded-full transition-colors ${
                i < 24 ? 'bg-indigo-600' : 'bg-slate-200'
              } ${isPlaying ? 'animate-pulse' : ''}`}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 px-1">
          <span>8:14</span>
          <span>18:42</span>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <button type="button" className="text-slate-400 hover:text-slate-600 transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          <Volume2 className="w-4 h-4 text-slate-400" />
          <div className="w-24 h-1 bg-slate-200 rounded-full">
            <div className="w-3/4 h-full bg-slate-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PRESENTATION_SLIDES } from '../data/mockData'
import { getAppliedDeltas, mergePresentationSlides } from '../utils/improvements'
import EmptyPreview from './EmptyPreview'

export default function PresentationPreview({ hasGenerated, outputType, appliedImprovements = [], isImproving }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = useMemo(() => {
    const deltas = getAppliedDeltas(appliedImprovements)
    return mergePresentationSlides(PRESENTATION_SLIDES, deltas)
  }, [appliedImprovements])

  const slide = slides[currentSlide]

  if (!hasGenerated) {
    return <EmptyPreview outputType={outputType} label="presentation" />
  }

  return (
    <div className={`flex-1 flex gap-4 p-5 min-h-0 transition-opacity duration-300 ${isImproving ? 'opacity-50' : 'opacity-100'}`}>
      <div className="w-32 flex-shrink-0 space-y-2 overflow-y-auto">
        {slides.map((s, index) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`w-full aspect-[4/3] rounded border-2 overflow-hidden transition-colors ${
              index === currentSlide
                ? 'border-indigo-600 ring-2 ring-indigo-100'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="w-full h-full bg-white p-2 flex flex-col justify-center">
              <p className="text-[8px] font-semibold text-slate-900 truncate">{s.title}</p>
              <span className="text-[7px] text-slate-400 mt-0.5">{index + 1}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 bg-white border border-slate-200/80 rounded-xl shadow-sm flex flex-col overflow-hidden">
          <div className="h-9 bg-indigo-600 flex items-center justify-between px-4">
            <span className="text-[11px] text-white/80 font-medium">Tata Steel — Confidential</span>
            {appliedImprovements.length > 0 && (
              <span className="text-[10px] text-white/60 bg-white/10 px-2 py-0.5 rounded">v{appliedImprovements.length + 1}</span>
            )}
          </div>
          <div className="flex-1 p-8 flex flex-col justify-center">
            {slide.type === 'title' ? (
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-600 rounded mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">TS</span>
                </div>
                <h1 className="text-2xl font-semibold text-slate-900 mb-2">{slide.title}</h1>
                <p className="text-sm text-slate-600">{slide.subtitle}</p>
                {slide.titleNote && (
                  <p className="text-xs text-indigo-600 mt-3 px-4 py-2 bg-indigo-50 rounded-md inline-block">
                    {slide.titleNote}
                  </p>
                )}
                <p className="text-xs text-slate-400 mt-6">Jamshedpur Plant · Q3 2026</p>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-indigo-600 mb-6 pb-2 border-b border-slate-200">
                  {slide.title}
                </h2>
                <ul className="space-y-3">
                  {slide.bullets?.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="h-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between px-4">
            <span className="text-[10px] text-slate-400">Slide {currentSlide + 1} of {slides.length}</span>
            <span className="text-[10px] text-slate-400">
              Blast Furnace Safety Excellence Program
              {appliedImprovements.length > 0 && ` · v${appliedImprovements.length + 1}`}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-3">
          <button
            type="button"
            onClick={() => setCurrentSlide((p) => Math.max(0, p - 1))}
            disabled={currentSlide === 0}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-md disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-xs text-slate-500">
            {currentSlide + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={() => setCurrentSlide((p) => Math.min(slides.length - 1, p + 1))}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 rounded-md disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

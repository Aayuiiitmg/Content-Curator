export default function AppHeader() {
  return (
    <header className="flex-shrink-0 h-14 px-6 flex items-center border-b border-slate-100">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">TS</span>
        </div>
        <span className="text-sm font-semibold text-slate-900">Content Curator</span>
        <span className="text-xs text-slate-400 hidden sm:inline">Tata Steel</span>
      </div>
    </header>
  )
}

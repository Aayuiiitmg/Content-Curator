export default function SuggestedActions({ actions, onSelect, disabled }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(action)}
          className="px-4 py-2 text-sm text-slate-600 bg-slate-50 hover:bg-slate-100 hover:text-slate-900 rounded-full border border-slate-200/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}

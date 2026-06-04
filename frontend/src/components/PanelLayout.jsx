export function PanelHeader({ title, subtitle, badge, icon: Icon }) {
  return (
    <div className="flex-shrink-0 px-5 py-4 border-b border-slate-200/80 bg-white">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-slate-600" strokeWidth={1.75} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-semibold text-slate-900 tracking-tight truncate">{title}</h2>
            {badge && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100/80 px-2 py-0.5 rounded-md flex-shrink-0">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5 truncate">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

export function PanelBody({ children }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#f8fafc]">
      {children}
    </div>
  )
}

export function PanelSection({ label, children, number }) {
  return (
    <section className="animate-fade-up">
      <div className="flex items-center gap-2 mb-2">
        {number != null && (
          <span className="w-5 h-5 rounded-md bg-white border border-slate-200 text-[10px] font-bold text-slate-500 flex items-center justify-center flex-shrink-0">
            {number}
          </span>
        )}
        <h3 className="text-[11px] uppercase tracking-[0.08em] text-slate-500 font-semibold">
          {label}
        </h3>
      </div>
      {children}
    </section>
  )
}

export function PanelShell({ title, subtitle, badge, icon, children, className = '' }) {
  return (
    <div className={`flex flex-col h-full min-h-0 border-r border-slate-200/80 bg-white ${className}`}>
      <PanelHeader title={title} subtitle={subtitle} badge={badge} icon={icon} />
      <PanelBody>{children}</PanelBody>
    </div>
  )
}

export function Card({ children, className = '', hover = false }) {
  return (
    <div
      className={`bg-white border border-slate-200/80 rounded-xl overflow-hidden ${
        hover ? 'hover:border-slate-300 transition-colors duration-150' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

export function CardLabel({ children }) {
  return (
    <label className="block text-sm font-medium text-slate-800 mb-2">{children}</label>
  )
}

export function CardFooter({ children }) {
  return (
    <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 text-xs text-slate-500">
      {children}
    </div>
  )
}

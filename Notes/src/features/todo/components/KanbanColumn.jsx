// Reusable Kanban column shell
export function KanbanColumn({ title, colorDot, count, children }) {
  return (
    <section
      className="flex flex-col min-w-[300px] md:min-w-[350px]
 bg-neutral-900/30 backdrop-blur-md rounded-xl border border-white/5 shadow-lg h-full transition-colors hover:border-white/10 overflow-hidden"
    >
      <div className="p-5 border-b border-white/5 bg-neutral-800/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`w-2.5 h-2.5 rounded-full ${colorDot} shadow-[0_0_8px_rgba(255,255,255,0.2)]`}
            ></span>
            <h3 className="text-sm font-medium text-neutral-200 tracking-wide">
              {title}
            </h3>
          </div>
          <span className="bg-white/5 text-neutral-400 text-[11px] font-medium px-2.5 py-1 rounded-md border border-white/5">
            {count}
          </span>
        </div>
      </div>
      <div className="flex-1 p-4 custom-scrollbar space-y-3">{children}</div>
    </section>
  );
}

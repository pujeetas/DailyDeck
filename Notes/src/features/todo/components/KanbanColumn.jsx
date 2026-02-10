const mono = { fontFamily: "'JetBrains Mono', monospace" };

export function KanbanColumn({ title, colorDot, count, children }) {
  return (
    <section className="flex flex-col min-w-[300px] md:min-w-[340px] bg-[#0c0c0a] border border-zinc-800/60 hover:border-zinc-700/60 transition-colors h-full overflow-hidden">
      {/* Column header */}
      <div className="px-4 py-3 border-b border-zinc-800/50 bg-[#0e0e0c]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className={`w-2 h-2 rounded-full ${colorDot}`} />
            <h3
              className="text-[12px] font-medium text-zinc-300 tracking-wide uppercase"
              style={mono}
            >
              {title}
            </h3>
          </div>
          <span
            className="text-[10px] text-zinc-600 px-2 py-0.5 border border-zinc-800/60 bg-[#0a0a08]"
            style={mono}
          >
            {count}
          </span>
        </div>
      </div>

      {/* Cards area */}
      <div className="flex-1 p-3 custom-scrollbar space-y-2">{children}</div>
    </section>
  );
}

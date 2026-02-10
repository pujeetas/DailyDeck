const mono = { fontFamily: "'JetBrains Mono', monospace" };

const FilterBar = ({ setActiveFilter, activeFilter }) => {
  const filters = ["All", "Today", "High Priority", "Overdue"];

  return (
    <div className="flex items-center gap-1 px-1 py-1 bg-[#0c0c0a] border border-zinc-800/60">
      {filters.map((f) => (
        <button
          onClick={() => setActiveFilter(f)}
          key={f}
          className={`cursor-pointer px-3 py-1.5 text-[13px] tracking-wide transition-all whitespace-nowrap ${
            activeFilter === f
              ? "bg-zinc-800 text-zinc-100"
              : "text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/40"
          }`}
          style={mono}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;

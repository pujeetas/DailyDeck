const FilterBar = () => {
  const filters = ["All", "Today", "Priority", "Overdue"];

  return (
    <div
      className="flex items-center gap-3 px-4 py-2
  bg-neutral-900/40 backdrop-blur-md
  border border-white/5
  rounded-full"
    >
      {filters.map((f, i) => (
        <button
          key={f}
          className={`px-3 py-1.5 rounded-full border transition-all whitespace-nowrap
              ${
                i === 0
                  ? "bg-zinc-100 text-zinc-900 border-zinc-100"
                  : "bg-transparent text-zinc-400 border-transparent hover:border-zinc-700 hover:bg-zinc-900/60 hover:text-zinc-100"
              }
            `}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;

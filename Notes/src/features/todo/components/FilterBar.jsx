import dayjs from "dayjs";
import useTodoStore from "../store/useTodoStore";
import { isActive } from "@tiptap/core";

const FilterBar = ({ setActiveFilter, activeFilter }) => {
  const filters = ["All", "Today", "High Priority", "Overdue"];

  const handleFilter = (f) => {
    setActiveFilter(f);
  };

  return (
    <div
      className="flex items-center gap-3 px-4 py-2
  bg-neutral-900/40 backdrop-blur-md
  border border-white/5
  rounded-full"
    >
      {filters.map((f, i) => (
        <button
          onClick={() => handleFilter(f)}
          key={f}
          className={`px-3 py-1.5 rounded-full border transition-all whitespace-nowrap
              ${
                activeFilter === f
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

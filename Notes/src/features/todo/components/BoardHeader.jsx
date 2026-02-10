import { PlusOutlined } from "@ant-design/icons";
import { LayoutGrid, CalendarDays } from "lucide-react";
import FilterBar from "./FilterBar";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

const BoardHeader = ({
  onCreateTask,
  view,
  setView,
  activeFilter,
  setActiveFilter,
}) => {
  return (
    <header className="flex items-center justify-between flex-wrap md:flex-nowrap gap-4 px-6 md:px-10 py-4 border-b border-zinc-800/50 bg-[#0a0a08]/90 backdrop-blur-md sticky top-0 z-20">
      {/* Title */}
      <div className="shrink-0">
        <h1 className="text-[15px] font-medium text-zinc-200" style={mono}>
          Task Board
        </h1>
        <p className="text-[11px] text-zinc-600 mt-0.5" style={mono}>
          Kanban for your work-in-progress
        </p>
      </div>

      {/* Filters */}
      {view === "board" && (
        <FilterBar
          setActiveFilter={setActiveFilter}
          activeFilter={activeFilter}
        />
      )}

      {/* Right Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {/* View toggle */}
        <div className="flex items-center border border-zinc-800/60 bg-[#0c0c0a] text-[12px] overflow-hidden">
          <button
            onClick={() => setView("board")}
            className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
              view === "board"
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-600 hover:text-zinc-300"
            }`}
            style={mono}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            Board
          </button>
          <button
            onClick={() => setView("calendar")}
            className={`px-3 py-1.5 flex items-center gap-1.5 transition-colors ${
              view === "calendar"
                ? "bg-zinc-800 text-zinc-100"
                : "text-zinc-600 hover:text-zinc-300"
            }`}
            style={mono}
          >
            <CalendarDays className="h-3.5 w-3.5" />
            Calendar
          </button>
        </div>

        {/* Create button */}
        <button
          onClick={onCreateTask}
          className="shrink-0 flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#0a0a08] px-4 py-1.5 text-[12px] font-bold tracking-wide transition-colors active:scale-[0.98]"
          style={mono}
        >
          <PlusOutlined />
          NEW TASK
        </button>
      </div>
    </header>
  );
};

export default BoardHeader;

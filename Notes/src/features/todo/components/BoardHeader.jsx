import { PlusOutlined } from "@ant-design/icons";
import { LayoutGrid, CalendarDays } from "lucide-react";
import FilterBar from "./FilterBar";

const BoardHeader = ({
  onCreateTask,
  view,
  setView,
  activeFilter,
  setActiveFilter,
}) => {
  return (
    <header className="flex items-center justify-between flex-wrap md:flex-nowrap gap-4 px-6 py-4 backdrop-blur-sm sticky top-0 z-20">
      {/* Title */}
      <div className="shrink-0">
        <h1 className="text-lg font-semibold text-zinc-100 tracking-tight">
          Task Board
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Developer-centric Kanban for your work-in-progress.
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
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        {/* VIEW TOGGLE */}
        <div
          className="
            flex items-center rounded-lg border border-white/10 
            bg-neutral-900/60 backdrop-blur-sm
            text-sm overflow-hidden
          "
        >
          <button
            onClick={() => setView("board")}
            className={`
              px-3 py-1.5 flex items-center gap-1.5 transition
              ${
                view === "board"
                  ? "bg-neutral-800 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }
            `}
          >
            <LayoutGrid className="h-4 w-4" />
            Board
          </button>

          <button
            onClick={() => setView("calendar")}
            className={`
              px-3 py-1.5 flex items-center gap-1.5 transition
              ${
                view === "calendar"
                  ? "bg-neutral-800 text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-300"
              }
            `}
          >
            <CalendarDays className="h-4 w-4" />
            Calendar
          </button>
        </div>

        {/* Create Button */}
        <button
          onClick={onCreateTask}
          className="shrink-0 flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-md shadow-indigo-500/30 active:scale-95"
        >
          <PlusOutlined />
          New Task
        </button>
      </div>
    </header>
  );
};

export default BoardHeader;

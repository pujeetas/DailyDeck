import { PlusOutlined } from "@ant-design/icons";
import FilterBar from "./FilterBar";

const BoardHeader = ({ onCreateTask }) => {
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
      <FilterBar />

      {/* Right Actions */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
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

import { PlusOutlined } from "@ant-design/icons";

const Header = ({ onCreateTask }) => {
  return (
    <header
      className="
        flex items-center justify-between 
        flex-wrap md:flex-nowrap 
        gap-4 p-4 border-b border-zinc-800
      "
    >
      {/* Title Block */}
      <div className="shrink-0">
        <h1 className="text-lg font-semibold text-zinc-100">Tasks</h1>
        <p className="text-[11px] text-zinc-500 mt-0.5">
          Developer workflow board
        </p>
      </div>

      {/* Filters */}
      <div
        className="
        flex items-center gap-1.5 
        flex-wrap 
        max-w-[500px] 
        md:max-w-none
        "
      >
        {["All", "Today", "Priority", "Overdue"].map((f) => (
          <button
            key={f}
            className="
              text-xs px-3 py-1 rounded-md 
              bg-zinc-900 
              border border-zinc-800 
              hover:border-zinc-700 hover:bg-zinc-800
            "
          >
            {f}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div
        className="
        flex items-center gap-2 
        w-full sm:w-auto 
        justify-end sm:justify-normal
        "
      >
        {/* Search */}
        <div
          className="
          flex 
          min-w-[180px] max-w-[220px] 
          grow md:grow-0 
          items-center 
          bg-zinc-900 px-3 py-2 
          rounded-md border border-zinc-800
        "
        >
          <input
            className="w-full bg-transparent outline-none text-sm text-zinc-300 placeholder-zinc-500"
            placeholder="Search tasks..."
          />
        </div>

        {/* Button */}
        <button
          onClick={onCreateTask}
          className="shrink-0inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 transition border border-zinc-700 text-zinc-200 px-4 py-2 
            rounded-md text-sm cursor-pointer "
        >
          <PlusOutlined />
          New Task
        </button>
      </div>
    </header>
  );
};

export default Header;

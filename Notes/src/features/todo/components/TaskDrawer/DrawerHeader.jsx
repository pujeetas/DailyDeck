const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

const DrawerHeader = ({ isEdit, onClose }) => {
  return (
    <div className="px-6 pt-6 pb-4 border-b border-zinc-800/50 flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-6 h-[1px] bg-amber-600/50" />
          <span
            className="text-[10px] text-amber-600/80 tracking-[0.25em] uppercase"
            style={mono}
          >
            {isEdit ? "Edit" : "New Task"}
          </span>
        </div>
        <h2
          className="text-[16px] font-semibold text-zinc-200 tracking-[-0.01em]"
          style={mono}
        >
          {isEdit ? "Edit Task" : "Create Task"}
        </h2>
        <p className="text-[12px] text-zinc-600 mt-1" style={serif}>
          {isEdit
            ? "Update task details and metadata."
            : "Add a new item to your board."}
        </p>
      </div>
      <button
        className="w-7 h-7 flex items-center justify-center text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800/50 transition-all"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
};

export default DrawerHeader;

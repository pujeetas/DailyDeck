const DrawerHeader = ({ isEdit, onClose }) => {
  return (
    <div className="px-6 pt-6 pb-4 border-b border-white/10 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">
          {isEdit ? "Edit Task" : "New Task"}
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          {isEdit
            ? "Update task details and metadata."
            : "Create a new item for your board."}
        </p>
      </div>
      <button
        className="p-2 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-zinc-200 transition"
        onClick={onClose}
      >
        ✕
      </button>
    </div>
  );
};

export default DrawerHeader;

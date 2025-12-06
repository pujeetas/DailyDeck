export default function TaskCard({ task, onEdit, onDelete, onToggleFocus }) {
  const priorityStyles =
    {
      high: "bg-red-500/10 text-red-400 border-red-500/30",
      medium: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      low: "bg-sky-500/10 text-sky-300 border-sky-500/30",
    }[task.priority] || "bg-zinc-800/60 text-zinc-300 border-zinc-700";

  return (
    <div
      onClick={onEdit}
      className="group relative flex flex-col gap-2 p-3.5 mb-3 bg-neutral-800/40 hover:bg-neutral-700/40 
  border border-white/10 shadow-[0_1px_4px_rgba(0,0,0,0.25)] hover:border-white/20 rounded-xl transition-colors duration-150 cursor-pointer"
    >
      {/* Top Row: Priority + Actions */}
      <div className="flex items-start justify-between gap-3">
        <span
          className={`text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md border ${priorityStyles}`}
        >
          {task.priority ? task.priority : "No Priority"}
        </span>

        {/* Hover Actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
          {/* Focus button */}
          {onToggleFocus && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFocus(task.id);
              }}
              className={`p-1.5 rounded-md transition ${
                task.isFocus
                  ? "text-yellow-300 hover:text-yellow-200"
                  : "text-zinc-400 hover:text-zinc-100"
              }`}
              title={task.isFocus ? "Remove from Focus" : "Add to Focus"}
            >
              {task.isFocus ? "★" : "☆"}
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition"
            title="Edit"
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="p-1.5 rounded-md hover:bg-red-500/10 text-zinc-500 hover:text-red-400 transition"
            title="Delete"
          >
            <svg
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-sm font-medium text-neutral-100 leading-snug line-clamp-2">
        {task.title || "Untitled task"}
      </h4>

      {/* Optional description preview (1 line) */}
      {task.description && (
        <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
          {task.description}
        </p>
      )}

      {/* Footer Info */}
      <div className="flex items-center justify-between pt-2 mt-1 border-t border-white/5">
        <div className="flex items-center gap-2">
          {task.issueId && (
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900/80 px-1.5 py-0.5 rounded">
              {task.issueId}
            </span>
          )}
          {task.subTask?.length > 0 && (
            <span className="text-[10px] text-zinc-500">
              {task.subTask.filter((s) => s.complete).length}/
              {task.subTask.length} subtasks
            </span>
          )}
        </div>

        {/* Tech Stack tags */}
        {task.tech && task.tech.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-end max-w-[55%]">
            {task.tech.slice(0, 3).map((t, i) => (
              <span
                key={i}
                className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-800/80 text-zinc-300"
              >
                {t}
              </span>
            ))}
            {task.tech.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-900 text-zinc-500">
                +{task.tech.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Blocked Indicator */}
      {task.blocked && (
        <div className="absolute -right-1 -top-1">
          <span className="flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
        </div>
      )}
    </div>
  );
}

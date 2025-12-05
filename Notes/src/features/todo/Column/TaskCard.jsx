export default function TaskCard({ task, onEdit, onDelete }) {
  const priorityColor =
    {
      high: "bg-red-500",
      medium: "bg-yellow-500",
      low: "bg-green-500",
    }[task.priority] || "bg-gray-400";

  return (
    <div
      className="group rounded-md border border-zinc-800 bg-zinc-900 p-3 
                 hover:border-zinc-700 hover:bg-zinc-850 transition-colors cursor-pointer"
      onClick={onEdit}
    >
      {/* Top Row */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {/* Priority Dot */}
          <span className={`h-2.5 w-2.5 rounded-full ${priorityColor}`}></span>

          {/* Title */}
          <h4 className="text-sm font-medium text-zinc-200">{task.title}</h4>
        </div>

        {/* Hover Actions */}
        <div className="opacity-0 group-hover:opacity-100 transition flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="text-zinc-500 hover:text-zinc-300"
          >
            Edit
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-red-500 hover:text-red-400"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Tech Tags */}
      {task.tech && task.tech.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {task.tech.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-md border border-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Issue ID */}
      {task.issueId && (
        <p className="text-[11px] text-zinc-500 mt-2">{task.issueId}</p>
      )}

      {/* Blocker */}
      {task.blocked && (
        <span className="mt-2 inline-block text-[10px] px-2 py-0.5 bg-red-900/40 text-red-400 rounded-md border border-red-800">
          Blocked
        </span>
      )}
    </div>
  );
}

import useTodoStore from "../store/useTodoStore";
import { message } from "antd";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

export default function FocusCard({ task }) {
  const subtasks = task.subTask || [];
  const completed = subtasks.filter((s) => s.complete).length;
  const tech = task.tech || [];

  const statusLabel =
    {
      backlog: "Backlog",
      progress: "In Progress",
      review: "Review",
      done: "Done",
    }[task.status] || "Unknown";

  const { toggleFocus, markDone, detailsList } = useTodoStore();

  const handleToggleFocus = (id, focused) => {
    toggleFocus(id, focused);
    const isNowFocused = !detailsList.find((t) => t._id === id)?.focused;
    isNowFocused
      ? message.success("Added to Focus List")
      : message.info("Removed from Focus List");
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-[#0c0c0a] border border-zinc-800/60 px-4 py-3 hover:border-zinc-700/60 transition-colors">
      {/* Left: meta + title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="text-[10px] px-2 py-0.5 bg-[#0e0e0c] text-zinc-400 border border-zinc-800/60"
            style={mono}
          >
            {statusLabel}
          </span>
          <span
            className={`text-[12px] px-2 py-0.5 border ${
              task.priority === "high"
                ? "bg-red-500/10 text-red-400 border-red-500/30"
                : task.priority === "medium"
                  ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                  : task.priority === "low"
                    ? "bg-sky-500/10 text-sky-300 border-sky-500/30"
                    : "bg-zinc-800/60 text-zinc-500 border-zinc-700"
            }`}
            style={mono}
          >
            {task.priority ? task.priority.toUpperCase() : "—"}
          </span>
          {task.issueId && (
            <span
              className="text-[12px] text-zinc-600 bg-[#0a0a08] px-1.5 py-0.5 border border-zinc-800/60"
              style={mono}
            >
              {task.issueId}
            </span>
          )}
        </div>

        <h3
          className="text-[15px] font-medium text-zinc-200 truncate"
          style={mono}
        >
          {task.title || "Untitled task"}
        </h3>

        {task.description && (
          <p
            className="text-[11px] text-zinc-600 line-clamp-1 mt-0.5"
            style={serif}
          >
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-3 mt-1.5">
          {subtasks.length > 0 && (
            <span className="text-[10px] text-zinc-700" style={mono}>
              {completed}/{subtasks.length} subtasks
            </span>
          )}
          {tech.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tech.slice(0, 2).map((t, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 bg-zinc-800/60 text-zinc-500 text-[12px] border border-zinc-800/40"
                  style={mono}
                >
                  {t}
                </span>
              ))}
              {tech.length > 2 && (
                <span
                  className="px-1.5 py-0.5 text-zinc-700 text-[10px]"
                  style={mono}
                >
                  +{tech.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <button
          onClick={() => handleToggleFocus(task._id, task.focused)}
          className="text-[13px] px-3 py-1.5 border border-zinc-800/60 bg-[#0e0e0c] hover:border-zinc-700 text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1.5"
          style={mono}
        >
          <span>★</span>
          Unfocus
        </button>
        <button
          onClick={() => markDone(task._id, task.status, task.focused)}
          className="text-[11px] px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-[#0a0a08] font-bold tracking-wide transition-colors"
          style={mono}
        >
          DONE
        </button>
      </div>
    </div>
  );
}

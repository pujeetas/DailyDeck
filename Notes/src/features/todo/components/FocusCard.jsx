import useTodoStore from "../store/useTodoStore";
import { message } from "antd";

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

    if (isNowFocused) {
      message.success("Added to Focus List");
    } else {
      message.info("Removed from Focus List");
    }
  };

  const handleMarkDone = (id, status, focused) => {
    markDone(task._id, task.status, task.focused);

    const isNowFocused = !detailsList.find((t) => t._id === id)?.focused;

    if (isNowFocused) {
      message.success("Added to Focus List and Marked Done");
    } else {
      message.info("Removed from Focus List");
    }
  };

  return (
    <div
      className="
        flex items-center justify-between gap-4
        rounded-xl bg-neutral-900/50 border border-white/5
        px-4 py-3
        hover:bg-neutral-800/60 hover:border-white/10
        transition
      "
    >
      {/* Left side: meta + title */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {/* Status pill */}
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-800 text-zinc-300 border border-white/5">
            {statusLabel}
          </span>

          {/* Priority pill */}
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full border ${
              task.priority === "high"
                ? "bg-red-500/10 text-red-400 border-red-500/40"
                : task.priority === "medium"
                ? "bg-amber-500/10 text-amber-300 border-amber-500/40"
                : task.priority === "low"
                ? "bg-sky-500/10 text-sky-300 border-sky-500/40"
                : "bg-neutral-800 text-zinc-300 border-zinc-700"
            }`}
          >
            {task.priority ? task.priority.toUpperCase() : "NO PRIORITY"}
          </span>

          {task.issueId && (
            <span className="text-[10px] font-mono text-zinc-500 bg-neutral-950/80 px-1.5 py-0.5 rounded">
              {task.issueId}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-neutral-100 truncate">
          {task.title || "Untitled task"}
        </h3>

        {/* Optional description */}
        {task.description && (
          <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
            {task.description}
          </p>
        )}

        {/* Subtasks + tech */}
        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-zinc-500">
          {subtasks.length > 0 && (
            <span>
              {completed}/{subtasks.length} subtasks
            </span>
          )}
          {tech.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tech.slice(0, 2).map((t, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 rounded-md bg-neutral-800 text-zinc-300 text-[10px]"
                >
                  {t}
                </span>
              ))}
              {tech.length > 2 && (
                <span className="px-1.5 py-0.5 rounded-md bg-neutral-900 text-zinc-500 text-[10px]">
                  +{tech.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right side: actions */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <button
          onClick={() => handleToggleFocus(task._id, task.focused)}
          className="text-xs px-2 py-1 rounded-lg border border-white/10 bg-neutral-800 hover:bg-neutral-700 text-zinc-200 transition flex items-center gap-1"
        >
          <span>★</span>
          <span>Unfocus</span>
        </button>

        <button
          onClick={() => markDone(task._id, task.status, task.focused)}
          className="text-xs px-2 py-1 rounded-lg bg-emerald-500/90 hover:bg-emerald-400 text-black font-medium transition"
        >
          Mark Done
        </button>
      </div>
    </div>
  );
}

import { GithubOutlined } from "@ant-design/icons";
import useTodoStore from "../store/useTodoStore";
import { message } from "antd";
import { formatDate } from "@/features/utils/formatDate";

const mono = { fontFamily: "'JetBrains Mono', monospace" };

export default function TaskCard({
  task,
  setTaskForm,
  setIsEditModalOpen,
  dragHandleProps,
}) {
  const priorityStyles =
    {
      high: "bg-red-500/10 text-red-400 border-red-500/30",
      medium: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      low: "bg-sky-500/10 text-sky-300 border-sky-500/30",
    }[task.priority] || "bg-zinc-800/60 text-zinc-500 border-zinc-700";

  const { deleteTodo, toggleFocus, detailsList } = useTodoStore();

  const handleEditClick = (id) => {
    const taskToEdit = detailsList.find((task) => task._id === id);
    if (taskToEdit) {
      setTaskForm({ ...taskToEdit, subTask: taskToEdit.subTask || [] });
      setIsEditModalOpen(true);
    }
  };

  const onToggleFocus = (id, focused) => {
    toggleFocus(id, focused);
    focused
      ? message.info("Removed from Focus List")
      : message.success("Added to Focus List");
  };

  return (
    <div
      onClick={() => handleEditClick(task._id)}
      className="group relative flex flex-col gap-2 p-3.5 mb-2 bg-[#0e0e0c] hover:bg-[#121210]
        border border-zinc-800/60 hover:border-zinc-700/60
        transition-colors duration-150 cursor-pointer overflow-hidden select-none"
    >
      {/* Top Row */}
      <div className="flex items-start justify-between gap-3">
        <div
          {...dragHandleProps}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-2 cursor-grab active:cursor-grabbing"
        >
          <span className="text-zinc-700 group-hover:text-zinc-500 transition-colors text-[10px]">
            ⠿
          </span>
          <span
            className={`text-[10px] uppercase font-medium px-2 py-0.5 border ${priorityStyles}`}
            style={mono}
          >
            {task.priority || "—"}
          </span>
        </div>

        {/* Hover actions */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          {task.status !== "done" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFocus(task._id, task.focused);
              }}
              className={`p-1 transition text-[12px] ${
                task.focused
                  ? "text-amber-400"
                  : "text-zinc-600 hover:text-amber-400"
              }`}
            >
              {task.focused ? "★" : "☆"}
            </button>
          )}

          {task.gitURL && (
            <a
              href={task.gitURL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1 text-zinc-600 hover:text-zinc-300 transition"
            >
              <GithubOutlined style={{ fontSize: 13 }} />
            </a>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(task._id);
            }}
            className="p-1 text-zinc-600 hover:text-zinc-300 transition"
          >
            <svg
              width="13"
              height="13"
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
              deleteTodo(task._id);
            }}
            className="p-1 text-zinc-600 hover:text-red-400 transition"
          >
            <svg
              width="13"
              height="13"
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
      <h4
        className="text-[13px] font-medium text-zinc-200 leading-snug line-clamp-2"
        style={mono}
      >
        {task.title || "Untitled task"}
      </h4>

      {task.description && (
        <p
          className="text-[11px] text-zinc-600 line-clamp-1"
          style={{ fontFamily: "'Newsreader', Georgia, serif" }}
        >
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 mt-1 border-t border-zinc-800/40">
        <div className="flex items-center gap-2">
          {task.issueId && (
            <span
              className="text-[10px] text-zinc-400 bg-[#0a0a08] px-1.5 py-0.5 border border-zinc-800/60"
              style={mono}
            >
              {task.issueId}
            </span>
          )}
          {task.updatedAt && (
            <span className="text-[10px] text-zinc-400" style={mono}>
              {formatDate(task.updatedAt)}
            </span>
          )}
          {task.subTask?.length > 0 && (
            <span className="text-[10px] text-zinc-700" style={mono}>
              {task.subTask.filter((s) => s.complete).length}/
              {task.subTask.length}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 justify-end max-w-[55%]">
          {task.tech?.slice(0, 3).map((t, i) => (
            <span
              key={i}
              className="text-[10px] px-1.5 py-0.5 bg-zinc-800/60 text-zinc-500 border border-zinc-800/40"
              style={mono}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Blocked indicator */}
      {task.blocked && (
        <div className="absolute -right-0.5 -top-0.5">
          <span className="flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 bg-red-500" />
          </span>
        </div>
      )}
    </div>
  );
}

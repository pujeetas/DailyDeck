import { useEffect } from "react";
import FocusCard from "../components/FocusCard";
import useTodoStore from "../store/useTodoStore";
import { message } from "antd";

export default function FocusList() {
  const { fetchAllTodo, detailsList, bulkUnfocus } = useTodoStore();

  useEffect(() => {
    fetchAllTodo();
  }, [fetchAllTodo]);

  const focusTasks = detailsList.filter((t) => t.focused);
  const allIds = focusTasks.map((m) => m._id);

  const handleBulkUnfocus = () => {
    bulkUnfocus(allIds);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0A] text-neutral-200 selection:bg-neutral-500/30">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(255,255,255,0.12), rgba(255,255,255,0))",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Focus List</h1>
            <p className="text-xs text-zinc-500 mt-1">
              Curated tasks you want to focus on next. Unfocus or mark as done
              without touching the rest of your board.
            </p>
          </div>

          {focusTasks.length > 0 && (
            <button
              onClick={() => handleBulkUnfocus()}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition"
            >
              Clear Focus List
            </button>
          )}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-3 mb-6 text-[11px] text-zinc-400">
          <span className="px-2.5 py-1 rounded-full bg-neutral-900/60 border border-white/5">
            In focus:{" "}
            <span className="text-zinc-100 font-medium">
              {focusTasks.length}
            </span>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-neutral-900/60 border border-white/5">
            High priority:{" "}
            <span className="text-zinc-100 font-medium">
              {focusTasks.filter((t) => t.priority === "high").length}
            </span>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-neutral-900/60 border border-white/5">
            In progress / review:{" "}
            <span className="text-zinc-100 font-medium">
              {
                focusTasks.filter((t) =>
                  ["progress", "review"].includes(t.status)
                ).length
              }
            </span>
          </span>
        </div>

        {/* List */}
        {focusTasks.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-900/70 border border-white/5 flex items-center justify-center text-sm">
              ⭐
            </div>
            <p className="text-sm text-zinc-300">
              No tasks in your focus list yet.
            </p>
            <p className="text-xs text-zinc-500 max-w-sm">
              From your board, mark tasks as{" "}
              <span className="font-medium text-zinc-300">“Focus”</span> to see
              them here, or use this page to curate your next work session.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {focusTasks.map((task) => (
              <FocusCard key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

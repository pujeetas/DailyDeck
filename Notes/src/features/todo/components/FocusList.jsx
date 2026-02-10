import { useEffect } from "react";
import FocusCard from "../components/FocusCard";
import useTodoStore from "../store/useTodoStore";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

export default function FocusList() {
  const { fetchAllTodo, detailsList, bulkUnfocus } = useTodoStore();

  useEffect(() => {
    fetchAllTodo();
  }, [fetchAllTodo]);

  const focusTasks = detailsList.filter((t) => t.focused);
  const allIds = focusTasks.map((m) => m._id);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a08] text-zinc-200 selection:bg-amber-500/30">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 3px)",
            backgroundSize: "100% 3px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-amber-600/50" />
              <span
                className="text-[11px] text-amber-600/80 tracking-[0.25em] uppercase"
                style={mono}
              >
                Focus Mode
              </span>
            </div>
            <h1
              className="text-2xl font-semibold text-zinc-100 tracking-[-0.02em]"
              style={serif}
            >
              Focus List
            </h1>
            <p className="text-[15px] text-zinc-600 mt-1" style={serif}>
              Curated tasks for your next work session.
            </p>
          </div>

          {focusTasks.length > 0 && (
            <button
              onClick={() => bulkUnfocus(allIds)}
              className="px-4 py-2 border border-zinc-800/60 bg-[#0c0c0a] text-[11px] text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 transition-colors"
              style={mono}
            >
              CLEAR ALL
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {[
            { label: "In focus", value: focusTasks.length },
            {
              label: "High",
              value: focusTasks.filter((t) => t.priority === "high").length,
            },
            {
              label: "Active",
              value: focusTasks.filter((t) =>
                ["progress", "review"].includes(t.status),
              ).length,
            },
          ].map((stat) => (
            <span
              key={stat.label}
              className="text-[12px] px-2.5 py-1 bg-[#0c0c0a] border border-zinc-800/60 text-zinc-600"
              style={mono}
            >
              {stat.label}: <span className="text-zinc-400">{stat.value}</span>
            </span>
          ))}
        </div>

        {/* List */}
        {focusTasks.length === 0 ? (
          <div className="mt-20 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-12 h-12 border border-zinc-800/60 bg-[#0c0c0a] flex items-center justify-center text-amber-500 text-lg">
              ★
            </div>
            <p className="text-[14px] text-zinc-400" style={serif}>
              No tasks in your focus list yet.
            </p>
            <p className="text-[12px] text-zinc-600 max-w-sm" style={serif}>
              Mark tasks as <span className="text-zinc-300">"Focus"</span> from
              your board to see them here.
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

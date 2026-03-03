import { Activity, CheckCircle, FileText, Sparkles } from "lucide-react";
import useUserStore from "./hooks/useUserStore";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

const ActivityStats = () => {
  const { user } = useUserStore();

  console.log(user);

  const stats = [
    {
      id: 1,
      label: "Total Notes",
      value: user?.totalNotes || 0,
      trend: "All time",
      icon: <FileText className="w-3.5 h-3.5" />,
      color: "text-blue-400",
      accentBorder: "border-blue-500/30",
    },
    {
      id: 2,
      label: "Tasks Done",
      value: user?.totalTodo || 0,
      trend: "All time",
      icon: <CheckCircle className="w-3.5 h-3.5" />,
      color: "text-emerald-400",
      accentBorder: "border-emerald-500/30",
    },
    {
      id: 3,
      label: "AI Searches",
      value: user?.aiSearches || 0,
      trend: "All time",
      icon: <Sparkles className="w-3.5 h-3.5" />,
      color: "text-amber-400",
      accentBorder: "border-amber-500/30",
    },
    {
      id: 4,
      label: "Active Streak",
      value: `${user?.currentStreak || 0}d`,
      trend:
        user?.longestStreak === user?.currentStreak
          ? "Best"
          : `Best: ${user?.longestStreak || 0}d`,
      icon: <Activity className="w-3.5 h-3.5" />,
      color: "text-purple-400",
      accentBorder: "border-purple-500/30",
    },
  ];

  return (
    <div className="mt-12 pt-10 border-t border-zinc-800/40">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-amber-600/50" />
          <span
            className="text-[11px] text-amber-600/80 tracking-[0.25em] uppercase"
            style={mono}
          >
            Metrics
          </span>
        </div>
        <span
          className="text-[10px] text-zinc-400 tracking-[0.15em] uppercase px-3 py-1.5 border border-zinc-800/60 bg-[#0c0c0a]"
          style={mono}
        >
          All Time
        </span>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`relative bg-[#0c0c0a] border border-zinc-800/60 p-6 hover:border-zinc-700/60 transition-colors duration-200 border-t-2 ${stat.accentBorder}`}
          >
            {/* Top: number + icon */}
            <div className="flex items-start justify-between mb-5">
              <span
                className="text-[10px] text-zinc-500 tracking-wider"
                style={mono}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={`${stat.color}`}>{stat.icon}</div>
            </div>

            {/* Value */}
            <h3
              className="text-3xl font-semibold text-zinc-100 tracking-[-0.02em] mb-1"
              style={serif}
            >
              {stat.value}
            </h3>

            {/* Label + trend */}
            <div className="flex items-center justify-between mt-1">
              <p className="text-[14px] text-zinc-500 font-bold" style={mono}>
                {stat.label}
              </p>
              <span className="text-[10px] text-zinc-700" style={mono}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityStats;

import React from "react";
import {
  Activity,
  Clock,
  Zap,
  TrendingUp,
  Code2,
  FileText,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import useUserStore from "./hooks/useUserStore";

const ActivityStats = () => {
  const { user } = useUserStore();

  console.log(user);

  const stats = [
    {
      id: 1,
      label: "Total Notes",
      value: user?.totalNotes || 0,
      trend: "All time",
      trendUp: true,
      icon: <FileText className="w-4 h-4" />,
      color: "text-blue-400",
      bgColor: "bg-blue-400",
    },
    {
      id: 2,
      label: "Tasks Completed",
      value: user?.totalTodo || 0,
      trend: "All time",
      trendUp: true,
      icon: <CheckCircle className="w-4 h-4" />,
      color: "text-emerald-400",
      bgColor: "bg-emerald-400",
    },
    ,
    {
      id: 3,
      label: "AI Searches",
      value: user?.aiSearches || 0,
      trend: "All time",
      trendUp: true,
      icon: <Sparkles className="w-4 h-4" />,
      color: "text-amber-400",
      bgColor: "bg-amber-400",
    },
    {
      id: 4,
      label: "Active Streak",
      value: `${user?.currentStreak || 0} Days`,
      trend:
        user?.longestStreak === user?.currentStreak
          ? "Best"
          : `Best: ${user?.longestStreak || 0}`,
      trendUp: true,
      icon: <Activity className="w-4 h-4" />,
      color: "text-purple-400",
      bgColor: "bg-purple-400",
      progress: "w-1/2",
    },
  ];

  return (
    <div className="mt-8 pt-8 border-t border-zinc-800/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Workspace Metrics
        </h2>
        <span className="text-xs font-mono text-zinc-500 bg-zinc-900/50 px-2 py-1 rounded border border-zinc-800">
          LAST 7 DAYS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="group relative bg-zinc-900/20 border border-zinc-800/50 hover:border-zinc-700/50 rounded-xl p-5 transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-2 rounded-lg bg-zinc-900 border border-zinc-800 ${stat.color} bg-opacity-10`}
              >
                {stat.icon}
              </div>
              <div
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  stat.trendUp
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {stat.trend}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-zinc-100 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-sm text-zinc-500 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityStats;

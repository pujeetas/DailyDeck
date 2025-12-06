import { useNavigate } from "react-router-dom";
import Header from "./components/layout/Header";

function MainMenu() {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "notes",
      name: "Notes",
      description: "Developer-friendly markdown + rich text workspace",
      icon: "📝",
      path: "/notes",
      color: "text-indigo-400",
      glow: "group-hover:shadow-indigo-500/10 group-hover:border-indigo-500/20",
      bg: "group-hover:bg-indigo-500/5",
    },
    {
      id: "todo",
      name: "Tasks",
      description: "Manage your development workflow",
      icon: "📌",
      path: "/to-do",
      color: "text-rose-400",
      glow: "group-hover:shadow-rose-500/10 group-hover:border-rose-500/20",
      bg: "group-hover:bg-rose-500/5",
    },
    {
      id: "calendar",
      name: "Calendar",
      description: "Plan schedules & deadlines",
      icon: "📅",
      path: "/calendar",
      color: "text-blue-400",
      glow: "group-hover:shadow-blue-500/10 group-hover:border-blue-500/20",
      bg: "group-hover:bg-blue-500/5",
    },
    {
      id: "reminders",
      name: "Reminders",
      description: "Never miss critical moments",
      icon: "⏰",
      path: "/reminders",
      color: "text-yellow-400",
      glow: "group-hover:shadow-yellow-500/10 group-hover:border-yellow-500/20",
      bg: "group-hover:bg-yellow-500/5",
    },
    {
      id: "focus",
      name: "Focus Timer",
      description: "Deep work with Pomodoro sessions",
      icon: "⏱️",
      path: "/focus-timer",
      color: "text-teal-400",
      glow: "group-hover:shadow-teal-500/10 group-hover:border-teal-500/20",
      bg: "group-hover:bg-teal-500/5",
    },
    {
      id: "news",
      name: "TechBuzz",
      description: "Daily tech briefs for developers",
      icon: "📰",
      path: "/tech-buzz",
      color: "text-lime-400",
      glow: "group-hover:shadow-lime-500/10 group-hover:border-lime-500/20",
      bg: "group-hover:bg-lime-500/5",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 selection:bg-indigo-500/30">
      <Header />

      <div className="px-6 py-16 flex flex-col items-center animate-fadeUp">
        {/* Title Section */}
        <div className="text-center mb-16 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            DailyDeck
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Your all-in-one developer productivity suite. <br />
            Select a tool to start your flow.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`
                group relative bg-zinc-900/50 border border-zinc-800/60 rounded-2xl 
                p-8 cursor-pointer transition-all duration-300 ease-out
                hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]
                ${item.glow} ${item.bg}
              `}
            >
              <div className="flex flex-col items-center text-center relative z-10">
                {/* Icon */}
                <div
                  className={`text-5xl mb-6 transition-transform duration-300 group-hover:scale-110 drop-shadow-2xl ${item.color}`}
                >
                  {item.icon}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                  {item.name}
                </h3>

                {/* Description */}
                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                  {item.description}
                </p>

                {/* Micro CTA */}
                <div
                  className={`
                  mt-6 text-xs font-bold uppercase tracking-wider opacity-0 translate-y-2
                  group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300
                  ${item.color}
                `}
                >
                  Launch App →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainMenu;

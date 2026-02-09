import { useNavigate } from "react-router-dom";
import Header from "./components/layout/Header";
import { mainMenuItems } from "./constants/mainMenuItems";
import { ArrowRight, Clock } from "lucide-react";
import ActivityStats from "./ActivityStats";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

function MainMenu() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#0a0a08] text-zinc-200 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
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

      <Header />

      <main className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        {/* Page header */}
        <div className="mb-14 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span
              className="text-[13px] text-zinc-400 tracking-[0.2em] uppercase"
              style={mono}
            >
              All Systems Online
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-semibold text-zinc-100 mb-4 tracking-[-0.02em] leading-[1.1]"
            style={serif}
          >
            Your workspace.
          </h1>
          <p
            className="text-[17px] text-zinc-500 leading-[1.7] max-w-lg"
            style={serif}
          >
            Access your dev tools in one place. Pick a module to begin.
          </p>
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {mainMenuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className="group relative bg-[#0c0c0a] border border-zinc-800/60 p-7 text-left
                         hover:border-zinc-700/80 hover:bg-[#0e0e0c]
                         transition-all duration-200 ease-out
                         focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:ring-offset-1 focus:ring-offset-[#0a0a08]"
            >
              <div className="relative z-10">
                {/* Top row: number + arrow */}
                <div className="flex items-start justify-between mb-5">
                  <span
                    className="text-[12px] text-zinc-700 tracking-wider"
                    style={mono}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all duration-200" />
                </div>

                {/* Icon */}
                <div
                  className={`w-10 h-10 mb-5 flex items-center justify-center ${item.color} transition-transform duration-200 group-hover:scale-105`}
                >
                  {item.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-[17px] font-semibold text-zinc-100 mb-2 tracking-[-0.01em] group-hover:text-zinc-100 transition-colors"
                  style={serif}
                >
                  {item.name}
                </h3>

                {/* Description */}
                <p
                  className="text-[15px] text-zinc-400 leading-[1.6] group-hover:text-zinc-500 transition-colors"
                  style={serif}
                >
                  {item.description}
                </p>

                {/* Bottom action hint */}
                <div className="mt-5 pt-4 border-t border-zinc-800/40 group-hover:border-zinc-700/50 transition-colors">
                  <span
                    className="text-[10px] text-zinc-300 group-hover:text-amber-500/80 tracking-[0.15em] uppercase transition-colors"
                    style={mono}
                  >
                    Open Module →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <ActivityStats />

        <div className="mt-10 pt-8 border-t border-zinc-800/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={() => handleNavigation("/notes")}
                className="cursor-pointer text-[15px] text-zinc-500 hover:text-amber-500 transition-colors"
                style={mono}
              >
                Quick Note ↗
              </button>
              <button
                onClick={() => handleNavigation("/to-do")}
                className="cursor-pointer text-[15px] text-zinc-500 hover:text-amber-500 transition-colors"
                style={mono}
              >
                Today's Tasks ↗
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainMenu;

import { useNavigate } from "react-router-dom";
import Header from "./components/layout/Header";
import { mainMenuItems } from "./constants/mainMenuItems";
import { ArrowRight } from "lucide-react";

function MainMenu() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/50 border border-zinc-800/50 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-zinc-400">
              All systems operational
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Developer Workspace
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Access your productivity tools in one unified platform. Choose a
            module to begin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainMenuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className="group relative bg-zinc-900/30 border border-zinc-800/50 rounded-xl p-6 text-left
                         hover:bg-zinc-900/50 hover:border-zinc-700/50
                         transition-all duration-200 ease-out
                         focus:outline-none focus:ring-2 focus:ring-zinc-700 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${item.bgGradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${item.color} transition-transform duration-200 group-hover:scale-110`}
                  >
                    {item.icon}
                  </div>
                  <ArrowRight className="w-5 h-5 text-zinc-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.name}
                </h3>

                <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                  {item.description}
                </p>

                <div
                  className={`mt-4 pt-4 border-t ${item.accentColor} opacity-0 group-hover:opacity-100 transition-all duration-200`}
                >
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Open Module
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MainMenu;

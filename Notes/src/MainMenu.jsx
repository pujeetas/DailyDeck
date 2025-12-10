import { useNavigate } from "react-router-dom";
import Header from "./components/layout/Header";
import { mainMenuItems } from "./constants/mainMenuItems";

function MainMenu() {
  const navigate = useNavigate();
  const menuItems = mainMenuItems;
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

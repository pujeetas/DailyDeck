import React from "react";
import { Terminal, Briefcase, Layers, CheckCircle2 } from "lucide-react";

const UseCases = () => {
  const personas = [
    {
      title: "For Developers",
      icon: <Terminal className="w-6 h-6 text-blue-400" />,
      description:
        "Keep sprint tasks, bug reports, and code snippets in one mental context. Designed for command-first workflows.",
      features: [
        "Markdown & Code Blocks",
        "Keyboard-First Actions",
        "Issue & Task Linking",
      ],
      gradient: "from-blue-500/30 to-transparent",
      border: "border-blue-500/30",
      glow: "group-hover:shadow-[0_0_32px_rgba(59,130,246,0.15)]",
    },
    {
      title: "For Founders",
      icon: <Briefcase className="w-6 h-6 text-emerald-400" />,
      description:
        "Bridge strategy and execution. Track decisions, meetings, and priorities without switching tools.",
      features: [
        "Strategy → Task Flow",
        "Investor & Meeting Notes",
        "Priority Tracking",
      ],
      gradient: "from-emerald-500/30 to-transparent",
      border: "border-emerald-500/30",
      glow: "group-hover:shadow-[0_0_32px_rgba(16,185,129,0.15)]",
    },
    {
      title: "For Product Managers",
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      description:
        "Connect roadmaps, specs, and execution in a single workspace built for fast-moving teams.",
      features: ["Roadmap Views", "Spec & Doc Linking", "Cross-Team Context"],
      gradient: "from-purple-500/30 to-transparent",
      border: "border-purple-500/30",
      glow: "group-hover:shadow-[0_0_32px_rgba(168,85,247,0.15)]",
    },
  ];

  return (
    <section className="py-24 px-6 border-t border-zinc-900 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Built for real <span className="text-blue-500">workflows.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            DailyDeck adapts to how modern builders think — from code and
            strategy to execution.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {personas.map((item, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-3xl bg-[#121214] border border-zinc-800 ${item.glow} transition-all duration-300 group overflow-hidden hover:-translate-y-1`}
            >
              {/* Top Gradient Accent */}
              <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.gradient}`}
              />

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-zinc-900 ${item.border} border flex items-center justify-center mb-6 transition-transform duration-300 group-hover:-translate-y-0.5`}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-3">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 leading-relaxed mb-8 text-sm">
                {item.description}
              </p>

              {/* Feature List */}
              <ul className="space-y-3">
                {item.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-center gap-3 text-sm text-zinc-300 font-mono-tech"
                  >
                    <CheckCircle2 className="w-4 h-4 text-zinc-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;

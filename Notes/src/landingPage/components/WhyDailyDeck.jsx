import React from "react";
import { Layers, Zap, Focus } from "lucide-react"; // Ensure you have lucide-react installed

const WhyDailyDeck = () => {
  const reasons = [
    {
      icon: <Layers className="w-6 h-6 text-blue-600" />,
      title: "Stop Context Switching",
      description:
        "Your notes, tasks, and calendar shouldn't live in different apps. We bring them together so you stop losing focus while toggling tabs.",
    },
    {
      icon: <Zap className="w-6 h-6 text-orange-500" />,
      title: "Zero Friction Input",
      description:
        "Capture ideas instantly. The interface is designed to get out of your way, so you can log thoughts faster than you forget them.",
    },
    {
      icon: <Focus className="w-6 h-6 text-emerald-600" />,
      title: "Designed for Deep Work",
      description:
        "No cluttered sidebars or complex menus. Just a calm, distraction-free environment built to help you finish what you start.",
    },
  ];

  return (
    <section className="px-6 py-24 bg-white max-w-7xl mx-auto ">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
          Why we built DailyDeck
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          Most tools force you to manage the software instead of your work. We
          built a workspace that respects your attention span.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-300 ease-spring hover:-translate-y-2">
        {reasons.map((item, idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {item.title}
            </h3>
            <p className="text-slate-500 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyDailyDeck;

import React from "react";
import { motion } from "framer-motion";
import { FileText, CheckSquare, Calendar, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

const features = [
  {
    num: "01",
    title: "The Canvas",
    subtitle: "Write freely. Think clearly.",
    description:
      "A document editor that understands context. Embed tasks, link calendar events, and write in markdown — all in one surface.",
    icon: <FileText className="w-5 h-5" />,
    color: "text-orange-400",
    accent: "bg-orange-500",
    mockContent: (
      <div
        className="space-y-3 p-5"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <div className="h-1.5 bg-zinc-800 rounded w-4/5" />
        <div className="h-1.5 bg-zinc-800 rounded w-3/5" />
        <div className="h-1.5 bg-zinc-800 rounded w-2/3" />
        <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/15 text-[11px] text-blue-400 flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          Meeting: Q3 Strategy — Tomorrow 2PM
        </div>
        <div className="p-3 bg-emerald-500/5 border border-emerald-500/15 text-[11px] text-emerald-400 flex items-center gap-2">
          <CheckSquare className="w-3 h-3" />
          Review auth refactor PR
        </div>
      </div>
    ),
  },
  {
    num: "02",
    title: "Tasks",
    subtitle: "Auto-generated. Always current.",
    description:
      "Highlight any text to create a task. They inherit context from the document they came from — no copy-pasting between apps.",
    icon: <CheckSquare className="w-5 h-5" />,
    color: "text-emerald-400",
    accent: "bg-emerald-500",
    mockContent: (
      <div
        className="space-y-2 p-5"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {[
          { label: "Refactor Auth Flow", done: true },
          { label: "Update API docs", done: true },
          { label: "Ship hero section", done: false },
          { label: "Database indexes", done: false },
        ].map((task) => (
          <div
            key={task.label}
            className="flex items-center gap-3 py-2 border-b border-zinc-800/50 last:border-0"
          >
            <div
              className={`w-4 h-4 border flex items-center justify-center text-[9px] ${
                task.done
                  ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-500"
                  : "border-zinc-700 text-transparent"
              }`}
            >
              ✓
            </div>
            <span
              className={`text-[12px] ${task.done ? "text-zinc-600 line-through" : "text-zinc-300"}`}
            >
              {task.label}
            </span>
          </div>
        ))}
        <div className="pt-2 text-[10px] text-zinc-700">
          4 tasks · 2 completed
        </div>
      </div>
    ),
  },
  {
    num: "03",
    title: "Calendar",
    subtitle: "Two-way sync with your notes.",
    description:
      "See your day in context. Time-block tasks from your documents directly onto the calendar. No more blind scheduling.",
    icon: <Calendar className="w-5 h-5" />,
    color: "text-blue-400",
    accent: "bg-blue-500",
    mockContent: (
      <div
        className="space-y-1 p-5"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {[
          {
            time: "09:00",
            label: "Deep Work Block",
            sub: "Auth Refactor",
            active: true,
          },
          { time: "10:30", label: "Team Standup", sub: null, active: false },
          { time: "11:00", label: null, sub: null, active: false },
          {
            time: "14:00",
            label: "Q3 Strategy",
            sub: "Linked from Canvas",
            active: false,
          },
        ].map((slot) => (
          <div key={slot.time} className="flex gap-3 py-2">
            <span className="text-[11px] text-zinc-600 w-10 shrink-0 text-right pt-0.5">
              {slot.time}
            </span>
            {slot.label ? (
              <div
                className={`flex-1 p-2.5 border-l-2 ${
                  slot.active
                    ? "border-blue-500 bg-blue-500/5"
                    : "border-zinc-800 bg-zinc-900/30"
                }`}
              >
                <span
                  className={`text-[12px] font-medium ${slot.active ? "text-blue-300" : "text-zinc-400"}`}
                >
                  {slot.label}
                </span>
                {slot.sub && (
                  <p className="text-[10px] text-zinc-600 mt-0.5">{slot.sub}</p>
                )}
              </div>
            ) : (
              <div className="flex-1 border-b border-zinc-800/30 mb-2" />
            )}
          </div>
        ))}
      </div>
    ),
  },
];

export default function FeatureShowcase() {
  const navigate = useNavigate();

  return (
    <section
      id="features"
      className="py-28 px-6 bg-[#0a0a08] border-t border-zinc-800/40"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-amber-600/50" />
            <span
              className="text-[11px] text-amber-600/80 tracking-[0.25em] uppercase"
              style={mono}
            >
              Core System
            </span>
          </div>
          <h2
            className="text-[clamp(2rem,4vw,3.5rem)] text-zinc-100 leading-[1.1] tracking-[-0.02em]"
            style={serif}
          >
            Three tools.{" "}
            <span className="italic text-zinc-500">One surface.</span>
          </h2>
        </motion.div>

        {/* Feature panels — stacked, not bento */}
        <div className="space-y-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group border border-zinc-800/60 bg-[#0c0c0a] hover:border-zinc-700/60 transition-colors duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px]">
                {/* Left: Description */}
                <div className="p-8 md:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span
                        className="text-[11px] text-zinc-700 tracking-wider"
                        style={mono}
                      >
                        {feature.num}
                      </span>
                      <div
                        className={`w-8 h-8 flex items-center justify-center ${feature.color}`}
                      >
                        {feature.icon}
                      </div>
                    </div>
                    <h3
                      className="text-2xl md:text-3xl font-semibold text-zinc-100 mb-2 tracking-[-0.01em]"
                      style={serif}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-[13px] text-zinc-600 mb-4" style={mono}>
                      {feature.subtitle}
                    </p>
                    <p
                      className="text-[15px] text-zinc-500 leading-[1.7] max-w-md"
                      style={serif}
                    >
                      {feature.description}
                    </p>
                  </div>
                  <div className="mt-8">
                    <button
                      className="inline-flex items-center gap-2 text-[11px] text-zinc-600 group-hover:text-zinc-400 transition-colors cursor-pointer"
                      style={mono}
                      onClick={() => navigate("/login")}
                    >
                      LEARN MORE
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Right: Mock UI */}
                <div className="border-t lg:border-t-0 lg:border-l border-zinc-800/60 bg-[#0b0b09] min-h-[280px] flex flex-col justify-center">
                  {feature.mockContent}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

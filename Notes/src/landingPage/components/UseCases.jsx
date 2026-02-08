import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Briefcase, Layers } from "lucide-react";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

const personas = [
  {
    key: "dev",
    tag: "DEV",
    title: "Developers",
    icon: <Terminal className="w-4 h-4" />,
    color: "text-emerald-400",
    accent: "border-emerald-500",
    description:
      "Keep sprint tasks, bug reports, and code snippets in one mental context. Designed for command-first, keyboard-first workflows.",
    features: [
      "Markdown & Code Blocks",
      "Keyboard-First Actions",
      "Issue & Task Linking",
    ],
  },
  {
    key: "founder",
    tag: "BIZ",
    title: "Founders",
    icon: <Briefcase className="w-4 h-4" />,
    color: "text-amber-400",
    accent: "border-amber-500",
    description:
      "Bridge strategy and execution. Track decisions, meetings, and priorities without switching between five different tools.",
    features: [
      "Strategy → Task Flow",
      "Investor & Meeting Notes",
      "Priority Tracking",
    ],
  },
  {
    key: "pm",
    tag: "PM",
    title: "Product Managers",
    icon: <Layers className="w-4 h-4" />,
    color: "text-blue-400",
    accent: "border-blue-500",
    description:
      "Connect roadmaps, specs, and execution in a single workspace built for fast-moving cross-functional teams.",
    features: ["Roadmap Views", "Spec & Doc Linking", "Cross-Team Context"],
  },
];

export default function UseCases() {
  const [active, setActive] = useState(0);
  const current = personas[active];

  return (
    <section
      id="use-cases"
      className="py-28 px-6 bg-[#0a0a08] border-t border-zinc-800/40"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-amber-600/50" />
            <span
              className="text-[11px] text-amber-600/80 tracking-[0.25em] uppercase"
              style={mono}
            >
              Use Cases
            </span>
          </div>
          <h2
            className="text-[clamp(2rem,4vw,3.5rem)] text-zinc-100 leading-[1.1] tracking-[-0.02em]"
            style={serif}
          >
            Built for real{" "}
            <span className="italic text-zinc-500">workflows.</span>
          </h2>
        </motion.div>

        {/* Tab selector — horizontal strip */}
        <div className="flex gap-1 mb-10 border border-zinc-800/60 bg-[#0c0c0a] p-1 w-fit">
          {personas.map((p, i) => (
            <button
              key={p.key}
              onClick={() => setActive(i)}
              className={`relative px-6 py-3 text-[12px] font-medium tracking-wide transition-all duration-200 ${
                active === i
                  ? "text-zinc-100 bg-zinc-800/80"
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
              style={mono}
            >
              <span className="flex items-center gap-2.5">
                <span className={active === i ? p.color : "text-zinc-600"}>
                  {p.icon}
                </span>
                <span className="hidden sm:inline">{p.title}</span>
                <span className="sm:hidden">{p.tag}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Active persona detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className={`border ${current.accent}/20 border-zinc-800/60 bg-[#0c0c0a]`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
              {/* Left: Copy */}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className={`${current.color}`}>{current.icon}</span>
                  <span
                    className="text-[11px] text-zinc-600 tracking-[0.15em] uppercase"
                    style={mono}
                  >
                    For {current.title}
                  </span>
                </div>
                <h3
                  className="text-2xl font-semibold text-zinc-100 mb-4 tracking-[-0.01em]"
                  style={serif}
                >
                  {current.description.split(".")[0]}.
                </h3>
                <p
                  className="text-[15px] text-zinc-500 leading-[1.7]"
                  style={serif}
                >
                  {current.description.split(".").slice(1).join(".").trim()}
                </p>
              </div>

              {/* Right: Feature list */}
              <div className="border-t lg:border-t-0 lg:border-l border-zinc-800/60 p-8 md:p-10 flex flex-col justify-center">
                <span
                  className="text-[10px] text-zinc-700 tracking-[0.2em] uppercase mb-5"
                  style={mono}
                >
                  Key Capabilities
                </span>
                <div className="space-y-4">
                  {current.features.map((feature, fi) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: fi * 0.08 }}
                      className="flex items-center gap-4"
                    >
                      <div
                        className={`w-5 h-[1px] ${current.accent.replace("border-", "bg-")}/50`}
                      />
                      <span className="text-[14px] text-zinc-300" style={mono}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

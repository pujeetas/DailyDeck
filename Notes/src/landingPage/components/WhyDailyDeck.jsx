import React from "react";
import { motion } from "framer-motion";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

const pillars = [
  {
    num: "01",
    title: "Your tools should serve you",
    body: "Most productivity apps demand you learn their system. We built the opposite — a workspace that conforms to how you already think and work.",
  },
  {
    num: "02",
    title: "Context is everything",
    body: "Switching between 5 tabs to find one thought is a design failure, not a workflow. Your notes, tasks, and schedule belong in the same mental space.",
  },
  {
    num: "03",
    title: "Speed is respect",
    body: "Every millisecond of latency is time stolen from your flow state. DailyDeck is local-first, instant-input, zero-friction by default.",
  },
];

export default function WhyDailyDeck() {
  return (
    <section className="py-28 px-6 bg-[#0a0a08] border-t border-zinc-800/40">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-16 lg:gap-24">
          {/* Left — sticky label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-amber-600/50" />
              <span
                className="text-[11px] text-amber-600/80 tracking-[0.25em] uppercase"
                style={mono}
              >
                Philosophy
              </span>
            </div>
            <h2
              className="text-[clamp(2rem,4vw,3rem)] text-zinc-100 leading-[1.1] tracking-[-0.02em] mb-5"
              style={serif}
            >
              Why we built <span className="italic text-amber-500">this.</span>
            </h2>
            <p
              className="text-[15px] text-zinc-600 leading-[1.7]"
              style={serif}
            >
              Not another project management tool. A quiet system that respects
              your attention.
            </p>
          </motion.div>

          {/* Right — pillars */}
          <div>
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1 }}
                className={`py-10 ${i < pillars.length - 1 ? "border-b border-zinc-800/50" : ""}`}
              >
                <div className="flex items-start gap-6">
                  <span
                    className="text-[11px] text-zinc-700 tracking-wider mt-1.5 shrink-0"
                    style={mono}
                  >
                    {pillar.num}
                  </span>
                  <div>
                    <h3
                      className="text-xl font-semibold text-zinc-200 mb-3 tracking-[-0.01em]"
                      style={serif}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className="text-[15px] text-zinc-500 leading-[1.75] max-w-lg"
                      style={serif}
                    >
                      {pillar.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

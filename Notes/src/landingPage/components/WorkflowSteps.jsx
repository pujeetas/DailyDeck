import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, CheckSquare, Calendar } from "lucide-react";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

const steps = [
  {
    id: 0,
    num: "01",
    title: "Capture",
    description:
      "Dump thoughts, code snippets, and meeting notes into the global inbox. Markdown native. No friction.",
    color: "text-orange-400",
    accentBg: "bg-orange-500",
    accentBorder: "border-orange-500",
    icon: <FileText className="w-4 h-4" />,
    preview: (
      <div
        className="space-y-2 text-[12px]"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <div className="text-zinc-600 text-[10px] mb-3">
          Drafts / Quick Notes.md
        </div>
        <div className="text-zinc-300">## Project Alpha Ideas</div>
        <div className="text-zinc-500">- Need to refactor the auth flow</div>
        <div className="text-zinc-500">
          - <span className="text-blue-400">@Sarah</span> mentioned API rate
          limits
        </div>
        <div className="text-zinc-500">- [ ] Check database indexes</div>
      </div>
    ),
  },
  {
    id: 1,
    num: "02",
    title: "Organize",
    description:
      "Highlight text to create tasks. Drag to reprioritize. Dates are parsed automatically from your writing.",
    color: "text-emerald-400",
    accentBg: "bg-emerald-500",
    accentBorder: "border-emerald-500",
    icon: <CheckSquare className="w-4 h-4" />,
    preview: (
      <div
        className="space-y-2"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <div className="text-zinc-600 text-[10px] mb-3">Tasks / Sprint-32</div>
        <div className="flex items-center gap-3 p-2.5 bg-emerald-500/5 border border-emerald-500/15">
          <div className="w-3.5 h-3.5 border border-emerald-500/50 flex items-center justify-center text-emerald-500 text-[8px]">
            ✓
          </div>
          <span className="text-[12px] text-zinc-300">Refactor Auth Flow</span>
          <span className="ml-auto text-[10px] text-zinc-600">
            from Quick Notes
          </span>
        </div>
        <div className="flex items-center gap-3 p-2.5 bg-zinc-900/30 border border-zinc-800/50">
          <div className="w-3.5 h-3.5 border border-zinc-700" />
          <span className="text-[12px] text-zinc-400">
            Check database indexes
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    num: "03",
    title: "Review",
    description:
      "See your day in the context of deadlines. Time-block tasks directly on the calendar. Ship with clarity.",
    color: "text-blue-400",
    accentBg: "bg-blue-500",
    accentBorder: "border-blue-500",
    icon: <Calendar className="w-4 h-4" />,
    preview: (
      <div
        className="space-y-1"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <div className="text-zinc-600 text-[10px] mb-3">Calendar / Today</div>
        <div className="flex gap-3">
          <span className="text-[11px] text-zinc-600 w-10 text-right">
            09:00
          </span>
          <div className="flex-1 p-2.5 border-l-2 border-blue-500 bg-blue-500/5">
            <div className="text-[12px] text-blue-300 font-medium">
              Deep Work Block
            </div>
            <div className="text-[10px] text-zinc-600 mt-0.5">
              Focus: Auth Refactor
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-[11px] text-zinc-600 w-10 text-right">
            10:30
          </span>
          <div className="flex-1 p-2.5 border-l-2 border-zinc-800">
            <div className="text-[12px] text-zinc-500">Team Standup</div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function WorkflowSteps() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="workflow"
      className="py-28 px-6 bg-[#0a0a08] border-t border-zinc-800/40"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-amber-600/50" />
            <span
              className="text-[11px] text-amber-600/80 tracking-[0.25em] uppercase"
              style={mono}
            >
              Workflow
            </span>
          </div>
          <h2
            className="text-[clamp(2rem,4vw,3.5rem)] text-zinc-100 leading-[1.1] tracking-[-0.02em]"
            style={serif}
          >
            A system that{" "}
            <span className="italic text-zinc-500">adapts to you.</span>
          </h2>
        </div>

        {/* Steps — single column with expanding panels */}
        <div className="max-w-3xl">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            return (
              <div key={step.id} className="relative">
                {/* Vertical connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[11px] top-[40px] bottom-0 w-[1px] bg-zinc-800/60" />
                )}

                <div
                  onClick={() => setActiveStep(index)}
                  className="cursor-pointer group"
                >
                  {/* Step header row */}
                  <div className="flex items-start gap-6 py-6">
                    {/* Timeline dot */}
                    <div
                      className={`relative z-10 mt-1 w-[23px] h-[23px] flex items-center justify-center border transition-colors duration-300 ${
                        isActive
                          ? `${step.accentBorder} ${step.color}`
                          : "border-zinc-700 text-zinc-600"
                      }`}
                    >
                      {step.icon}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-baseline gap-4">
                        <span
                          className="text-[10px] text-zinc-700 tracking-wider"
                          style={mono}
                        >
                          {step.num}
                        </span>
                        <h3
                          className={`text-xl font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                            isActive
                              ? "text-zinc-100"
                              : "text-zinc-500 group-hover:text-zinc-300"
                          }`}
                          style={serif}
                        >
                          {step.title}
                        </h3>
                      </div>

                      {/* Expandable content */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p
                              className="text-[15px] text-zinc-500 leading-[1.7] mt-3 mb-5 max-w-lg"
                              style={serif}
                            >
                              {step.description}
                            </p>

                            {/* Inline preview panel */}
                            <div className="p-5 bg-[#0c0c0a] border border-zinc-800/60 mb-2">
                              {step.preview}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

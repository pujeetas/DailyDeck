import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  CheckSquare,
  Calendar,
  ArrowRight,
  CornerDownRight,
} from "lucide-react";

const steps = [
  {
    id: 0,
    title: "Capture",
    description:
      "Dump thoughts, code snippets, and meeting notes into the global inbox. Markdown supported.",
    color: "text-orange-400",
    border: "border-orange-500/50",
    bg: "bg-orange-500/10",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    id: 1,
    title: "Organize",
    description:
      "Highlight text to create tasks. Drag blocks to rearrange priority. The system parses dates automatically.",
    color: "text-emerald-400",
    border: "border-emerald-500/50",
    bg: "bg-emerald-500/10",
    icon: <CheckSquare className="w-5 h-5" />,
  },
  {
    id: 2,
    title: "Review",
    description:
      "See your day in the context of your deadlines. Time-block your tasks directly on the calendar.",
    color: "text-blue-400",
    border: "border-blue-500/50",
    bg: "bg-blue-500/10",
    icon: <Calendar className="w-5 h-5" />,
  },
];

export default function WorkflowSteps() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-32 px-6 bg-[#0a0a0a] border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            A system that <br />
            <span className="text-zinc-500">adapts to you.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT COLUMN: Step Selection */}
          <div className="flex flex-col gap-6">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <motion.div
                  key={step.id}
                  layout // <--- MUST-DO: Enables smooth layout resizing
                  onClick={() => setActiveStep(index)}
                  initial={false}
                  animate={{
                    backgroundColor: isActive
                      ? "rgba(39, 39, 42, 0.4)"
                      : "rgba(39, 39, 42, 0)",
                    borderColor: isActive
                      ? "rgba(63, 63, 70, 0.8)"
                      : "transparent",
                    y: isActive ? -4 : 0, // <--- SUBTLE FOCUS MOTION
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`
                    relative p-6 rounded-2xl border cursor-pointer group 
                    ${!isActive && "hover:bg-zinc-900/30 border-transparent"}
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-1 p-2 rounded-lg ${
                        isActive ? step.bg : "bg-zinc-900"
                      } transition-colors duration-300`}
                    >
                      <div
                        className={`${isActive ? step.color : "text-zinc-500"}`}
                      >
                        {step.icon}
                      </div>
                    </div>

                    <div>
                      <h3
                        className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                          isActive ? "text-white" : "text-zinc-500"
                        }`}
                      >
                        {step.title}
                      </h3>

                      {/* Smooth Collapse/Expand of Description */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-zinc-400 leading-relaxed text-sm pb-2">
                          {step.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="active-bar"
                      className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full ${step.bg.replace(
                        "/10",
                        ""
                      )}`}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Mock Interface */}
          <div className="relative h-[500px] bg-[#121214] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
            {/* Window Controls */}
            <div className="absolute top-0 w-full h-12 border-b border-zinc-800 flex items-center px-4 gap-2 bg-[#18181b]">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
            </div>

            {/* DYNAMIC CONTENT SWAP */}
            <div className="p-8 pt-20 h-full">
              <AnimatePresence mode="wait">
                {/* ^^^ MUST-DO: Ensures exit animations play before enter */}

                {activeStep === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="text-zinc-500 font-mono-tech text-xs mb-4">
                      Drafts / Quick Notes.md
                    </div>
                    <div className="text-2xl text-white font-bold">
                      Project Alpha Ideas
                    </div>
                    <div className="text-zinc-400 space-y-2 font-mono text-sm">
                      <p>- Need to refactor the auth flow</p>
                      <p>
                        - <span className="text-blue-400">@Sarah</span>{" "}
                        mentioned the API rate limits
                      </p>
                      <p>- [ ] Check database indexes</p>
                    </div>
                  </motion.div>
                )}

                {activeStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="text-zinc-500 font-mono-tech text-xs mb-4">
                      Tasks / Sprint-32
                    </div>
                    <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 flex items-center gap-3">
                      <div className="w-5 h-5 rounded border border-emerald-500/50 bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <CheckSquare className="w-3 h-3" />
                      </div>
                      <span className="text-zinc-200 text-sm">
                        Refactor Auth Flow
                      </span>
                    </div>
                    <div className="ml-8 flex items-center gap-2 text-zinc-500 text-xs">
                      <CornerDownRight className="w-3 h-3" />
                      <span>Extracted from "Quick Notes"</span>
                    </div>
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="text-zinc-500 font-mono-tech text-xs mb-4">
                      Calendar / Today
                    </div>
                    <div className="flex gap-4">
                      <div className="text-zinc-500 text-sm w-12 text-right">
                        09:00
                      </div>
                      <div className="flex-1 bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg">
                        <div className="text-blue-200 text-sm font-bold">
                          Deep Work Block
                        </div>
                        <div className="text-blue-400/60 text-xs mt-1">
                          Focus: Auth Refactor
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 opacity-50">
                      <div className="text-zinc-500 text-sm w-12 text-right">
                        10:00
                      </div>
                      <div className="flex-1 border-t border-zinc-800 mt-3"></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

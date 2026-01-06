import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import {
  Command,
  Code2,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Terminal,
} from "lucide-react";

export default function Hero() {
  const [step, setStep] = useState(0);
  const [text, setText] = useState("");

  // 1. MOUSE TRACKING HOOKS
  // We track x/y as a percentage (0 to 1) for performance
  const mouseX = useMotionValue(0.5);

  // 2. REACTIVE TRANSFORMATIONS
  // Movement: Caret shifts slightly (-3px to +3px) following the mouse
  const caretX = useTransform(mouseX, [0, 1], [-3, 3]);

  // Glow: Brighter when mouse is near the center (focus area)
  const glowOpacity = useTransform(mouseX, [0, 0.5, 1], [0.2, 0.8, 0.2]);
  const glowShadow = useMotionTemplate`0 0 15px rgba(16, 185, 129, ${glowOpacity})`;

  const handleMouseMove = (e) => {
    const { clientX } = e;
    const { innerWidth } = window;
    mouseX.set(clientX / innerWidth);
  };

  // TYPING SCRIPT (Unchanged)
  useEffect(() => {
    const sequence = [
      { text: "role: Developer", delay: 100, action: 1 },
      { text: "role: Founder", delay: 3000, action: 2 },
      { text: "role: Student", delay: 6000, action: 3 },
    ];

    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      const currentStep = sequence[currentIndex];

      if (!isDeleting && charIndex <= currentStep.text.length) {
        setText(currentStep.text.substring(0, charIndex));
        charIndex++;
        if (charIndex === currentStep.text.length + 1) {
          setStep(currentStep.action);
          isDeleting = true;
          timeout = setTimeout(type, 2000);
          return;
        }
        timeout = setTimeout(type, 50);
      } else if (isDeleting && charIndex >= 0) {
        setText(currentStep.text.substring(0, charIndex));
        charIndex--;
        if (charIndex === -1) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % sequence.length;
          timeout = setTimeout(type, 500);
          return;
        }
        timeout = setTimeout(type, 30);
      }
    };

    timeout = type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      onMouseMove={handleMouseMove} // <--- Attach Listener
      className="relative pt-40 pb-20 px-6 min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-[0.1] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-zinc-900/0 via-zinc-900/0 to-[#0a0a0a] pointer-events-none" />

      {/* HEADLINE */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono-tech text-zinc-400 mb-8"
        >
          <Terminal className="w-3 h-3 text-emerald-500" />
          <span>Workflow OS v1.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white"
        >
          The workspace for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
            modern builders.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Whether you ship code, manage products, or study systems—DailyDeck
          adapts to your brain.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row justify-center gap-4"
        >
          <button className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 hover:scale-105 transition-all flex items-center justify-center gap-2">
            Start Building <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* THE COMMAND STAGE */}
      <div className="relative w-full max-w-3xl h-[400px] perspective-1000">
        {/* The Command Bar */}
        <div className="relative z-50 bg-[#121214]/90 backdrop-blur-xl border border-zinc-700 rounded-xl p-4 shadow-2xl max-w-xl mx-auto flex items-center gap-4">
          <Command className="w-6 h-6 text-zinc-500" />
          <div className="flex-1 font-mono-tech text-lg text-white flex items-center">
            <span className="mr-2 text-emerald-500">{">"}</span>
            {text}

            {/* --- REACTIVE CARET --- */}
            <motion.span
              style={{
                x: caretX, // Moves left/right slightly
                boxShadow: glowShadow, // Glows brighter in center
              }}
              className="w-2.5 h-5 bg-emerald-500 ml-1 animate-pulse"
            />
          </div>
        </div>

        {/* Generated Cards Container */}
        <div className="absolute inset-0 pointer-events-none">
          <AnimatePresence mode="wait">
            {/* CARD 1: DEVELOPER */}
            {step === 1 && (
              <motion.div
                key="dev"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 100, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute top-20 left-1/2 -translate-x-1/2 w-80 p-6 bg-[#18181b] border border-zinc-800 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4 text-emerald-400">
                  <Code2 className="w-5 h-5" />
                  <span className="font-mono-tech text-xs uppercase tracking-wider">
                    Dev Mode
                  </span>
                </div>
                <div className="space-y-3 font-mono-tech text-xs">
                  <div className="p-3 bg-black/50 rounded border border-zinc-800 text-zinc-400">
                    <span className="text-purple-400">git</span> commit -m
                    "feat: ship hero"
                  </div>
                  <div className="flex justify-between text-zinc-500">
                    <span>PR #402</span>
                    <span className="text-emerald-500">Merged</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CARD 2: FOUNDER */}
            {step === 2 && (
              <motion.div
                key="founder"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 100, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute top-20 left-1/2 -translate-x-1/2 w-80 p-6 bg-[#18181b] border border-zinc-800 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4 text-blue-400">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-mono-tech text-xs uppercase tracking-wider">
                    Founder Mode
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-white text-sm font-medium">
                      Investor Meeting
                    </span>
                  </div>
                  <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-blue-500" />
                  </div>
                  <div className="text-xs text-zinc-500 flex justify-between">
                    <span>Seed Round Deck</span>
                    <span>75% Complete</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CARD 3: STUDENT */}
            {step === 3 && (
              <motion.div
                key="student"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 100, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute top-20 left-1/2 -translate-x-1/2 w-80 p-6 bg-[#18181b] border border-zinc-800 rounded-2xl shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-4 text-orange-400">
                  <GraduationCap className="w-5 h-5" />
                  <span className="font-mono-tech text-xs uppercase tracking-wider">
                    Student Mode
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <div className="text-orange-200 text-sm font-medium mb-1">
                      Algorithms Final
                    </div>
                    <div className="text-orange-500/60 text-xs">
                      Due in 2 days
                    </div>
                  </div>
                  <div className="flex gap-2 text-xs text-zinc-500 font-mono-tech">
                    <span className="px-2 py-1 bg-zinc-900 rounded">
                      #CS101
                    </span>
                    <span className="px-2 py-1 bg-zinc-900 rounded">
                      #Study
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

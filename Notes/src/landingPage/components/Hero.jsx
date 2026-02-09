import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, GitBranch, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

export default function Hero() {
  const [step, setStep] = useState(0);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const sequence = [
      { text: "search: auth flow notes", action: 1 },
      { text: "import github/issues --repo=myapp", action: 2 },
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
          timeout = setTimeout(type, 2200);
          return;
        }
        timeout = setTimeout(type, 55);
      } else if (isDeleting && charIndex >= 0) {
        setText(currentStep.text.substring(0, charIndex));
        charIndex--;
        if (charIndex === -1) {
          isDeleting = false;
          currentIndex = (currentIndex + 1) % sequence.length;
          timeout = setTimeout(type, 400);
          return;
        }
        timeout = setTimeout(type, 30);
      }
    };
    timeout = type();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a0a08]">
      {/* Background texture */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Horizontal scan lines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 3px)",
            backgroundSize: "100% 3px",
          }}
        />
        {/* Warm corner glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-amber-500/3 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pt-32 pb-20 w-full">
        {/* Status line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span
            className="text-[11px] text-zinc-600 tracking-[0.2em] uppercase"
            style={mono}
          >
            System Online · v1.0
          </span>
        </motion.div>

        {/* Main headline — asymmetric, oversized */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-end mb-20">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="block text-[clamp(3.2rem,8vw,6.5rem)] font-semibold text-zinc-100 leading-[0.95] tracking-[-0.03em]"
                style={serif}
              >
                Dev workspace
              </span>
              <span className="flex items-baseline gap-3 md:gap-5 flex-wrap mt-2">
                <span
                  className="text-[clamp(3.2rem,8vw,6.5rem)] font-semibold italic text-amber-500 leading-[0.95] tracking-[-0.03em]"
                  style={serif}
                >
                  that thinks.
                </span>
                <span
                  className="text-[clamp(1rem,1.5vw,1.2rem)] text-zinc-700"
                  style={mono}
                >
                  // RAG-powered
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-8 text-[17px] text-zinc-500 max-w-lg leading-[1.75]"
              style={serif}
            >
              Notes with AI-powered retrieval, tasks that sync with GitHub
              issues, and a calendar — fused into one system built for how
              developers actually work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <button
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-amber-500 text-[#0a0a08] text-[13px] font-bold tracking-wide hover:bg-amber-400 transition-colors"
                style={mono}
                onClick={() => navigate("/login")}
              >
                START BUILDING
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <span className="text-[11px] text-zinc-700" style={mono}>
                Free forever · No credit card
              </span>
            </motion.div>
          </div>

          {/* Right side — the command terminal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="relative"
          >
            <div className="border border-zinc-800 bg-[#0c0c0a]">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                </div>
                <span
                  className="text-[10px] text-zinc-700 tracking-wider"
                  style={mono}
                >
                  dailydeck.sh
                </span>
              </div>

              {/* Command input */}
              <div className="px-5 py-4 border-b border-zinc-800/50">
                <div className="flex items-center gap-3" style={mono}>
                  <span className="text-amber-500 text-sm">→</span>
                  <span className="text-zinc-300 text-sm">{text}</span>
                  <span className="w-2 h-5 bg-amber-500/80 animate-pulse" />
                </div>
              </div>

              {/* Output area */}
              <div className="px-5 py-5 min-h-[220px]">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="rag"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <Search className="w-3.5 h-3.5 text-amber-500" />
                        <span
                          className="text-[10px] text-amber-500 tracking-[0.15em] uppercase"
                          style={mono}
                        >
                          RAG Search · 3 results
                        </span>
                      </div>
                      <div
                        className="p-3 bg-zinc-900/50 border border-zinc-800 text-[12px]"
                        style={mono}
                      >
                        <span className="text-amber-400">notes/</span>
                        <span className="text-zinc-300">auth-refactor.md</span>
                        <p className="text-zinc-600 mt-1 text-[11px]">
                          "...switched to JWT refresh tokens with Redis session
                          store..."
                        </p>
                      </div>
                      <div
                        className="p-3 bg-zinc-900/50 border border-zinc-800 text-[12px]"
                        style={mono}
                      >
                        <span className="text-amber-400">notes/</span>
                        <span className="text-zinc-300">standup-dec-04.md</span>
                        <p className="text-zinc-600 mt-1 text-[11px]">
                          "...auth flow blocked by rate limiter config..."
                        </p>
                      </div>
                      <div
                        className="mt-2 pt-2 border-t border-zinc-800/50 text-[10px] text-zinc-700"
                        style={mono}
                      >
                        Retrieved in 42ms · Semantic match
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="github"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <GitBranch className="w-3.5 h-3.5 text-emerald-500" />
                        <span
                          className="text-[10px] text-emerald-500 tracking-[0.15em] uppercase"
                          style={mono}
                        >
                          GitHub Sync · 4 issues imported
                        </span>
                      </div>
                      {[
                        {
                          id: "#142",
                          title: "Fix auth token refresh loop",
                          label: "bug",
                          labelColor:
                            "text-red-400 border-red-500/30 bg-red-500/5",
                        },
                        {
                          id: "#138",
                          title: "Add rate limiting to API",
                          label: "feat",
                          labelColor:
                            "text-blue-400 border-blue-500/30 bg-blue-500/5",
                        },
                        {
                          id: "#135",
                          title: "Update DB indexes for search",
                          label: "perf",
                          labelColor:
                            "text-amber-400 border-amber-500/30 bg-amber-500/5",
                        },
                      ].map((issue) => (
                        <div
                          key={issue.id}
                          className="flex items-center gap-3 p-2.5 bg-zinc-900/50 border border-zinc-800"
                          style={mono}
                        >
                          <span className="text-[11px] text-zinc-600">
                            {issue.id}
                          </span>
                          <span className="text-[12px] text-zinc-300 flex-1">
                            {issue.title}
                          </span>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 border ${issue.labelColor}`}
                          >
                            {issue.label}
                          </span>
                        </div>
                      ))}
                      <div
                        className="mt-2 pt-2 border-t border-zinc-800/50 text-[10px] text-zinc-700"
                        style={mono}
                      >
                        myapp/issues · Synced just now
                      </div>
                    </motion.div>
                  )}

                  {step === 0 && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center h-[180px]"
                    >
                      <span className="text-[11px] text-zinc-800" style={mono}>
                        awaiting input...
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Depth shadows */}
            <div className="absolute -bottom-2 left-3 right-3 h-6 bg-[#09090a] border border-zinc-800/40 -z-10" />
            <div className="absolute -bottom-4 left-6 right-6 h-6 bg-[#08080a] border border-zinc-800/20 -z-20" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

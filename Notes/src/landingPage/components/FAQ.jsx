import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

const faqs = [
  {
    question: "How does AI work with my data?",
    answer:
      "DailyDeck uses retrieval-based AI (RAG). When you ask a question, the system only searches your own documents and notes to generate an answer. Your data is never used to train public models.",
  },
  {
    question: "Can I see where AI answers come from?",
    answer:
      "Yes. AI-generated answers are always grounded in your content, with references to the exact notes or documents used. You can review or ignore suggestions at any time.",
  },
  {
    question: "Does it work offline?",
    answer:
      "Yes. DailyDeck uses a local-first architecture. Your data lives on your device and syncs to the cloud only when you're online. You can write and check tasks without WiFi.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "The Personal plan is free forever and includes unlimited local notes, task management, and basic calendar sync. You only pay for advanced team collaboration features.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      id="faq"
      className="py-28 px-6 bg-[#0a0a08] border-t border-zinc-800/40"
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-amber-600/50" />
            <span
              className="text-[11px] text-amber-600/80 tracking-[0.25em] uppercase"
              style={mono}
            >
              FAQ
            </span>
          </div>
          <h2
            className="text-[clamp(2rem,4vw,3rem)] text-zinc-100 leading-[1.1] tracking-[-0.02em]"
            style={serif}
          >
            Common questions.
          </h2>
        </div>

        {/* Accordion */}
        <div>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="border-b border-zinc-800/60">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className="text-[10px] text-zinc-700 tracking-wider mt-1 shrink-0"
                      style={mono}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[16px] font-medium transition-colors duration-200 ${
                        isOpen
                          ? "text-zinc-100"
                          : "text-zinc-400 group-hover:text-zinc-200"
                      }`}
                      style={serif}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-zinc-600 ml-4 shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-10 pb-6">
                        <p
                          className="text-[15px] text-zinc-500 leading-[1.75]"
                          style={serif}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

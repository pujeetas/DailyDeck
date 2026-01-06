import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

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
      "Yes. DailyDeck uses a local-first architecture. Your data lives on your device and syncs to the cloud only when you're online. You can write code and check tasks without WiFi.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "Absolutely. The Personal plan is free forever and includes unlimited local notes, task management, and basic calendar sync. You only pay for advanced team collaboration features.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 px-6 bg-[#0a0a0a] border-t border-zinc-900">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-500">
            Clear answers about privacy, pricing, and how DailyDeck works.
          </p>
        </div>

        {/* ACCORDION */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-zinc-800 rounded-2xl bg-[#121214] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-zinc-900/50 transition-colors"
                >
                  <span className="font-medium text-zinc-200">
                    {faq.question}
                  </span>
                  <div className="text-zinc-500">
                    {isOpen ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* ANIMATED CONTENT */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-zinc-400 leading-relaxed text-sm">
                        {faq.answer}
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

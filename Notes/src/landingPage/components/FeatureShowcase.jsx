import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckSquare, FileText, ArrowUpRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06, // 60ms stagger
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function FeatureShowcase() {
  return (
    <section className="py-32 px-6 border-t border-zinc-900 relative overflow-hidden bg-[#0a0a0a]">
      {/* Decorative Background Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Three powerful tools. <br />
            <span className="text-zinc-500">One fluent workflow.</span>
          </h2>
        </motion.div>

        {/* BENTO GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* CARD 1: The Canvas (Wide) */}
          <motion.div
            variants={cardVariants}
            whileHover="hover" // Triggers children variants with "hover" key
            className="md:col-span-2 glow-card rounded-3xl p-8 relative overflow-hidden group cursor-default"
          >
            {/* Hover Lift Effect */}
            <motion.div
              className="absolute inset-0 bg-transparent"
              whileHover={{ scale: 1.01, y: -4 }}
              transition={{ duration: 0.2 }}
            />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="bg-zinc-900/80 p-3 rounded-xl border border-zinc-700">
                  <FileText className="w-6 h-6 text-orange-500" />
                </div>
                <ArrowUpRight className="text-zinc-600 group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">The Canvas</h3>
              <p className="text-zinc-400 mb-12 max-w-sm">
                Write freely. Drag tasks directly into your document or embed
                your calendar schedule inline.
              </p>
            </div>

            {/* Mock UI - Reacts to Parent Hover */}
            <motion.div
              variants={{
                hover: { x: 6, opacity: 1 },
                rest: { x: 0, opacity: 0.8 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute bottom-0 right-0 w-[85%] h-[200px] bg-[#0a0a0a] rounded-tl-2xl border-l border-t border-zinc-800 p-6"
            >
              <div className="space-y-4">
                <div className="h-2 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-2 bg-zinc-800 rounded w-1/2"></div>
                <div className="h-10 bg-blue-500/10 border border-blue-500/20 rounded-lg w-full mt-6 flex items-center px-4 gap-3 text-xs text-blue-400 font-mono-tech">
                  <Calendar className="w-3 h-3" />
                  <span>Meeting: Q3 Strategy</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* CARD 2: Calendar */}
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.01, y: -4 }}
              className="flex-1 bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden cursor-default"
            >
              <Calendar className="w-8 h-8 text-blue-200 mb-6" />
              <h3 className="text-xl font-bold mb-1">Calendar</h3>
              <p className="text-blue-100 text-sm opacity-80">
                Syncs two-way with Notes.
              </p>
            </motion.div>

            {/* CARD 3: Tasks */}
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.01, y: -4 }}
              className="flex-1 glow-card rounded-3xl p-8 relative overflow-hidden group cursor-default"
            >
              <div className="flex justify-between items-center mb-6">
                <CheckSquare className="w-8 h-8 text-emerald-500" />
                <span className="text-xs font-mono-tech text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
                  5 ACTIVE
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Tasks</h3>
              <p className="text-zinc-500 text-sm">Auto-generated from docs.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

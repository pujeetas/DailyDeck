import React, { useState } from "react";
import {
  FileText,
  Calendar,
  CheckSquare,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Hero = () => {
  const [isOrdered, setIsOrdered] = useState(false);

  return (
    <section className="relative pt-32 pb-20 px-6 bg-slate-50 min-h-screen overflow-hidden flex flex-col items-center">
      {/* Background Grid - Subtle Context */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-500 mb-6">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Interactive Demo</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Turn your chaos into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
            structured clarity.
          </span>
        </h1>

        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
          Hover over the workspace below to see how DailyDeck organizes your
          scattered thoughts instantly.
        </p>

        {/* CTA */}
        <div className="flex justify-center gap-4">
          <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-black hover:scale-105 transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* INTERACTIVE CHAOS ZONE */}
      <div
        className="relative w-full max-w-5xl h-[500px] perspective-1000"
        onMouseEnter={() => setIsOrdered(true)}
        onMouseLeave={() => setIsOrdered(false)}
      >
        {/* Visual Cue */}
        <div
          className={`absolute inset-x-0 -top-10 text-center transition-opacity duration-500 ${
            isOrdered ? "opacity-0" : "opacity-100"
          }`}
        >
          <span className="text-sm font-mono text-slate-400 animate-bounce">
            ↓ Hover to organize ↓
          </span>
        </div>

        {/* CARD 1: NOTES (Left) */}
        <div
          className={`absolute w-64 p-6 bg-white rounded-2xl shadow-lg border border-slate-100 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${
              isOrdered
                ? "left-[5%] top-10 rotate-0 scale-100 z-10 shadow-xl"
                : "left-[10%] top-20 -rotate-12 scale-95 hover:z-20"
            }`}
        >
          <div className="flex items-center gap-3 mb-4 text-orange-500">
            <FileText className="w-5 h-5" />
            <span className="font-bold text-slate-900 text-sm">Ideas.txt</span>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-slate-100 rounded w-full"></div>
            <div className="h-2 bg-slate-100 rounded w-3/4"></div>
            <div className="h-2 bg-slate-100 rounded w-5/6"></div>
          </div>
        </div>

        {/* CARD 2: TASKS (Center - Main Focus) */}
        <div
          className={`absolute w-80 p-6 bg-white rounded-2xl shadow-2xl border border-slate-100 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-75
            ${
              isOrdered
                ? "left-[50%] -translate-x-1/2 top-10 rotate-0 scale-110 z-30 ring-4 ring-slate-50"
                : "left-[40%] top-0 rotate-6 scale-100 z-10"
            }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 text-emerald-500">
              <CheckSquare className="w-5 h-5" />
              <span className="font-bold text-slate-900 text-sm">Tasks</span>
            </div>
            <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full font-medium">
              On Track
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
              <div className="w-4 h-4 border-2 border-emerald-500 rounded bg-emerald-500"></div>
              <span className="text-sm text-slate-400 line-through">
                Email investors
              </span>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition">
              <div className="w-4 h-4 border-2 border-slate-300 rounded"></div>
              <span className="text-sm text-slate-700">
                Review marketing copy
              </span>
            </div>
            <div className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition">
              <div className="w-4 h-4 border-2 border-slate-300 rounded"></div>
              <span className="text-sm text-slate-700">
                Update landing page
              </span>
            </div>
          </div>
        </div>

        {/* CARD 3: CALENDAR (Right) */}
        <div
          className={`absolute w-64 p-6 bg-white rounded-2xl shadow-lg border border-slate-100 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-100
            ${
              isOrdered
                ? "right-[5%] top-10 rotate-0 scale-100 z-10 shadow-xl"
                : "right-[15%] top-24 rotate-12 scale-95 hover:z-20"
            }`}
        >
          <div className="flex items-center gap-3 mb-4 text-blue-500">
            <Calendar className="w-5 h-5" />
            <span className="font-bold text-slate-900 text-sm">Schedule</span>
          </div>
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="w-1 rounded-full bg-blue-500 h-8"></div>
              <div>
                <div className="text-xs font-bold text-slate-700">10:00 AM</div>
                <div className="text-[10px] text-slate-400">Deep Work</div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-1 rounded-full bg-slate-200 h-8"></div>
              <div>
                <div className="text-xs font-bold text-slate-700">02:00 PM</div>
                <div className="text-[10px] text-slate-400">Team Sync</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

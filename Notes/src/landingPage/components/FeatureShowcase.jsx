import React from "react";
import {
  Calendar,
  CheckSquare,
  FileText,
  Link as LinkIcon,
} from "lucide-react";

export default function FeatureShowcase() {
  return (
    <section className="py-24 px-6 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Three powerful tools.{" "}
            <span className="text-blue-600">One fluent workflow.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Don't switch tabs. Your notes link to your calendar, and your tasks
            live inside your docs.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1: Rich Text Editor (Spans 2 columns) */}
          <div className="md:col-span-2 bg-slate-50 rounded-3xl p-8 border border-slate-100 relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                <FileText className="w-6 h-6 text-orange-500" />
              </div>
              <span className="text-sm font-medium text-slate-400">
                Rich Text Canvas
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              The Canvas
            </h3>
            <p className="text-slate-500 mb-8 max-w-sm">
              Write freely. Drag tasks directly into your document or embed your
              calendar schedule inline.
            </p>

            {/* Mock UI Element */}
            <div className="absolute bottom-0 right-0 w-[85%] h-[180px] bg-white rounded-tl-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] p-6 border-l border-t border-slate-100">
              <div className="space-y-3">
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                <div className="h-8 bg-blue-50 rounded-lg w-full mt-4 flex items-center px-3 gap-2 text-xs text-blue-600 font-medium">
                  <Calendar className="w-3 h-3" />
                  Meeting: Q3 Strategy
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN STACK */}
          <div className="flex flex-col gap-6">
            {/* CARD 2: Calendar */}
            <div className="flex-1 bg-blue-600 rounded-3xl p-6 text-white relative overflow-hidden group hover:shadow-xl hover:shadow-blue-900/20 transition-all">
              <div className="flex justify-between items-center mb-4">
                <Calendar className="w-6 h-6 text-blue-200" />
              </div>
              <h3 className="text-xl font-bold mb-1">Calendar</h3>
              <p className="text-blue-100 text-sm">Syncs two-way with Notes.</p>

              {/* Decorative Glow */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
            </div>

            {/* CARD 3: To-Do List */}
            <div className="flex-1 bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden group hover:shadow-xl hover:shadow-slate-900/20 transition-all">
              <div className="flex justify-between items-center mb-4">
                <CheckSquare className="w-6 h-6 text-emerald-400" />
                <div className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold tracking-wider text-slate-300 uppercase">
                  5 Pending
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">Tasks</h3>
              <p className="text-slate-400 text-sm">
                Auto-generated from your docs.
              </p>

              {/* Mock List */}
              <div className="mt-4 space-y-2 opacity-80">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full border border-slate-600"></div>
                  <div className="h-1.5 w-20 bg-slate-700 rounded"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <div className="h-1.5 w-12 bg-slate-600 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Tagline */}
        <div className="mt-8 flex justify-center text-slate-400 text-sm items-center gap-2">
          <LinkIcon className="w-4 h-4" />
          <span>Changes reflect across all modules instantly.</span>
        </div>
      </div>
    </section>
  );
}

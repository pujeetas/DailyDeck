import React, { useState } from "react";
import { Plus, Calendar, CheckCircle2, Zap } from "lucide-react";

const WorkflowSteps = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      icon: <Plus className="w-5 h-5" />,
      title: "Capture Ideas",
      description:
        "Don't lose a thought. Quickly jot down notes or tasks in the global inbox before you forget them.",
      // In a real app, these would be specific images for each step
      mockContent: (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Inbox
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <div className="w-4 h-4 rounded border border-slate-300"></div>
            <span>Buy groceries for dinner</span>
          </div>
          <div className="flex items-center gap-3 text-slate-700">
            <div className="w-4 h-4 rounded border border-slate-300"></div>
            <span>Draft Q3 proposal</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm pl-7">
            <Plus className="w-3 h-3" /> Add new task...
          </div>
        </div>
      ),
    },
    {
      id: 1,
      icon: <Calendar className="w-5 h-5" />,
      title: "Plan Your Day",
      description:
        "Drag tasks from your inbox onto your calendar. Time-blocking made incredibly simple.",
      mockContent: (
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex justify-between mb-4 border-b border-slate-100 pb-2">
            <span className="font-bold text-slate-800">Today</span>
            <span className="text-slate-400">Oct 24</span>
          </div>
          <div className="space-y-2">
            <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded text-sm border-l-4 border-blue-500">
              09:00 AM - Deep Work
            </div>
            <div className="bg-emerald-50 text-emerald-700 px-3 py-2 rounded text-sm border-l-4 border-emerald-500">
              11:00 AM - Team Sync
            </div>
            <div className="h-10 border-2 border-dashed border-slate-100 rounded flex items-center justify-center text-xs text-slate-400">
              Drop tasks here
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      icon: <CheckCircle2 className="w-5 h-5" />,
      title: "Execute & Focus",
      description:
        "Enter 'Focus Mode' to hide distractions. Just you and the one task that matters right now.",
      mockContent: (
        <div className="bg-slate-900 p-6 rounded-xl shadow-xl flex flex-col items-center justify-center text-center py-10">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <h4 className="text-white font-medium text-lg">Draft Q3 Proposal</h4>
          <p className="text-slate-500 text-sm mt-2">24:59 remaining</p>
        </div>
      ),
    },
  ];

  return (
    <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">
            From chaos to clarity in{" "}
            <span className="text-emerald-600">3 steps</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Clickable Steps */}
          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  activeStep === step.id
                    ? "bg-white border-slate-200 shadow-lg scale-105"
                    : "bg-transparent border-transparent hover:bg-slate-100 opacity-60 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-4 mb-2">
                  <div
                    className={`p-2 rounded-lg ${
                      activeStep === step.id
                        ? "bg-slate-900 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <h3
                    className={`text-xl font-bold ${
                      activeStep === step.id
                        ? "text-slate-900"
                        : "text-slate-600"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="text-slate-500 ml-14 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT: Dynamic Visual */}
          <div className="relative h-[400px] bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 flex items-center justify-center overflow-hidden">
            {/* Abstract Background Blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-30 -ml-10 -mb-10"></div>

            {/* The Content */}
            <div className="relative z-10 w-full max-w-sm transition-all duration-500 ease-out transform">
              {steps[activeStep].mockContent}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowSteps;

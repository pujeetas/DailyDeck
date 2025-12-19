import { Play } from "lucide-react";
import React from "react";

const GenerateControls = ({ previewSample, count, setCount }) => {
  return (
    <div className="flex items-center gap-4 mb-10 p-4 bg-slate-800 border border-slate-700 rounded-lg">
      <div className="flex-1">
        <label className="block text-sm text-slate-400 mb-1">
          Number of Records
        </label>
        <input
          type="number"
          value={count}
          min="1"
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-md text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      <button
        onClick={previewSample}
        className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition font-medium"
      >
        Preview
      </button>

      <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition font-medium">
        <Play size={18} />
        Generate
      </button>
    </div>
  );
};

export default GenerateControls;

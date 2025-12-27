import { Eye, Play } from "lucide-react";

export default function GenerateControls({
  count,
  setCount,
  onPreview,
  onGenerate,
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center bg-[#1A1F2E] border border-white/10 rounded-lg px-2 py-1">
        <span className="text-[10px] text-slate-500 uppercase font-bold mr-2">
          Rows
        </span>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="bg-transparent w-12 text-sm focus:outline-none text-indigo-400 font-mono"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={onPreview}
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-md"
        >
          <Eye size={18} />
        </button>
        <button
          onClick={onGenerate}
          className="flex items-center gap-2 bg-emerald-600/10 text-emerald-500 px-4 py-1.5 rounded-lg border border-emerald-600/20 hover:bg-emerald-600 hover:text-white transition-all text-sm font-medium"
        >
          <Play size={14} fill="currentColor" /> Run
        </button>
      </div>
    </div>
  );
}

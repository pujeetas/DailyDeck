import { Play, Eye } from "lucide-react";

export default function GenerateControls({
  count,
  setCount,
  onPreview,
  onGenerate,
}) {
  return (
    <section className="flex items-end gap-4 mb-10 bg-slate-800 border border-slate-700 rounded-lg p-4">
      <div className="flex-1">
        <label className="text-sm text-slate-400">Number of Records</label>
        <input
          type="number"
          min={1}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full mt-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded text-slate-100"
        />
      </div>

      <button
        onClick={onPreview}
        className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
      >
        <Eye size={16} />
        Preview
      </button>

      <button
        onClick={onGenerate}
        className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500"
      >
        <Play size={16} />
        Generate
      </button>
    </section>
  );
}

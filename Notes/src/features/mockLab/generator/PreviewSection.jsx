export default function PreviewSection({ data }) {
  if (!data)
    return (
      <div className="h-64 border border-dashed border-white/5 rounded-xl flex items-center justify-center text-slate-600 text-sm italic">
        Waiting for generation...
      </div>
    );

  return (
    <div className="bg-[#050505] rounded-xl border border-white/5 p-4 h-[calc(100vh-160px)] overflow-auto shadow-inner">
      <pre className="text-indigo-300 text-[13px] font-mono leading-relaxed">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default function PreviewSection({ data }) {
  const isArray = Array.isArray(data);

  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-200 mb-3">
        {isArray ? "Generated Records" : "Preview (Single Record)"}
      </h2>

      <div className="bg-black border border-slate-700 rounded-lg p-4 max-h-96 overflow-auto">
        <pre className="text-emerald-400 text-sm font-mono">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </section>
  );
}

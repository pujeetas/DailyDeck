import React from "react";

const PreviewSection = ({ previewData }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-200 mb-3">
        Preview (Single Record)
      </h2>
      <div className="bg-black border border-slate-700 rounded-lg p-4 overflow-auto max-h-72">
        <pre className="text-emerald-400 text-sm font-mono">
          {JSON.stringify(previewData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default PreviewSection;

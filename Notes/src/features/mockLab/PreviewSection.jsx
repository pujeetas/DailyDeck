import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import { message } from "antd";

export default function PreviewSection({ data }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [copied, setCopied] = useState(false);
  const isArray = Array.isArray(data);

  const downloadJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `mock-data-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    messageApi.success("JSON downloaded!");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      messageApi.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      messageApi.error("Failed to copy");
    }
  };

  return (
    <section>
      {contextHolder}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-slate-200">
          {isArray ? "Generated Records" : "Preview (Single Record)"}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-3 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </button>

          <button
            onClick={downloadJSON}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            <Download size={14} />
            Download
          </button>
        </div>
      </div>

      <div className="bg-black border border-slate-700 rounded-lg p-4 max-h-96 overflow-auto">
        <pre className="text-emerald-400 text-sm font-mono">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </section>
  );
}

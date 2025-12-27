import { Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import { message } from "antd";

export default function ExportOptions({ data }) {
  const [messageApi, contextHolder] = message.useMessage();
  const [copied, setCopied] = useState(false);

  const downloadJSON = () => {
    if (!data) {
      messageApi.error("No data to download");
      return;
    }

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

    messageApi.success("JSON downloaded successfully!");
  };

  const copyToClipboard = async () => {
    if (!data) {
      messageApi.error("No data to copy");
      return;
    }

    try {
      const jsonString = JSON.stringify(data, null, 2);
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      messageApi.success("Copied to clipboard!");

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      messageApi.error("Failed to copy");
    }
  };

  if (!data) return null;

  return (
    <>
      {contextHolder}
      <div className="flex gap-3 mb-4">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 transition-colors"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Copied!" : "Copy JSON"}
        </button>

        <button
          onClick={downloadJSON}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          <Download size={16} />
          Download JSON
        </button>
      </div>
    </>
  );
}

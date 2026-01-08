import { useState } from "react";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

export default function PreviewSection({ data }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(true);
      message.success("JSON copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      message.error("Failed to copy");
    }
  };

  // Empty State
  if (!data) {
    return (
      <div className="h-[calc(100vh-160px)] border border-dashed border-white/5 rounded-xl flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center max-w-md px-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <h3 className="text-slate-300 text-base font-medium mb-2">
            Ready to Generate
          </h3>
          <p className="text-slate-500 text-sm mb-3">
            Define your fields and click{" "}
            <span className="text-indigo-400 font-semibold">Run</span> to
            generate mock JSON data
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded font-mono">
              + Add Root Field
            </span>
            <span>→</span>
            <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded font-mono">
              ▶ Run
            </span>
          </div>
        </div>
      </div>
    );
  }

  // JSON Output with Copy Button
  return (
    <div className="relative bg-[#050505] rounded-xl border border-white/5 p-6 h-[calc(100vh-160px)] overflow-auto shadow-inner">
      {/* Header with Copy Button */}
      <div className="sticky top-0 bg-[#050505] z-10 flex items-center justify-between mb-4 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">
            Generated JSON
          </span>
          {data && Array.isArray(data) && (
            <span className="text-slate-600 text-xs">
              ({data.length} {data.length === 1 ? "record" : "records"})
            </span>
          )}
        </div>
        <Button
          size="small"
          icon={copied ? <CheckOutlined /> : <CopyOutlined />}
          onClick={handleCopy}
          className={`${
            copied
              ? "bg-green-600/20 border-green-600/50 text-green-400"
              : "bg-indigo-600/20 border-indigo-600/50 text-indigo-300 hover:bg-indigo-600/30"
          } transition-all duration-200`}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      {/* JSON Content with Syntax Highlighting */}
      <pre className="text-indigo-300 text-[13px] font-mono leading-relaxed whitespace-pre-wrap break-all">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

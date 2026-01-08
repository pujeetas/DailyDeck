import { useState } from "react";
import { message, Tooltip } from "antd";

export default function JsonParser() {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState(null);

  const handleParse = () => {
    try {
      const parsed = JSON.parse(input);
      setParsedData(parsed);
      setError(null);
      message.success("JSON parsed successfully");
    } catch (error) {
      setError(error.message);
      setParsedData(null);
      message.error("Invalid JSON");
    }
  };

  const handleClear = () => {
    setInput("");
    setParsedData(null);
    setError(null);
  };

  const handleFormat = () => {
    if (parsedData) {
      setInput(JSON.stringify(parsedData, null, 2));
      message.success("JSON formatted");
    }
  };

  const handleCopy = () => {
    if (parsedData) {
      navigator.clipboard.writeText(JSON.stringify(parsedData, null, 2));
      message.success("Copied to clipboard!");
    }
  };

  const handleMinify = () => {
    if (parsedData) {
      setInput(JSON.stringify(parsedData));
      message.success("JSON minified!");
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
      {/* Input Section */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-engineer text-lg font-semibold text-slate-200">
              Input JSON
            </h3>
          </div>
          <div className="flex gap-2">
            <Tooltip title="Beautify JSON with indentation">
              <button
                onClick={handleFormat}
                disabled={!parsedData}
                className="px-3 py-1.5 text-xs bg-indigo-600/20 border border-indigo-600/50 text-indigo-300 hover:bg-indigo-600/30 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Format
              </button>
            </Tooltip>

            <Tooltip title="Remove all whitespace">
              <button
                onClick={handleMinify}
                disabled={!parsedData}
                className="px-3 py-1.5 text-xs bg-purple-600/20 border border-purple-600/50 text-purple-300 hover:bg-purple-600/30 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Minify
              </button>
            </Tooltip>

            <Tooltip title="Reset everything">
              <button
                onClick={handleClear}
                className="px-3 py-1.5 text-xs bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-700 rounded-md transition-colors"
              >
                Clear
              </button>
            </Tooltip>

            <Tooltip title="Validate and parse JSON">
              <button
                onClick={handleParse}
                className="px-3 py-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
              >
                Parse
              </button>
            </Tooltip>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Paste your JSON here...
            Example:
            {
            "name": "John Doe",
            "age": 30,
            "email": "john@example.com"
            }'
          className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 text-slate-200 font-mono text-sm resize-none focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
        />
        {error && (
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-xs font-mono">{error}</p>
          </div>
        )}
      </div>

      {/* Output Section */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-engineer text-lg font-semibold text-slate-200">
            Parsed Output
          </h3>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-2"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy
          </button>
        </div>

        <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-xl p-6 overflow-auto">
          {parsedData ? (
            <pre className="text-indigo-300 text-sm font-mono leading-relaxed whitespace-pre-wrap">
              {JSON.stringify(parsedData, null, 2)}
            </pre>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-slate-400 text-sm mb-2">
                Paste JSON and click Parse
              </p>
              <p className="text-slate-600 text-xs">
                View formatted output with syntax highlighting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

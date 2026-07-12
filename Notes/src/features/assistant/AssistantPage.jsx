import { useRef, useState, useEffect } from "react";
import { Sparkles, Send, Wrench } from "lucide-react";
import Header from "@/components/layout/Header";
import { sendAssistantMessage } from "./assistantService";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

const SUGGESTIONS = [
  "Create a task called Fix login bug, high priority",
  "Search my notes for deployment",
  "Generate my standup for the last 2 days",
];

export default function AssistantPage() {
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError("");
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await sendAssistantMessage(trimmed, history);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
          toolCalls: data.toolCalls || [],
        },
      ]);
      setHistory(data.history || []);
    } catch (err) {
      const apiError =
        err.response?.data?.error || "Assistant is temporarily unavailable.";
      setError(apiError);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="min-h-screen bg-[#0a0a08] text-zinc-200 flex flex-col">
      <Header />

      <main className="relative z-10 max-w-3xl w-full mx-auto px-6 md:px-10 py-10 flex flex-col flex-1">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span
              className="text-[13px] text-zinc-400 tracking-[0.2em] uppercase"
              style={mono}
            >
              AI Assistant
            </span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-semibold text-zinc-100 mb-2 tracking-[-0.02em]"
            style={serif}
          >
            Tell it what to do.
          </h1>
          <p className="text-[15px] text-zinc-500 leading-[1.7]" style={serif}>
            Create tasks, search your notes, or generate a standup — in plain
            English.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-5 mb-6 min-h-[240px]">
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[13px] text-zinc-400 border border-zinc-800/60 px-3 py-2 hover:border-amber-500/40 hover:text-amber-500 transition-colors"
                  style={mono}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 ${
                  m.role === "user"
                    ? "bg-zinc-800/60 text-zinc-100"
                    : "bg-[#0c0c0a] border border-zinc-800/60 text-zinc-200"
                }`}
              >
                {m.toolCalls?.length > 0 && (
                  <div className="flex flex-col gap-1.5 mb-3">
                    {m.toolCalls.map((tc, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-[11px] text-amber-500/80 tracking-wide uppercase"
                        style={mono}
                      >
                        <Wrench className="w-3 h-3" />
                        {tc.name.replace(/_/g, " ")}
                      </div>
                    ))}
                  </div>
                )}
                <p
                  className="text-[15px] leading-[1.6] whitespace-pre-wrap"
                  style={serif}
                >
                  {m.text}
                </p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#0c0c0a] border border-zinc-800/60 px-4 py-3 text-[13px] text-zinc-500">
                <span className="animate-pulse" style={mono}>
                  Thinking…
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="text-[13px] text-red-400 border border-red-900/40 bg-red-950/20 px-4 py-3">
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t border-zinc-800/40">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the assistant to do something…"
            className="flex-1 bg-[#0c0c0a] border border-zinc-800/60 px-4 py-3 text-[15px] text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50"
            style={serif}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-5 flex items-center justify-center bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </main>
    </div>
  );
}

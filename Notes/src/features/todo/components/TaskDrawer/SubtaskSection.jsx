import { useState } from "react";
import useTodoStore from "../../store/useTodoStore";

const mono = { fontFamily: "'JetBrains Mono', monospace" };

export function SubtaskSection({ taskForm, setTaskForm }) {
  const [text, setText] = useState("");
  const { subTaskStatus } = useTodoStore();

  const add = () => {
    if (!text.trim()) return;
    const newSubtask = { id: crypto.randomUUID(), text, complete: false };
    setTaskForm({
      ...taskForm,
      subTask: [...(taskForm.subTask || []), newSubtask],
    });
    setText("");
  };

  const remove = (id) => {
    setTaskForm({
      ...taskForm,
      subTask: (taskForm.subTask || []).filter((s) => s.id !== id),
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          className="flex-1 px-3 py-2.5 bg-[#0e0e0c] border border-zinc-800 text-[13px] text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-amber-500/50 transition-colors"
          placeholder="Add subtask…"
          style={mono}
        />
        <button
          onClick={add}
          className="px-3.5 py-2.5 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-[11px] font-medium transition-colors"
          style={mono}
        >
          ADD
        </button>
      </div>
      <div className="space-y-1">
        {taskForm.subTask?.map((s) => (
          <div
            key={s.id}
            className="flex justify-between items-center bg-[#0e0e0c] border border-zinc-800 px-3 py-2 group"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={s.complete}
                onChange={() => {
                  setTaskForm({
                    ...taskForm,
                    subTask: taskForm.subTask.map((st) =>
                      st.id === s.id ? { ...st, complete: !st.complete } : st,
                    ),
                  });
                  subTaskStatus();
                }}
                className="w-3.5 h-3.5 accent-amber-500 cursor-pointer"
              />
              <span
                className={`text-[12px] ${
                  s.complete ? "text-zinc-600 line-through" : "text-zinc-300"
                }`}
                style={mono}
              >
                {s.text}
              </span>
            </div>
            <button
              onClick={() => remove(s.id)}
              className="text-zinc-700 hover:text-red-400 opacity-0 group-hover:opacity-100 transition text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

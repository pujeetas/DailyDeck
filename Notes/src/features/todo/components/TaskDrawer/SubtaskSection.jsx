import { useState } from "react";

// Subtask Section
export function SubtaskSection({ taskForm = {}, setTaskForm }) {
  const [text, setText] = useState("");

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
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          className="flex-1 px-3 py-2.5 rounded-lg bg-[#0E0E10] border border-white/10 
             text-zinc-100 placeholder-zinc-500 outline-none text-sm focus:border-neutral-500"
          placeholder="Add subtask…"
        />
        <button
          onClick={add}
          className="px-3.5 py-2.5 rounded-lg bg-zinc-800 text-zinc-100 hover:bg-zinc-700 text-xs font-medium"
        >
          Add
        </button>
      </div>
      <div className="space-y-2">
        {taskForm.subTask?.map((s) => (
          <div
            key={s.id}
            className="flex justify-between items-center bg-[#0E0E10] border border-white/10 rounded-lg px-3 py-2 group"
          >
            <span className="text-xs text-zinc-300">{s.text}</span>
            <button
              onClick={() => remove(s.id)}
              className="text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";

export default function TaskDrawer({
  open,
  onClose,
  taskForm,
  setTaskForm,
  onSubmit,
  mode = "add", // "add" or "edit"
}) {
  return (
    <div
      className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity
      ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Drawer Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md 
          bg-[#0E0E10] text-zinc-200
          border-l border-zinc-800
          transition-transform duration-300 
          ${open ? "translate-x-0" : "translate-x-full"} 
          overflow-y-auto p-6`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-zinc-100">
            {mode === "add" ? "Create Task" : "Edit Task"}
          </h2>
          <button
            className="cursor-pointer text-zinc-500 hover:text-zinc-300 text-2xl"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-xs font-medium text-zinc-400">Title</label>
            <input
              type="text"
              value={taskForm.title}
              onChange={(e) =>
                setTaskForm({ ...taskForm, title: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 rounded-md bg-zinc-900 
               border border-zinc-700 text-zinc-200 
               placeholder-zinc-500 outline-none focus:border-zinc-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium text-zinc-400">
              Description
            </label>
            <textarea
              value={taskForm.description}
              onChange={(e) =>
                setTaskForm({ ...taskForm, description: e.target.value })
              }
              rows="4"
              placeholder="Describe the task... you can add logs or code here"
              className="w-full mt-1 px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 
               text-zinc-200 placeholder-zinc-500 outline-none font-mono 
               focus:border-zinc-500"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-xs font-medium text-zinc-400">
              Priority
            </label>
            <select
              value={taskForm.priority}
              onChange={(e) =>
                setTaskForm({ ...taskForm, priority: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 
               text-zinc-200 outline-none focus:border-zinc-500"
            >
              <option value="">Select...</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-zinc-300">Status</label>
            <select
              value={taskForm.status}
              onChange={(e) =>
                setTaskForm({ ...taskForm, status: e.target.value })
              }
              className="w-full mt-1 px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 
               text-zinc-200 focus:border-zinc-500 outline-none"
            >
              <option value="">Select...</option>
              <option value="todo">Backlog</option>
              <option value="progress">In Progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>
          {/* issue date */}
          <div>
            <label className="text-xs font-medium text-zinc-400">
              Issue ID
            </label>
            <input
              type="text"
              value={taskForm.issueId || ""}
              onChange={(e) =>
                setTaskForm({ ...taskForm, issueId: e.target.value })
              }
              placeholder="e.g., GH-42, JIRA-120, BUG-21"
              className="w-full mt-1 px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 
               text-zinc-200 placeholder-zinc-500 outline-none focus:border-zinc-500"
            />
          </div>

          {/* tech stack */}
          <div>
            <label className="text-xs font-medium text-zinc-400">
              Tech Stack
            </label>
            <input
              type="text"
              value={taskForm.tech || ""}
              onChange={(e) =>
                setTaskForm({ ...taskForm, tech: e.target.value })
              }
              placeholder="e.g., React, Node, Docker"
              className="w-full mt-1 px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 
               text-zinc-200 placeholder-zinc-500 outline-none focus:border-zinc-500"
            />
            <p className="text-[10px] text-zinc-500 mt-1">
              Comma-separated tags
            </p>
          </div>

          {/* file path */}
          <div>
            <label className="text-xs font-medium text-zinc-400">
              File / Path
            </label>
            <input
              type="text"
              value={taskForm.path || ""}
              onChange={(e) =>
                setTaskForm({ ...taskForm, path: e.target.value })
              }
              placeholder="src/components/Editor/Editor.jsx"
              className="w-full mt-1 px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 
               text-zinc-200 placeholder-zinc-500 outline-none font-mono focus:border-zinc-500"
            />
          </div>

          {/* blockers */}
          <div>
            <label className="text-xs font-medium text-zinc-400">
              Blockers
            </label>
            <textarea
              value={taskForm.blockers || ""}
              onChange={(e) =>
                setTaskForm({ ...taskForm, blockers: e.target.value })
              }
              placeholder="What is blocking this task?"
              rows="2"
              className="w-full mt-1 px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 
               text-zinc-200 placeholder-zinc-500 outline-none focus:border-zinc-500"
            />
          </div>

          {/* estimated time */}
          <div>
            <label className="text-xs font-medium text-zinc-400">
              Estimated Time (hrs)
            </label>
            <input
              type="number"
              step="0.5"
              value={taskForm.estimated || ""}
              onChange={(e) =>
                setTaskForm({ ...taskForm, estimated: e.target.value })
              }
              placeholder="e.g., 1, 2.5"
              className="w-full mt-1 px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 
               text-zinc-200 placeholder-zinc-500 outline-none focus:border-zinc-500"
            />
          </div>

          {/* Subtasks */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Subtasks
            </label>

            <SubtaskSection taskForm={taskForm} setTaskForm={setTaskForm} />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 
               text-zinc-300 hover:bg-zinc-700 transition"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="cursor-pointer px-4 py-2 rounded-md bg-zinc-100 text-zinc-900 
               hover:bg-white transition font-medium"
          >
            {mode === "add" ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Subtask Section Component
function SubtaskSection({ taskForm, setTaskForm }) {
  const [text, setText] = useState("");

  const add = () => {
    if (!text.trim()) return;
    const newSubtask = {
      id: crypto.randomUUID(),
      text,
      complete: false,
    };
    setTaskForm({ ...taskForm, subTask: [...taskForm.subTask, newSubtask] });
    setText("");
  };

  const remove = (id) => {
    setTaskForm({
      ...taskForm,
      subTask: taskForm.subTask.filter((s) => s.id !== id),
    });
  };

  return (
    <div className="mt-2 space-y-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 px-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 
             text-zinc-200 placeholder-zinc-500 outline-none"
        placeholder="Add subtask..."
      />

      <button
        onClick={add}
        className="cursor-pointer px-3 py-2 rounded-md bg-zinc-100 text-zinc-900 hover:bg-white"
      >
        Add
      </button>

      {/* Subtask List */}
      <div className="space-y-1">
        {taskForm.subTask.map((s) => (
          <div
            className="flex justify-between items-center bg-zinc-900 
                border border-zinc-800 rounded px-3 py-2"
          >
            <span className="text-sm text-zinc-300">{s.text}</span>
            <button
              onClick={() => remove(s.id)}
              className="text-red-400 hover:text-red-300"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

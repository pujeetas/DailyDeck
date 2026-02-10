const mono = { fontFamily: "'JetBrains Mono', monospace" };

const FormTextarea = ({ setTaskForm, taskForm }) => {
  return (
    <div>
      <label
        className="text-[10px] text-zinc-600 uppercase tracking-[0.15em] mb-1.5 block"
        style={mono}
      >
        Description
      </label>
      <textarea
        value={taskForm.description}
        onChange={(e) =>
          setTaskForm({ ...taskForm, description: e.target.value })
        }
        rows={4}
        className="w-full px-3 py-2.5 bg-[#0e0e0c] border border-zinc-800 text-[13px] text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-amber-500/50 resize-none transition-colors"
        placeholder="Notes, debugging steps, commands, or code snippets..."
        style={mono}
      />
    </div>
  );
};

export default FormTextarea;

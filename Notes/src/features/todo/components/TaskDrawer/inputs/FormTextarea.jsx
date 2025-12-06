const FormTextarea = ({ setTaskForm, taskForm }) => {
  return (
    <div>
      <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.14em] mb-1.5 block">
        Description
      </label>
      <textarea
        value={taskForm.description}
        onChange={(e) =>
          setTaskForm({ ...taskForm, description: e.target.value })
        }
        rows={4}
        className="w-full px-3 py-2.5 rounded-lg bg-[#0E0E10] border border-white/10 
               text-zinc-100 placeholder-zinc-500 outline-none text-sm font-mono
               focus:border-neutral-500 resize-none"
        placeholder="Notes, debugging steps, commands, or code snippets..."
      />
    </div>
  );
};

export default FormTextarea;

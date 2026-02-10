import useTodoStore from "../../store/useTodoStore";

const mono = { fontFamily: "'JetBrains Mono', monospace" };

const DrawerFooter = ({ taskForm, onClose, isEdit }) => {
  const { createTodo, updateTodo } = useTodoStore((state) => state);

  async function handleCreate() {
    await createTodo(taskForm);
    onClose(false);
  }

  async function handleEdit() {
    await updateTodo(taskForm._id, taskForm);
    onClose(false);
  }

  return (
    <div className="px-6 pb-5 pt-4 border-t border-zinc-800/50 bg-[#0a0a08] flex justify-end gap-2">
      <button
        onClick={onClose}
        className="px-4 py-2.5 border border-zinc-800/60 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 text-[12px] transition-colors"
        style={mono}
      >
        CANCEL
      </button>
      <button
        onClick={() => (isEdit ? handleEdit() : handleCreate())}
        className="px-5 py-2.5 bg-amber-500 text-[#0a0a08] hover:bg-amber-400 text-[12px] font-bold tracking-wide transition-colors active:scale-[0.98]"
        style={mono}
      >
        {isEdit ? "SAVE CHANGES" : "CREATE TASK"}
      </button>
    </div>
  );
};

export default DrawerFooter;

import React from "react";

const DrawerFooter = ({ onClose, isEdit, onSubmit }) => {
  return (
    <div className="px-6 pb-5 pt-4 border-t border-white/10 bg-[#18181B] flex justify-end gap-3">
      <button
        onClick={onClose}
        className="px-4 py-2.5 rounded-lg border border-white/10 text-zinc-300 
               hover:bg-zinc-800 hover:text-zinc-100 text-sm font-medium transition"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        className="px-5 py-2.5 rounded-lg bg-indigo-500 text-white 
               hover:bg-indigo-400 text-sm font-semibold transition shadow-md shadow-indigo-500/30 active:scale-95"
      >
        {isEdit ? "Save Changes" : "Create Task"}
      </button>
    </div>
  );
};

export default DrawerFooter;

export default function DeleteNotes({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-[#262626] text-gray-200 p-6 rounded-lg w-80 border border-[#333333]">
        <p className="mb-5 text-gray-300">Delete this note?</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-[#333333] text-gray-300 rounded-md hover:bg-[#3f3f3f]"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

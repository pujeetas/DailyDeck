import { useState } from "react";
import Sidebar from "./Sidebar";
import Editor from "./Editor/Editor";
import DeleteNotes from "./Delete/DeleteNotes";
import { PanelRightClose } from "lucide-react";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isSidebarClose, setIsSidebarClose] = useState(false);

  const activeNote = notes.find((n) => n.id === activeId) || null;

  function createNew() {
    const newNote = {
      id: Date.now(),
      title: "",
      body: "",
      pinned: false,
      updatedAt: Date.now(),
    };
    setActiveId(newNote.id);
    setNotes((prev) => [newNote, ...prev]);
  }

  function saveNote(id, content) {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, body: content, updatedAt: Date.now() } : n
      )
    );
  }

  function updateTitle(id, title) {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, title, updatedAt: Date.now() } : n
      )
    );
  }

  function togglePin(id) {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  }

  function requestDelete(id) {
    setPendingDeleteId(id);
    setShowDelete(true);
  }

  function confirmDelete() {
    setNotes((prev) => prev.filter((n) => n.id !== pendingDeleteId));
    setPendingDeleteId(null);
    setShowDelete(false);
    setActiveId(null);
  }

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.updatedAt - a.updatedAt;
  });

  return (
    <div className="flex h-screen bg-[#1f1f1f]">
      {!isSidebarClose && (
        <Sidebar
          isSidebarClose={isSidebarClose}
          setIsSidebarClose={setIsSidebarClose}
          onNew={createNew}
          notes={sortedNotes}
          activeId={activeId}
          onSelect={setActiveId}
          onDelete={requestDelete}
          onPin={togglePin}
        />
      )}

      {isSidebarClose && (
        <button
          onClick={() => setIsSidebarClose(false)}
          className="absolute left-3 top-3 p-2 rounded-md bg-[#262626] border border-[#333333]"
        >
          <PanelRightClose
            size={18}
            className="rotate-180 text-gray-400 hover:text-gray-200"
          />
        </button>
      )}

      <DeleteNotes
        show={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={confirmDelete}
      />

      <div className="flex-1 overflow-auto">
        {activeId && activeNote ? (
          <Editor
            key={activeId}
            value={activeNote.body}
            onChange={(content) => saveNote(activeId, content)}
            title={activeNote.title}
            onTitleChange={(t) => updateTitle(activeId, t)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p className="text-lg">Select a note or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
}

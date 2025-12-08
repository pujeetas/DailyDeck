import { useNotes } from "./hooks/useNotes";
import Sidebar from "./Sidebar";
import Editor from "./Editor/Editor";
import debounce from "lodash.debounce";
import { useCallback } from "react";
export default function NotesPage() {
  const {
    notes,
    activeId,
    activeNote,
    newNote,
    updateNote,
    removeNote,
    pinNote,
    setActiveId,
    loadNotes,
  } = useNotes();

  const performUpdate = async (id, update) => {
    await updateNote(id, update);
    loadNotes();
  };
  const debounceUpdate = useCallback(debounce(performUpdate, 6000), []);
  return (
    <div className="flex h-screen bg-[#1f1f1f]">
      <Sidebar
        onNew={newNote}
        notes={notes}
        activeId={activeId}
        onSelect={setActiveId}
        onDelete={removeNote}
        onPin={pinNote}
      />
      <div className="flex-1 overflow-auto">
        {activeNote ? (
          <Editor
            activeId={activeId}
            value={activeNote.body}
            onChange={async (c) => {
              await debounceUpdate(activeId, c);
            }}
            title={activeNote.title}
            onTitleChange={async (t) => {
              await debounceUpdate(activeId, { title: t });
            }}
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

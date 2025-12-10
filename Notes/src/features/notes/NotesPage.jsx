import { useNotes } from "./hooks/useNotes";
import Sidebar from "./Sidebar";
import Editor from "./Editor/Editor";
import debounce from "lodash.debounce";
import { useCallback, useMemo } from "react";

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
  } = useNotes();

  // Create debounced update function with proper dependencies
  const debouncedUpdate = useMemo(
    () =>
      debounce(async (id, updates) => {
        if (!id) {
          console.error("No active note ID");
          return;
        }
        await updateNote(id, updates);
      }, 1000),
    [updateNote]
  );

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
            key={activeId}
            activeId={activeId}
            value={activeNote.body}
            onChange={(updates) => {
              debouncedUpdate(activeId, updates);
            }}
            title={activeNote.title}
            onTitleChange={(newTitle) => {
              debouncedUpdate(activeId, { title: newTitle });
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

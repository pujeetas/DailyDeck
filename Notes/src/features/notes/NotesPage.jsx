import Header from "@/components/layout/Header";
import { UI_TEXT } from "@/config/constants";
import { AntdDarkProvider } from "@/config/theme.jsx";
import useUserStore from "@/hooks/useUserStore";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo } from "react";
import DrawerPanel from "./DrawerPanel";
import Editor from "./Editor/Editor";
import { useNotes } from "./hooks/useNotes";
import Sidebar from "./Sidebar";

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
    askQuestion,
    answer,
    clearAnswer,
    isLoadingAnswer,
    ragOpen,
    setRagOpen,
  } = useNotes();

  // Derive RAG state from useNotes
  useEffect(() => {
    if (isLoadingAnswer || answer) {
      setRagOpen(true);
    }
  }, [isLoadingAnswer, answer, setRagOpen]);

  const ragQuery = answer?.question || "";
  const ragResponse = answer?.answer || "";
  const ragLoading = isLoadingAnswer;
  const ragSources =
    answer?.relevantNotes?.map((note) => ({
      id: note.id,
      title: note.title || "Untitled",
    })) || [];

  const debouncedUpdate = useMemo(
    () =>
      debounce(async (id, updates) => {
        if (!id) {
          return;
        }
        await updateNote(id, updates);
      }, 1000),
    [updateNote],
  );
  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleAskQuestion = useCallback(
    async (question) => {
      try {
        const data = await askQuestion(question);
        if (data?.aiSearches) {
          const currentUser = useUserStore.getState().user;
          useUserStore.setState({
            user: {
              ...currentUser,
              aiSearches: data.aiSearches,
            },
          });
        }
      } catch (error) {}
    },
    [askQuestion],
  );

  return (
    <div>
      <Header color={"bg-[#1f1f1f]"} />
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
              onAskQuestion={handleAskQuestion}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p className="text-lg">{UI_TEXT.NOTES_EMPTY}</p>
            </div>
          )}
        </div>
        <AntdDarkProvider>
          <DrawerPanel
            open={ragOpen}
            onClose={() => {
              clearAnswer();
              setRagOpen(false);
            }}
            ragQuery={ragQuery}
            ragResponse={ragResponse}
            ragLoading={ragLoading}
            ragSources={ragSources}
            setActiveId={setActiveId}
          />
        </AntdDarkProvider>
      </div>
    </div>
  );
}

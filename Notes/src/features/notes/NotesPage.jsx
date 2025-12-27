import { useNotes } from "./hooks/useNotes";
import Sidebar from "./Sidebar";
import Editor from "./Editor/Editor";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo } from "react";
import { ConfigProvider, theme } from "antd";
import DrawerPanel from "./DrawerPanel";
import Header from "@/components/layout/Header";

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
  }, [isLoadingAnswer, answer]);

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
          console.error("No active note ID");
          return;
        }
        await updateNote(id, updates);
      }, 1000),
    [updateNote]
  );
  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  const handleAskQuestion = useCallback(
    async (question) => {
      console.log("Asking question:", question);
      try {
        await askQuestion(question);
      } catch (error) {
        console.error("Failed to ask question:", error);
      }
    },
    [askQuestion]
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
              <p className="text-lg">Select a note or create a new one.</p>
            </div>
          )}
        </div>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorBgElevated: "#262626",
              colorBgContainer: "#262626",
              colorText: "#e5e7eb",
              colorTextSecondary: "#9ca3af",
              colorBorder: "#2f2f2f",
              colorSplit: "#2f2f2f",
              borderRadiusLG: 8,
            },
            components: {
              Drawer: {
                headerBg: "#262626",
                bodyBg: "#262626",
                footerBg: "#262626",
              },
              Input: {
                colorBgContainer: "#1f1f1f",
                colorBorder: "#333333",
                colorText: "#e5e7eb",
                colorTextPlaceholder: "#6b7280",
              },
              Button: {
                colorPrimary: "#3b82f6",
              },
            },
          }}
        >
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
        </ConfigProvider>
      </div>
    </div>
  );
}

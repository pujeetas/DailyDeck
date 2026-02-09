import { useState, useEffect, useRef } from "react";
import {
  createNote,
  getAllNotes,
  updateNoteRequest,
  deleteNoteRequest,
  question,
} from "../services/notesService";
import useUserStore from "@/hooks/useUserStore";

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const [ragOpen, setRagOpen] = useState(false);
  const isRequestInProgress = useRef(false);

  useEffect(() => {
    loadNotes();
  }, []);

  async function newNote() {
    const payload = {
      title: "",
      body: [],
      pinned: false,
    };

    try {
      const res = await createNote(payload);
      const newNoteData = res.data.note;
      setNotes((prev) => [newNoteData, ...prev]);
      setActiveId(newNoteData._id);

      const currentUser = useUserStore.getState().user;
      useUserStore.setState({
        user: {
          ...currentUser,
          totalNotes: res.data.totalNotes,
        },
      });
      return newNoteData;
    } catch (error) {
      console.error("Error creating note:", error);
    }
  }

  const loadNotes = async () => {
    try {
      const res = await getAllNotes();
      setNotes(res.data);
    } catch (error) {
      console.error("Error loading notes:", error);
    }
  };

  async function updateNote(id, update) {
    if (!id) {
      console.error("Cannot update note: no ID provided");
      return;
    }
    setNotes((prev) =>
      prev.map((n) => (n._id === id ? { ...n, ...update } : n)),
    );
    try {
      return await updateNoteRequest(id, update);
    } catch (error) {
      console.error("Error updating note:", error);

      await loadNotes();
    }
  }

  async function removeNote(id) {
    if (!id) {
      console.error("Cannot delete note: no ID provided");
      return;
    }
    try {
      const res = await deleteNoteRequest(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      if (activeId === id) {
        setActiveId(null);
      }

      const currentUser = useUserStore.getState().user;
      useUserStore.setState({
        user: {
          ...currentUser,
          totalNotes: res.data.totalNotes,
        },
      });
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  async function pinNote(id) {
    const noteToUpdate = notes.find((n) => n._id === id);
    if (!noteToUpdate) return;

    const newPinnedState = !noteToUpdate.pinned;

    // Optimistic update
    setNotes((prev) =>
      prev.map((n) => (n._id === id ? { ...n, pinned: newPinnedState } : n)),
    );

    try {
      await updateNoteRequest(id, { pinned: newPinnedState });
    } catch (error) {
      console.error("Error pinning note:", error);

      // Revert on error
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? { ...n, pinned: !newPinnedState } : n)),
      );
    }
  }

  const activeNote = notes.find((n) => n._id === activeId) || null;

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    // If both pinned or both unpinned, sort by updatedAt
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  async function askQuestion(ques) {
    if (!ques || !ques.trim()) {
      console.error("Question is empty");
      return;
    }
    if (isRequestInProgress.current) {
      setAnswer({
        question: ques,
        answer: "A question is already being processed. Please wait...",
        error: true,
        relevantNotes: [],
      });
      return;
    }

    isRequestInProgress.current = true;
    setIsLoadingAnswer(true);
    setAnswer(null);

    try {
      const response = await question(ques);
      setAnswer({
        question: response.data.question,
        answer: response.data.answer,
        relevantNotes: response.data.relevantNotes || [],
      });

      return response.data;
    } catch (error) {
      let errorMessage = "Failed to get answer. Please try again.";

      if (error.response?.status === 429) {
        errorMessage =
          "⏱️ Too many requests. Please wait 60 seconds before trying again.";
      } else if (error.response?.status === 503) {
        errorMessage =
          "🔧 AI service is under maintenance. Try again in a few minutes.";
      } else if (error.response?.status >= 500) {
        errorMessage =
          "⚠️ AI service is temporarily unavailable. Please try again later.";
      } else if (
        error.code === "ECONNABORTED" ||
        error.message?.includes("timeout")
      ) {
        errorMessage =
          "⏰ Request timed out. Your question might be too complex or the service is slow.";
      } else if (!navigator.onLine) {
        errorMessage = "📡 No internet connection. Please check your network.";
      } else if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        errorMessage = "🔒 Authentication failed. Please log in again.";
      } else {
        errorMessage = "❌ Something went wrong. Please try again.";
      }
      setAnswer({
        question: ques,
        answer: errorMessage,
        error: true,
        relevantNotes: response.data.relevantNotes,
      });
    } finally {
      setIsLoadingAnswer(false);
      isRequestInProgress.current = false;
    }
  }

  function clearAnswer() {
    setAnswer(null);
  }

  return {
    notes: sortedNotes,
    activeId,
    activeNote,
    loadNotes,
    newNote,
    updateNote,
    removeNote,
    pinNote,
    setActiveId,
    askQuestion,
    clearAnswer,
    ragOpen,
    setRagOpen,
    answer,
  };
}

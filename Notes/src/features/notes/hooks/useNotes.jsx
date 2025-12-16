import { useState, useEffect } from "react";
import {
  createNote,
  getAllNotes,
  updateNoteRequest,
  deleteNoteRequest,
  question,
} from "../services/notesService";

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const [ragOpen, setRagOpen] = useState(false);

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
      const newNoteData = res.data;
      setNotes((prev) => [newNoteData, ...prev]);
      setActiveId(newNoteData._id);
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
      prev.map((n) => (n._id === id ? { ...n, ...update } : n))
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
      await deleteNoteRequest(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      if (activeId === id) {
        setActiveId(null);
      }
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
      prev.map((n) => (n._id === id ? { ...n, pinned: newPinnedState } : n))
    );

    try {
      await updateNoteRequest(id, { pinned: newPinnedState });
    } catch (error) {
      console.error("Error pinning note:", error);

      // Revert on error
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? { ...n, pinned: !newPinnedState } : n))
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
      console.error("Error getting ques:", error);
      setAnswer({
        error: error.message || "Failed to get answer",
      });
    } finally {
      setIsLoadingAnswer(false);
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

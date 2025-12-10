import { useState, useEffect } from "react";
import {
  createNote,
  getAllNotes,
  updateNoteRequest,
  deleteNoteRequest,
} from "../services/notesService";

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);

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
    setNotes((prev) =>
      prev.map((n) => (n._id === id ? { ...n, ...update } : n))
    );
    try {
      return await updateNoteRequest(id, update);
    } catch (error) {
      console.error("Error updating note:", error);
      // Revert optimistic update on error
      await loadNotes();
    }
  }

  async function removeNote(id) {
    try {
      await deleteNoteRequest(id);
      setNotes((prev) => prev.filter((n) => n._id !== id)); // Fixed: was n.id, should be n._id
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
    setNotes(
      (prev) =>
        prev.map((n) => (n._id === id ? { ...n, pinned: newPinnedState } : n)) // Fixed: was n.id, should be n._id
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
  };
}

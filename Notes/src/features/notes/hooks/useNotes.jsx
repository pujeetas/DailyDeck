import { useState } from "react";
import {
  createNote,
  getAllNotes,
  updateNoteRequest,
} from "../services/notesService";
import { useEffect } from "react";

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

    const res = await createNote(payload);
    setNotes((prev) => [res.data, ...prev]);
    setActiveId(res.data?._id);
  }

  //get all notes
  const loadNotes = async () => {
    const res = await getAllNotes();
    setNotes(res.data);
  };

  async function updateNote(id, update) {
    console.log(update);
    return updateNoteRequest(id, update);
  }

  function removeNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setActiveId(null);
  }

  function pinNote(id) {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  }

  const activeNote = notes.find((n) => n._id === activeId) || null;

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.updatedAt - a.updatedAt;
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

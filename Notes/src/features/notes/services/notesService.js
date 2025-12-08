import axios from "axios";

export const createNote = (payload) =>
  axios.post("http://localhost:3000/createNote", payload);

export const getAllNotes = () => axios.get("http://localhost:3000/getAllNotes");

export const updateNoteRequest = (id, updates) =>
  axios.patch(`http://localhost:3000/updateNote/${id}`, updates);

export const deleteNoteRequest = (id) =>
  axios.delete(`http://localhost:3000/deleteNote/${id}`);

import axios from "axios";

export const createNote = (payload) =>
  axios.post("http://localhost:3000/createNote", payload);

export const getAllNotes = () => axios.get("http://localhost:3000/getAllNotes");

export const updateNoteRequest = (id, updates) => {
  if (!id || id === "undefined") {
    console.error("Invalid note ID:", id);
    return Promise.reject(new Error("Invalid note ID"));
  }
  return axios.patch(`http://localhost:3000/updateNote/${id}`, updates);
};

export const deleteNoteRequest = (id) => {
  if (!id || id === "undefined") {
    console.error("Invalid note ID:", id);
    return Promise.reject(new Error("Invalid note ID"));
  }
  return axios.delete(`http://localhost:3000/deleteNote/${id}`);
};

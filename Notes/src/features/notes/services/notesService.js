import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const isValidId = (id) => {
  return id && id !== "undefined" && id !== "null";
};

export const createNote = (payload) => api.post("/createNote", payload);

export const getAllNotes = () => api.get("/getAllNotes");

export const updateNoteRequest = (id, updates) => {
  if (!isValidId(id)) {
    console.error("Invalid note ID:", id);
    return Promise.reject(new Error("Invalid note ID"));
  }
  return api.patch(`/updateNote/${id}`, updates);
};

export const deleteNoteRequest = (id) => {
  if (!isValidId(id)) {
    console.error("Invalid note ID:", id);
    return Promise.reject(new Error("Invalid note ID"));
  }
  return api.delete(`/deleteNote/${id}`);
};

export const question = (questionText) => {
  if (!questionText || !questionText.trim()) {
    return Promise.reject(new Error("Question cannot be empty"));
  }
  return api.post("/question", {
    question: questionText.trim(),
  });
};

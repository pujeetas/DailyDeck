const express = require("express");
const {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getQuestion,
} = require("../controller/notesController");
const auth = require("../middleware/authMiddleware");
const notesRoute = express.Router();

notesRoute.post("/createNote", auth, createNote);

notesRoute.get("/getAllNotes", auth, getAllNotes);

notesRoute.patch("/updateNote/:id", auth, updateNote);

notesRoute.delete("/deleteNote/:id", auth, deleteNote);

notesRoute.post("/question", auth, getQuestion);

module.exports = notesRoute;

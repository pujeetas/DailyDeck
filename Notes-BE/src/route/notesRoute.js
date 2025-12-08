const express = require("express");
const {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
} = require("../controller/notesController");
const notesRoute = express.Router();

notesRoute.post("/createNote", createNote);

notesRoute.get("/getAllNotes", getAllNotes);

notesRoute.patch("/updateNote/:id", updateNote);

notesRoute.delete("/deleteNote/:id", deleteNote);

module.exports = notesRoute;

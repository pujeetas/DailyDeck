const express = require("express");
const {
  createNote,
  getAllNotes,
  updateNote,
} = require("../controller/notesController");
const notesRoute = express.Router();

notesRoute.post("/createNote", createNote);

notesRoute.get("/getAllNotes", getAllNotes);

notesRoute.patch("/updateNote/:id", updateNote);

module.exports = notesRoute;

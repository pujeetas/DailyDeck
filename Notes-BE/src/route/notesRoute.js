import express from "express";

import {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getQuestion,
} from "../controller/notesController.js";

import { auth } from "../middleware/authMiddleware.js";
import { questionLimiter } from "../middleware/questionLimiter.js";
import { updateUserStreak } from "../middleware/updateUserStreak.js";
export const notesRoute = express.Router();

notesRoute.post("/createNote", auth, updateUserStreak, createNote);

notesRoute.get("/getAllNotes", auth, getAllNotes);

notesRoute.patch("/updateNote/:id", auth, updateUserStreak, updateNote);

notesRoute.delete("/deleteNote/:id", auth, deleteNote);

notesRoute.post("/question", auth, questionLimiter, getQuestion);

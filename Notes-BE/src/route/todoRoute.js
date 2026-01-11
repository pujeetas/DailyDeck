import express from "express";

import {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodo,
  bulkUnfocus,
  getGitDetails,
} from "../controller/todoController.js";

import { auth } from "../middleware/authMiddleware.js";
import { updateUserStreak } from "../middleware/updateUserStreak.js";
export const todoRoute = express.Router();

todoRoute.post("/createTodo", auth, updateUserStreak, createTodo);
todoRoute.patch("/updateTodo/:id", auth, updateUserStreak, updateTodo);
todoRoute.delete("/deleteTodo/:id", auth, deleteTodo);
todoRoute.get("/getAllTodo", auth, getAllTodo);
todoRoute.patch("/bulkUnfocus", auth, bulkUnfocus);
todoRoute.post("/getGitDetails", auth, getGitDetails);

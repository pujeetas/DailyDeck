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
export const todoRoute = express.Router();

todoRoute.post("/createTodo", auth, createTodo);
todoRoute.patch("/updateTodo/:id", auth, updateTodo);
todoRoute.delete("/deleteTodo/:id", auth, deleteTodo);
todoRoute.get("/getAllTodo", auth, getAllTodo);
todoRoute.patch("/bulkUnfocus", auth, bulkUnfocus);
todoRoute.post("/getGitDetails", auth, getGitDetails);

const express = require("express");
const {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodo,
  bulkUnfocus,
  getGitDetails,
} = require("../controller/todoController");
const auth = require("../middleware/authMiddleware");

const todoRoute = express.Router();

todoRoute.post("/createTodo", auth, createTodo);
todoRoute.patch("/updateTodo/:id", auth, updateTodo);
todoRoute.delete("/deleteTodo/:id", auth, deleteTodo);
todoRoute.get("/getAllTodo", auth, getAllTodo);
todoRoute.patch("/bulkUnfocus", auth, bulkUnfocus);
todoRoute.post("/getGitDetails", auth, getGitDetails);

module.exports = todoRoute;

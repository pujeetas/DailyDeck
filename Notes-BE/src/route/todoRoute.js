const express = require("express");
const {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodo,
  bulkUnfocus,
  getGitDetails,
} = require("../controller/todoController");

const todoRoute = express.Router();

todoRoute.post("/createTodo", createTodo);
todoRoute.patch("/updateTodo/:id", updateTodo);
todoRoute.delete("/deleteTodo/:id", deleteTodo);
todoRoute.get("/getAllTodo", getAllTodo);
todoRoute.patch("/bulkUnfocus", bulkUnfocus);
todoRoute.post("/getGitDetails", getGitDetails);

module.exports = todoRoute;

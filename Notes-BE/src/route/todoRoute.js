const express = require("express");
const {
  createTodo,
  updateTodo,
  deleteTodo,
  getAllTodo,
  bulkUnfocus,
} = require("../controller/todoController");
const { bulkSave } = require("../schema/todoSchema");

const todoRoute = express.Router();

todoRoute.post("/createTodo", createTodo);
todoRoute.patch("/updateTodo/:id", updateTodo);
todoRoute.delete("/deleteTodo/:id", deleteTodo);
todoRoute.get("/getAllTodo", getAllTodo);
todoRoute.patch("/bulkUnfocus", bulkUnfocus);

module.exports = todoRoute;

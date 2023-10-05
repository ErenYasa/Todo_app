import express from "express";
import {
  createTodo,
  deleteTodo,
  deleteAll,
  getTodo,
  getAll,
  getTodos,
  updateTodo,
  updateAll,
  getFilteredTodos,
  getTodosFromSearch,
} from "../controllers/todo-controller";

const route = express.Router();

route.get("/todo/:id", getTodo);

// route.get("/todos", getAll);

route.get("/todos", getTodos);

route.post("/todo", createTodo);

route.put("/todo/:id", updateTodo);

route.delete("/todo/:id", deleteTodo);

route.delete("/todos", deleteAll);

route.get("/filtered-todos", getFilteredTodos);

route.get("/search-todo", getTodosFromSearch);

route.get("/todos-update", updateAll);

export default route;

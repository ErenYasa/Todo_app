import express from "express";
import {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAll,
  updateAll,
} from "../controllers/todo-controller";

const route = express.Router();

route.get("/todo/:id", getTodo);

route.get("/todos", getTodos);

route.post("/todo", createTodo);

route.put("/todo/:id", updateTodo);

route.delete("/todo/:id", deleteTodo);

route.delete("/todos", deleteAll);

route.get("/todos-update", updateAll);

export default route;

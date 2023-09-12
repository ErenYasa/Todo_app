import express from "express";
import {
  createTodo,
  deleteTodo,
  deleteAll,
  getTodo,
  getAll,
  updateTodo,
} from "../controllers/todo-controller";

const route = express.Router();

route.get("/todo/:id", getTodo);

route.get("/todos", getAll);

route.post("/todo", createTodo);

route.put("/todo/:id", updateTodo);

route.delete("/todo/:id", deleteTodo);

route.delete("/todos", deleteAll);

export default route;

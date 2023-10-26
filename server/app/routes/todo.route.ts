import express from "express";
import {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAll,
  updateAll,
} from "../controllers/todo.controller";
import { isAuth } from "../middleware/auth.middleware";

const route = express.Router();

route.get("/todo/:id", isAuth, getTodo);

route.get("/todos", isAuth, getTodos);

route.post("/todo", isAuth, createTodo);

route.put("/todo/:id", isAuth, updateTodo);

route.delete("/todo/:id", isAuth, deleteTodo);

route.delete("/todos", isAuth, deleteAll);

route.get("/todos-update", isAuth, updateAll);

export default route;

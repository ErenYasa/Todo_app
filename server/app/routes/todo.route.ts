import express from "express";
import {
  get,
  getAll,
  create,
  update,
  _delete,
  deleteAll,
  updateAll,
} from "../controllers/todo.controller";
import { isAuth } from "../middleware/auth/auth.middleware";

const route = express.Router();

route.get("/todo/:id", isAuth, get);

route.get("/todos", isAuth, getAll);

route.post("/todo", isAuth, create);

route.put("/todo/:id", isAuth, update);

route.delete("/todo/:id", isAuth, _delete);

route.delete("/todos", isAuth, deleteAll);

route.get("/todos-update", isAuth, updateAll);

export default route;

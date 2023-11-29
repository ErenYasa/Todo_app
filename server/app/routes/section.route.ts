import express from "express";
import { isAuth } from "../middleware/auth/auth.middleware";
import { _delete, create, get, getAll, update } from "../controllers/section.controller";

const router = express.Router();

router.get("/:id", isAuth, get);

router.get("/:userId", isAuth, getAll);

router.post("/", isAuth, create);

router.put("/:id", isAuth, update);

router.delete("/:id", isAuth, _delete);

export default router;

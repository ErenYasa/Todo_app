import express from "express";
import {
  login,
  register,
  logout,
  refreshToken,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.post("/refresh-token", refreshToken);

export default router;

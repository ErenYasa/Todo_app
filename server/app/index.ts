"use strict";

import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import todoRoute from "./routes/todo-route";

const app = express();

dotenv.config();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  const d = new Date();

  const healthCheck = {
    uptime: process.uptime(),
    message: "OK",
    time:
      ("0" + d.getUTCHours()).slice(-2) +
      ":" +
      ("0" + d.getUTCMinutes()).slice(-2) +
      ":" +
      ("0" + d.getUTCSeconds()).slice(-2),
  };

  try {
    res.send(healthCheck);
  } catch (error: any) {
    healthCheck.message = error;
    res.status(503).send();
  }
});

app.use("/api", todoRoute);

app.listen(process.env.PORT, () => {
  console.log(`*****SERVER RUNNING ON PORT: ${process.env.PORT}*****`);
});

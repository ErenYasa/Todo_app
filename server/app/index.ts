"use strict";

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { db } from "./config/db";
import todoRoute from "./routes/todo.route";
import authRoute from "./routes/auth.route";
import workspaceRoute from "./routes/workSpace.route";

const app = express();

/* DB OPERATIONS */
let dbStatus: string | number;
const checkDbStatus = (status: number) => {
  if (status === 1) dbStatus = "OK";
  else if (status === 2) dbStatus = "DOWN";
  else dbStatus = status;
};

db(checkDbStatus);
/*  */

dotenv.config();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  const d = new Date();

  const healthCheck = {
    uptime: process.uptime(),
    status: "OK",
    time:
      ("0" + d.getUTCHours()).slice(-2) +
      ":" +
      ("0" + d.getUTCMinutes()).slice(-2) +
      ":" +
      ("0" + d.getUTCSeconds()).slice(-2),
    infos: {
      mongoose: {
        status: dbStatus,
      },
    },
  };

  try {
    res.send(healthCheck);
  } catch (error: any) {
    healthCheck.status = error;
    res.status(503).send();
  }
});

/* ROUTES */
app.use("/api/auth", authRoute);
app.use("/api", todoRoute);
app.use("/api/workspace", workspaceRoute);
/*  */

app.listen(process.env.PORT, () => {
  console.log(`*****SERVER RUNNING ON PORT: ${process.env.PORT}*****`);
});

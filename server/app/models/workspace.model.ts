import mongoose, { Schema } from "mongoose";
import { IWorkspace } from "../types";

const workspaceSchema = new mongoose.Schema<IWorkspace>(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, required: true },
    order: { type: Number },
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const WorkspaceModel = mongoose.model("WorkspaceModel", workspaceSchema);

export default WorkspaceModel;

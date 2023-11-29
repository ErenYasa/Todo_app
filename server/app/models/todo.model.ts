import mongoose, { Schema } from "mongoose";
import { FilterStatus, ITodo, Priority } from "../types";

const todoSchema = new mongoose.Schema<ITodo>(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, trim: true, default: "" },
    status: {
      type: Number,
      enum: FilterStatus,
      default: FilterStatus.INCOMPLETE,
    },
    priority: {
      type: Number,
      enum: Priority,
      default: Priority.LOW,
    },
    order: { type: Number, default: 0 },
    deletedAt: { type: Date, default: null },
    sectionId: { type: Schema.Types.ObjectId, required: true },
    workspaceId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("TodoModel", todoSchema);

export default TodoModel;

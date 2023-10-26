import mongoose from "mongoose";
import { FilterStatus, ITodo, Priority } from "../types";

const todoSchema = new mongoose.Schema<ITodo>(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, trim: true, default: "" },
    status: {
      type: Number,
      default: FilterStatus.INCOMPLETE,
    },
    deletedAt: { type: Date, default: null },
    priority: {
      type: Number,
      required: true,
      default: Priority.LOW,
      enum: Priority,
    },
    sectionId: { type: Number, required: true },
    workSpaceId: { type: Number, required: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("TodoModel", todoSchema);

export default TodoModel;

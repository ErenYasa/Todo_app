import mongoose from "mongoose";
import { FilterStatus, ITodo } from "../types";

const todoSchema = new mongoose.Schema<ITodo>(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, trim: true, default: "" },
    status: {
      type: Number,
      default: FilterStatus.INCOMPLETE,
    },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("TodoModel", todoSchema);

export default TodoModel;

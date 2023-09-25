import mongoose, { InferSchemaType } from "mongoose";
import dayjs from "dayjs";
import "dayjs/locale/tr";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, trim: true },
    status: {
      type: String,
      default: "incomplete",
    },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("TodoModel", todoSchema);

export default TodoModel;

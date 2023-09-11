import mongoose from "mongoose";
import dayjs from "dayjs";
import "dayjs/locale/tr";

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  desc: { type: String, trim: true },
  date: {
    type: Date,
    default: dayjs(),
  },
});

const TodoModel = mongoose.model("TodoModel", todoSchema);

export default TodoModel;

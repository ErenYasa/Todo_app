import mongoose from "mongoose";
import { ISection } from "../types";

const sectionSchema = new mongoose.Schema<ISection>(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    order: { type: Number, required: true, default: 0 },
    todosId: { type: Array, default: [] },
  },
  { timestamps: true }
);

const sectionModel = mongoose.model("SectionModel", sectionSchema);

export default sectionModel;

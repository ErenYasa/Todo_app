import mongoose, { Schema } from "mongoose";
import { ISection } from "../types";

const sectionSchema = new mongoose.Schema<ISection>(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    order: { type: Number, required: true },
    workspaceId: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const sectionModel = mongoose.model("SectionModel", sectionSchema);

export default sectionModel;

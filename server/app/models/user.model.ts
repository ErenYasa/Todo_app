import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IUser, IWorkspace } from "../types";

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;

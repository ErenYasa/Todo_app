import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { IUser, IWorkSpace } from "../types";

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    workSpaces: {
      type: Array,
      required: false,
      default: [
        {
          id: uuidv4() as unknown as string,
          name: "Default",
          color: "#0000FF",
          order: 0,
          sectionIds: [],
        },
      ] as IWorkSpace[],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;

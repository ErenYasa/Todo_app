import mongoose, { Mongoose } from "mongoose";
import { IUser } from "../types";

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
          name: "Default",
          color: "#0000FF",
          order: 0,
          sectionIds: [],
        },
      ],
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UserModel", userSchema);

export default UserModel;

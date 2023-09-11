import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const db = (cb: Function) => {
  mongoose
    .connect(process.env.DB_URL!)
    .then(() => {
      console.log("*****DATABASE IS OPERATIONAL****");
      cb(mongoose.connection.readyState);
    })
    .catch((err) => console.log(err));
};

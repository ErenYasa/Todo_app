import mongoose from "mongoose";
import { IRefreshToken } from "../types";

const refreshTokenSchema = new mongoose.Schema<IRefreshToken>(
  {
    token: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    expires: { type: Date, expires: 30 * 24 * 60 * 60 * 1000 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const RefreshTokenModel = mongoose.model(
  "RefreshTokenModel",
  refreshTokenSchema
);

export default RefreshTokenModel;

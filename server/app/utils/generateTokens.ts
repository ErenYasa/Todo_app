import jwt from "jsonwebtoken";
import RefreshTokenModel from "../models/refreshToken.model";
import { IUser } from "../types/index";
import { ErrorResponse } from "../responses/response.error";
import { errorMessages, errorTypes } from "../config/errorTypes";

const generateTokens = async (user: IUser) => {
  try {
    const payload = { id: user.id, email: user.email };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY!, {
      algorithm: "HS512",
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION!,
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY!, {
      algorithm: "HS512",
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION!,
    });

    await RefreshTokenModel.deleteOne({ userId: user.id });
    await RefreshTokenModel.create({ userId: user.id, token: refreshToken });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);

    return new ErrorResponse(
      errorTypes.SERVER_ERROR,
      errorMessages.TOKENS_GENERATING_ERROR
    );
  }
};

export default generateTokens;

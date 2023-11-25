import jwt from "jsonwebtoken";
import RefreshTokenModel from "../models/refreshToken.model";
import { ErrorResponse } from "../responses/response.error";
import { errorTypes } from "../config/errorTypes";

const verifyRefreshToken = async (
  refreshToken: string
): Promise<ErrorResponse | { tokenDetails: any }> => {
  try {
    const existToken = await RefreshTokenModel.findOne({ token: refreshToken });

    if (!existToken) {
      return new ErrorResponse(
        errorTypes.REFRESH_TOKEN_INVALID.code,
        errorTypes.REFRESH_TOKEN_INVALID.message
      );
    }

    const tokenDetails = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY!
    );

    return { tokenDetails };
  } catch (error) {
    console.error(error);

    return new ErrorResponse(
      errorTypes.REFRESH_TOKEN_ERROR.code,
      errorTypes.REFRESH_TOKEN_ERROR.message
    );
  }
};

export default verifyRefreshToken;

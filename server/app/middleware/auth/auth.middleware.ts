import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../responses/response.error";
import { errorMessages, errorTypes } from "../../config/errorTypes";
import jwt from "jsonwebtoken";
import UserModel from "../../models/user.model";
import { decodedAccessToken } from "./defs";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(404)
        .send(
          new ErrorResponse(
            errorTypes.AUTH_MIDDLEWARE_ERROR,
            errorMessages.NOT_EXIST_ACCESS_TOKEN
          )
        );
    }

    const decodedAccessToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY!
    ) as decodedAccessToken;

    if (!decodedAccessToken) {
      return res
        .status(401)
        .send(
          new ErrorResponse(
            errorTypes.AUTH_MIDDLEWARE_ERROR,
            errorMessages.ACCESS_TOKEN_INVALID
          )
        );
    }

    const userInfo = await UserModel.findOne({
      email: decodedAccessToken.email,
    }).select("_id email");

    if (!userInfo) {
      return res
        .status(404)
        .send(
          new ErrorResponse(
            errorTypes.AUTH_MIDDLEWARE_ERROR,
            errorMessages.NOT_EXIST_USER
          )
        );
    }

    req.user = userInfo;
    next();
  } catch (error) {
    console.error(error);

    return res
      .status(401)
      .send(
        new ErrorResponse(errorTypes.AUTH_MIDDLEWARE_ERROR, error as string)
      );
  }
};

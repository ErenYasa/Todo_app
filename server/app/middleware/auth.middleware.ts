import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../responses/response.error";
import { errorTypes } from "../config/errorTypes";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

type decodedAccessTokenType = {
  email: string;
  iat: number;
  exp: number;
};

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send(
          new ErrorResponse(
            errorTypes.SERVER_ERROR,
            "geçersiz oturum, lütfen giriş yapın"
          )
        );
    }

    const decodedaccessToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as decodedAccessTokenType;

    if (!decodedaccessToken) {
      return res
        .status(401)
        .send(
          new ErrorResponse(
            errorTypes.SERVER_ERROR,
            "geçersiz oturum, lütfen giriş yapın"
          )
        );
    }

    const userInfo = await UserModel.findOne({
      email: decodedaccessToken.email,
    }).select("_id email");

    if (!userInfo) {
      return res
        .status(404)
        .send(new ErrorResponse(errorTypes.SERVER_ERROR, "user yok"));
    }

    req.user = userInfo;
    next();
  } catch (error) {
    console.error(error);

    return res
      .status(404)
      .send(
        new ErrorResponse(
          errorTypes.SERVER_ERROR,
          "geçersiz oturum, lütfen giriş yapın"
        )
      );
  }
};

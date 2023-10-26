import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../responses/ErrorResponse";
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    if (!decoded) {
      return res
        .status(401)
        .send(
          new ErrorResponse(
            errorTypes.SERVER_ERROR,
            "geçersiz oturum, lütfen giriş yapın"
          )
        );
    }

    const userInfo = await UserModel.findOne({ email: decoded }).select(
      "_id email"
    );

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

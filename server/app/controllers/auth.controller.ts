import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { ErrorResponse } from "../responses/response.error";
import { errorTypes } from "../config/errorTypes";
import { SuccessResponse } from "../responses/response.success";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const userCheck = await UserModel.findOne({ email });

    if (userCheck) {
      return res
        .status(404)
        .send(new ErrorResponse(errorTypes.SERVER_ERROR, "exist already user"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(201).send(
      new SuccessResponse({
        result: true,
      })
    );
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.SERVER_ERROR, error.message as string)
      );
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const existUser = await UserModel.findOne({ email });

    if (!existUser) {
      return res
        .status(404)
        .send(new ErrorResponse(errorTypes.SERVER_ERROR, "not exist user"));
    }

    const verifiedPassword = await bcrypt.compare(password, existUser.password);

    if (!verifiedPassword) {
      return res
        .status(404)
        .send(new ErrorResponse(errorTypes.SERVER_ERROR, "bigiler yanışke"));
    }

    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET_KEY!, {
      algorithm: "HS512",
      expiresIn: "5d",
    });

    res.status(200).send(
      new SuccessResponse({
        result: {
          email: existUser.email,
          firstName: existUser.firstName,
          lastName: existUser.lastName,
          workSpaces: existUser.workSpaces,
          accessToken,
        },
      })
    );
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.SERVER_ERROR, error.message as string)
      );
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res.status(200).send(new SuccessResponse({ result: true }));
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.SERVER_ERROR, error.message as string)
      );
  }
}

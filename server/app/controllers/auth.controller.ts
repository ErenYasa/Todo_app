import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { ErrorResponse } from "../responses/response.error";
import { errorMessages, errorTypes } from "../config/errorTypes";
import { SuccessResponse } from "../responses/response.success";
import bcrypt from "bcrypt";
import verifyRefreshToken from "../utils/verifyRefreshToken";
import generateTokens from "../utils/generateTokens";
import workspaceModel from "../models/workspace.model";

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const userCheck = await UserModel.findOne({ email });

    if (userCheck) {
      return res
        .status(404)
        .send(
          new ErrorResponse(errorTypes.AUTH_ERROR, errorMessages.EXIST_USER)
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

    /* CREATE A WORKSPACE AS DEFAULT */
    await workspaceModel.create({
      name: "Default Workspace",
      color: "#000000",
      order: 0,
      userId: createdUser._id,
      sectionIds: [],
    });
    /*  */

    res.status(201).send(
      new SuccessResponse({
        result: true,
      })
    );
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(new ErrorResponse(errorTypes.AUTH_ERROR, error.message as string));
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const existUser = await UserModel.findOne({ email });

    if (!existUser) {
      return res
        .status(404)
        .send(
          new ErrorResponse(errorTypes.AUTH_ERROR, errorMessages.NOT_EXIST_USER)
        );
    }

    const verifiedPassword = await bcrypt.compare(password, existUser.password);

    if (!verifiedPassword) {
      return res
        .status(404)
        .send(
          new ErrorResponse(
            errorTypes.AUTH_ERROR,
            errorMessages.INVALID_PASSWORD
          )
        );
    }

    const { accessToken, refreshToken } = (await generateTokens(
      existUser
    )) as any;

    res.status(200).send(
      new SuccessResponse({
        result: {
          id: existUser._id,
          email: existUser.email,
          firstName: existUser.firstName,
          lastName: existUser.lastName,
          accessToken,
          refreshToken,
        },
      })
    );
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(new ErrorResponse(errorTypes.AUTH_ERROR, error.message as string));
  }
}

export async function logout(req: Request, res: Response) {
  try {
    res.status(200).send(new SuccessResponse({ result: true }));
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(new ErrorResponse(errorTypes.AUTH_ERROR, error.message as string));
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .send(
          new ErrorResponse(
            errorTypes.REFRESH_TOKEN_ERROR,
            errorMessages.REFRESH_TOKEN_INVALID
          )
        );
    }

    const { tokenDetails } = (await verifyRefreshToken(token)) as any;

    const { accessToken, refreshToken } = (await generateTokens(
      tokenDetails
    )) as any;

    res.status(201).send(
      new SuccessResponse({
        result: {
          access_token: accessToken,
          refresh_token: refreshToken,
        },
      })
    );
  } catch (error: any) {
    console.log(error);

    return res
      .status(401)
      .send(
        new ErrorResponse(
          errorTypes.REFRESH_TOKEN_ERROR,
          error.message as string
        )
      );
  }
}

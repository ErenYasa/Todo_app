import { Request, Response } from "express";
import UserModel from "../models/user.model";
import { ErrorResponse } from "../responses/response.error";
import { errorTypes } from "../config/errorTypes";
import { SuccessResponse } from "../responses/response.success";

export async function createUser(req: Request, res: Response) {
  try {
    const newUser = await UserModel.create(req.body);

    res.status(201).send(
      new SuccessResponse({
        result: {
          newUser,
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

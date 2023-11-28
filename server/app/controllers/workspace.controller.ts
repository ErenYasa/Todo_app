import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { ErrorResponse } from "../responses/response.error";
import { errorMessages, errorTypes } from "../config/errorTypes";
import UserModel from "../models/user.model";
import { SuccessResponse } from "../responses/response.success";
import workspaceModel from "../models/workspace.model";

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const existWorkspace = await workspaceModel.findById(id);

    if (existWorkspace === null) {
      return res
        .status(500)
        .send(
          new ErrorResponse(
            errorTypes.WORKSPACE_ERROR,
            errorMessages.NOT_EXIST_SECTION
          )
        );
    }

    res.send(
      new SuccessResponse({
        result: {
          id: existWorkspace.id,
          name: existWorkspace.name,
          color: existWorkspace.color,
          order: existWorkspace.order,
        },
      })
    );
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.WORKSPACE_ERROR, error.message as string)
      );
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const userRelatedWorkspaces = await workspaceModel.find({ userId });

    if (!userRelatedWorkspaces) {
      return res
        .status(500)
        .send(
          new ErrorResponse(
            errorTypes.WORKSPACE_ERROR,
            errorMessages.USER_HAS_NO_WORKSPACE
          )
        );
    }

    res.send(
      new SuccessResponse({
        result: userRelatedWorkspaces,
      })
    );
  } catch (error: any) {
    console.log(error);

    res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.WORKSPACE_ERROR, error.message as string)
      );
  }
}

export async function create(req: Request, res: Response) {
  try {
    const relevantUser = await UserModel.findOne({ _id: req.body.userId });

    if (!relevantUser) {
      return res
        .status(500)
        .send(
          new ErrorResponse(
            errorTypes.WORKSPACE_ERROR,
            errorMessages.NOT_EXIST_USER
          )
        );
    }

    const newWorkspace = workspaceModel.create(req.body);

    res.send(
      new SuccessResponse({
        result: newWorkspace,
      })
    );
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.WORKSPACE_ERROR, error.message as string)
      );
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedWorkspace = await workspaceModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // This is used to return the updated document
    );

    if (updatedWorkspace === null) {
      return res
        .status(500)
        .send(
          new ErrorResponse(
            errorTypes.WORKSPACE_ERROR,
            errorMessages.NOT_EXIST_WORKSPACE
          )
        );
    }

    res.send(
      new SuccessResponse({
        result: {
          id: updatedWorkspace.id,
          name: updatedWorkspace.name,
          color: updatedWorkspace.color,
          order: updatedWorkspace.order,
        },
      })
    );
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.WORKSPACE_ERROR, error.message as string)
      );
  }
}

export async function _delete(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const workspaceToBeDeleted = await workspaceModel.findByIdAndRemove(id);

    if (workspaceToBeDeleted === null) {
      return res
        .status(500)
        .json(
          new ErrorResponse(
            errorTypes.WORKSPACE_ERROR,
            errorMessages.NOT_EXIST_USER
          )
        );
    }

    res.send(new SuccessResponse({ result: true }));
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.WORKSPACE_ERROR, error.message as string)
      );
  }
}
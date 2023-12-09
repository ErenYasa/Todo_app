import { Request, Response } from "express";
import UserModel from "../models/user.model";
import SectionModel from "../models/section.model";
import { ErrorResponse } from "../responses/response.error";
import { SuccessResponse } from "../responses/response.success";
import { errorMessages, errorTypes } from "../config/errorTypes";
import TodoModel from "../models/todo.model";
import { ITodo } from "../types";

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const existSection = await SectionModel.findById(id);

    if (existSection === null) {
      return res
        .status(500)
        .send(
          new ErrorResponse(
            errorTypes.SECTION_ERROR,
            errorMessages.NOT_EXIST_SECTION
          )
        );
    }

    res.send(
      new SuccessResponse({
        result: {
          name: existSection.name,
          color: existSection.color,
          order: existSection.order,
          workspaceId: existSection.workspaceId,
          userId: existSection.userId,
        },
      })
    );
  } catch (error: any) {
    console.error(error);

    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.SECTION_ERROR, error.message as string)
      );
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const userRelatedSections = await SectionModel.find({ userId });

    if (!userRelatedSections) {
      return res
        .status(500)
        .send(
          new ErrorResponse(
            errorTypes.SECTION_ERROR,
            errorMessages.USER_HAS_NO_SECTION
          )
        );
    }

    res.send(
      new SuccessResponse({
        result: userRelatedSections,
      })
    );
  } catch (error: any) {
    console.error(error);

    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.SECTION_ERROR, error.message as string)
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
            errorTypes.SECTION_ERROR,
            errorMessages.NOT_EXIST_USER
          )
        );
    }

    const newSection = await SectionModel.create(req.body);

    res.send(
      new SuccessResponse({
        result: newSection,
      })
    );
  } catch (error: any) {
    console.error(error);

    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.SECTION_ERROR, error.message as string)
      );
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updatedSection = await SectionModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // This is used to return the updated document;
    );

    if (updatedSection === null) {
      return res
        .status(500)
        .send(
          new ErrorResponse(
            errorTypes.SECTION_ERROR,
            errorMessages.NOT_EXIST_SECTION
          )
        );
    }

    res.send(
      new SuccessResponse({
        result: {
          name: updatedSection.name,
          color: updatedSection.color,
        },
      })
    );
  } catch (error: any) {
    console.error(error);

    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.SECTION_ERROR, error.message as string)
      );
  }
}

export async function _delete(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const sectionToBeDeleted = await SectionModel.findByIdAndDelete(id);

    if (sectionToBeDeleted === null) {
      return res
        .status(500)
        .send(
          new ErrorResponse(
            errorTypes.SECTION_ERROR,
            errorMessages.NOT_EXIST_SECTION
          )
        );
    }

    /* Delete all owned todos */
    await TodoModel.deleteMany({ sectionId: id });
    /*  */

    res.send(
      new SuccessResponse({
        result: true,
      })
    );
  } catch (error: any) {
    console.error(error);

    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.SECTION_ERROR, error.message as string)
      );
  }
}

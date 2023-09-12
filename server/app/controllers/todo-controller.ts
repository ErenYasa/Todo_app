import { Request, Response } from "express";
import TodoModel from "../models/todo-model";
import { ErrorResponse } from "../responses/ErrorResponse";
import { SuccessResponse } from "../responses/SuccessResponse";
import { errorTypes } from "../config/errorTypes";

export async function getTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const existTodo = await TodoModel.findById(id);

    if (existTodo === null) {
      return res
        .status(500)
        .send(new ErrorResponse(errorTypes.DOESNOT_EXIST_TODO));
    }

    res.send(
      new SuccessResponse({
        result: {
          id: existTodo!.id,
          title: existTodo!.title,
          desc: existTodo!.desc,
          date: existTodo!.date,
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

export async function getAll(req: Request, res: Response) {
  try {
    const all = await TodoModel.find();

    res.send(
      new SuccessResponse({
        result: all.map((eachTodo) => eachTodo),
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

export async function createTodo(req: Request, res: Response) {
  try {
    const newTodo = await TodoModel.create(req.body);

    res.status(201).send(
      new SuccessResponse({
        result: {
          id: newTodo.id,
          title: newTodo.title,
          desc: newTodo.desc,
          date: newTodo.date,
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

export async function updateTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const existTodo = await TodoModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (existTodo === null) {
      return res
        .status(500)
        .send(new ErrorResponse(errorTypes.DOESNOT_EXIST_TODO));
    }

    res.send(
      new SuccessResponse({
        result: {
          id: existTodo!.id,
          title: existTodo!.title,
          desc: existTodo!.desc,
          date: existTodo!.date,
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

export async function deleteTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const existTodo = await TodoModel.findByIdAndRemove(id);

    if (existTodo === null) {
      return res
        .status(500)
        .send(new ErrorResponse(errorTypes.DOESNOT_EXIST_TODO));
    }

    res.send(
      new SuccessResponse({
        result: {
          id: existTodo!.id,
          title: existTodo!.title,
          desc: existTodo!.desc,
          date: existTodo!.date,
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

export async function deleteAll(req: Request, res: Response) {
  try {
    const all = await TodoModel.deleteMany({});

    res.send(new SuccessResponse({ result: all }));
  } catch (error: any) {
    console.log(error);
    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.SERVER_ERROR, error.message as string)
      );
  }
}

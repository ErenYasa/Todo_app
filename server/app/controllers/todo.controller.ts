import { Request, Response } from "express";
import Fuse from "fuse.js";
import TodoModel from "../models/todo.model";
import { ErrorResponse } from "../responses/response.error";
import { SuccessResponse } from "../responses/response.success";
import { errorMessages, errorTypes } from "../config/errorTypes";
import { FilterStatus } from "../types";

export async function get(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const existTodo = await TodoModel.findById(id);

    if (existTodo === null) {
      return res
        .status(500)
        .send(
          new ErrorResponse(
            errorTypes.TODO_ERROR,
            errorMessages.DOESNOT_EXIST_TODO
          )
        );
    }

    res.send(
      new SuccessResponse({
        result: {
          id: existTodo._id,
          title: existTodo.title,
          desc: existTodo.desc,
          status: existTodo.status,
          priority: existTodo.priority,
          order: existTodo.order,
          sectionId: existTodo.sectionId,
          workspaceId: existTodo.workspaceId,
          userId: existTodo.userId,
          createdAt: existTodo.createdAt,
          updatedAt: existTodo.updatedAt,
          deletedAt: existTodo.deletedAt,
        },
      })
    );
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(new ErrorResponse(errorTypes.TODO_ERROR, error.message as string));
  }
}

export async function getAll(req: Request, res: Response) {
  try {
    const { q, status } = req.query;
    let todos;
    let searchResult;

    if (q) {
      const allTodo = await TodoModel.find();
      const options = {
        keys: ["title"],
        includeScore: true,
        threshold: 0.3,
        shouldSort: true,
      };

      const fuse = new Fuse(allTodo, options);
      searchResult = fuse.search(q as string);

      if (searchResult) {
        return res.send(
          new SuccessResponse({ result: searchResult.map((sr) => sr.item) })
        );
      }
    } else {
      if (Number(status) === FilterStatus.ALL) {
        todos = await TodoModel.find();
      } else {
        todos = await TodoModel.find({ status });
      }

      res.send(new SuccessResponse({ result: todos }));
    }
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(new ErrorResponse(errorTypes.TODO_ERROR, error.message as string));
  }
}

export async function create(req: Request, res: Response) {
  try {
    const newTodo = await TodoModel.create(req.body);

    res.status(201).send(
      new SuccessResponse({
        result: {
          id: newTodo._id,
          title: newTodo.title,
          desc: newTodo.desc,
          status: newTodo.status,
          priority: newTodo.priority,
          order: newTodo.order,
          sectionId: newTodo.sectionId,
          workspaceId: newTodo.workspaceId,
          userId: newTodo.userId,
          createdAt: newTodo.createdAt,
        },
      })
    );
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(new ErrorResponse(errorTypes.TODO_ERROR, error.message as string));
  }
}

export async function update(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const existTodo = await TodoModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (existTodo === null) {
      return res
        .status(500)
        .send(
          new ErrorResponse(
            errorTypes.TODO_ERROR,
            errorMessages.DOESNOT_EXIST_TODO
          )
        );
    }

    res.send(
      new SuccessResponse({
        result: {
          id: existTodo.id,
          title: existTodo.title,
          desc: existTodo.desc,
          status: existTodo.status,
          priority: existTodo.priority,
          order: existTodo.order,
          sectionId: existTodo.sectionId,
          workspaceId: existTodo.workspaceId,
          userId: existTodo.userId,
          createdAt: existTodo.createdAt,
          updatedAt: existTodo.updatedAt,
          deletedAt: existTodo.deletedAt,
        },
      })
    );
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(new ErrorResponse(errorTypes.TODO_ERROR, error.message as string));
  }
}

export async function _delete(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const existTodo = await TodoModel.findByIdAndRemove(id);

    if (existTodo === null) {
      return res
        .status(500)
        .send(
          new ErrorResponse(
            errorTypes.TODO_ERROR,
            errorMessages.DOESNOT_EXIST_TODO
          )
        );
    }

    res.send(new SuccessResponse({ result: true }));
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(new ErrorResponse(errorTypes.TODO_ERROR, error.message as string));
  }
}

export async function deleteAll(req: Request, res: Response) {
  try {
    await TodoModel.deleteMany();

    res.send(new SuccessResponse({ result: true }));
  } catch (error: any) {
    console.log(error);

    return res
      .status(404)
      .send(new ErrorResponse(errorTypes.TODO_ERROR, error.message as string));
  }
}

export async function updateAll(req: Request, res: Response) {
  try {
    const all = await TodoModel.find();

    all.forEach((todo) => {
      todo.status = FilterStatus.INCOMPLETE;

      todo
        .save()
        .then((updateTodo) => {
          console.log("Güncelleme başarılı:", updateTodo);
        })
        .catch((err) => {
          console.error("Güncelleme hatası:", err);
        });
    });
    res.send(new SuccessResponse({ result: true }));
  } catch (error: any) {
    return res
      .status(404)
      .send(new ErrorResponse(errorTypes.TODO_ERROR, error.message as string));
  }
}

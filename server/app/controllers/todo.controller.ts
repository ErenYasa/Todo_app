import { Request, Response } from "express";
import Fuse from "fuse.js";
import TodoModel from "../models/todo.model";
import { ErrorResponse } from "../responses/response.error";
import { SuccessResponse } from "../responses/response.success";
import { errorTypes } from "../config/errorTypes";
import { FilterStatus, ITodo } from "../types";

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
          id: existTodo.id,
          title: existTodo.title,
          desc: existTodo.desc,
          status: existTodo.status,
          createdAt: existTodo.createdAt,
          updatedAt: existTodo.updatedAt,
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

export async function getTodos(req: Request, res: Response) {
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
          id: existTodo.id,
          title: existTodo.title,
          desc: existTodo.desc,
          status: existTodo.status,
          updatedAt: existTodo.updatedAt,
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

    res.send(new SuccessResponse({ result: true }));
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
    await TodoModel.deleteMany();

    res.send(new SuccessResponse({ result: true }));
  } catch (error: any) {
    console.log(error);
    return res
      .status(404)
      .send(
        new ErrorResponse(errorTypes.SERVER_ERROR, error.message as string)
      );
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
      .send(
        new ErrorResponse(errorTypes.SERVER_ERROR, error.message as string)
      );
  }
}

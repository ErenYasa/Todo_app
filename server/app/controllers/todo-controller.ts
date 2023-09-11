import { Request, Response } from "express";
import TodoModel from "../models/todo-model";

export function getTodo(req: Request, res: Response) {
  try {
  } catch (error) {}
}

export function getAll(req: Request, res: Response) {
  try {
  } catch (error) {}
}

export async function createTodo(req: Request, res: Response) {
  try {
    const newTodo = await TodoModel.create(req.body);

    res.status(201).json(newTodo);
  } catch (error: any) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
}

export function updateTodo(req: Request, res: Response) {
  try {
  } catch (error) {}
}

export function deleteTodo(req: Request, res: Response) {
  try {
  } catch (error) {}
}

export function deleteAll(req: Request, res: Response) {
  try {
  } catch (error) {}
}

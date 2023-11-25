import { Schema } from "mongoose";

/**
 * INTERFACES
 */

export interface IUser {
  id?: Schema.Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  workSpaces?: IWorkSpace[];
}

export interface IWorkSpace {
  id: number;
  name: string;
  color: string;
  order: number;
  sectionIds: number[];
}

export interface ISection {
  name: string;
  color: string;
  order: number;
  todosId?: string[];
}

export interface ITodo {
  title: string;
  desc?: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  priority: number;
  sectionId?: string;
  workSpaceId?: string;
  order: number;
}

export interface IRefreshToken {
  token: string;
  userId: Schema.Types.ObjectId;
  expires: Date;
}

/*  */

/**
 * ENUMS
 */

export enum FilterStatus {
  INCOMPLETE = 0,
  COMPLETED = 1,
  ALL = 2,
}

export enum Priority {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
  URGENT = 3,
}

/*  */

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

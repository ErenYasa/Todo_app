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
}

export interface IWorkspace {
  name: string;
  color: string;
  order?: number;
  userId: Schema.Types.ObjectId;
}

export interface ISection {
  name: string;
  color: string;
  order: number;
  workspaceId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
}

export interface ITodo {
  title: string;
  desc?: string;
  status?: FilterStatus;
  priority?: Priority;
  order?: number;
  sectionId: Schema.Types.ObjectId;
  workspaceId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
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

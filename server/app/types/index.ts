export interface ITodo {
  title: string;
  desc?: string;
  status?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  priority?: number;
  sectionId?: string;
  workSpaceId?: string;
  order?: number;
}

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

export interface IWorkSpace {
  name: string;
  todos: [];
}

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  workSpaces?: IWorkSpace[];
}

export interface ISection {
  name: string;
  color: string;
  order: number;
  todosId?: string[];
}

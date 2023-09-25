export enum StatusType {
  COMPLETED = 'completed',
  INCOMPLETE = 'incomplete',
}

export interface ITodo {
  id: string;
  title: string;
  desc: string;
  status: StatusType;
}

export interface ITodoResponse extends ITodo {
  createdAt: Date;
  updatedAt: Date;
}

export type ITodosResponse = ITodoResponse[];

export interface ITodoUpdateRequest {
  id: string;
  body: ITodo;
}

export interface IDeleteAllResponse {
  acknowledged: boolean;
  deletedCount: string;
}

import { FilterStatus } from '@/types/global';

export interface ITodo {
  _id: string;
  title: string;
  desc: string;
  status: number;
}

export interface ITodoRequest {
  title?: string;
  status?: FilterStatus;
  q?: string;
}

export interface ITodoResponse extends ITodo {
  createdAt: Date;
  updatedAt: Date;
}

export type ITodosResponse = ITodoResponse[];

export interface ITodoUpdateRequest {
  _id: string;
  body: {
    title?: string;
    desc?: string;
    status?: number;
  };
}

export interface ITodoUpdateStatusRequest {
  _id: string;
  body: {
    status: number;
  };
}

export interface IDeleteAllResponse {
  acknowledged: boolean;
  deletedCount: string;
}

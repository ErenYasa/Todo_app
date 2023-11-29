import { FilterStatus, ITodo } from '@/types/global';

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
  body: Omit<ITodo, 'title' | 'desc' | 'status' | 'priority' | 'order' | 'sectionId' | 'deletedAt'>;
}

export interface ITodoUpdateStatusRequest {
  _id: string;
  body: Pick<ITodo, 'status'>;
}

export interface IDeleteAllResponse {
  acknowledged: boolean;
  deletedCount: string;
}

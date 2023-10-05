export interface ITodo {
  title: string;
  desc?: string;
  status?: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum FilterStatus {
  INCOMPLETE = 0,
  COMPLETED = 1,
  ALL = 2,
}

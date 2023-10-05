import { FilterStatus } from '@/types/global';
import { ITodosResponse } from '../../services/todo/interfaces/api.interface';

export interface IAppState {
  [x: string]: any;
  mobileView: boolean;
  localLoader: boolean;
  todos: ITodosResponse;
  todoCount: number;
  filterStatus: FilterStatus;
}

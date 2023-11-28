import { FilterStatus } from '@/types/global';
import { ITodosResponse } from '../../services/todo/defs/api.interface';

export interface IAppState {
  [x: string]: any;
  mobileView: boolean;
  localLoader: boolean;
  todos: ITodosResponse;
  filterStatus: FilterStatus;
  searchQuery: string;
}

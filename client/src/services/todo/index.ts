import { baseApi } from '..';
import { toast } from 'react-toastify';
import { FilterStatus } from '@/types/global';
import { ISuccessResponse } from '../defs';
import { ITodosResponse, ITodoRequest, ITodoResponse, ITodoUpdateRequest, ITodo } from './defs/api.interface';

export const todoService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodo: builder.query<ITodoResponse, string>({
      query: (id) => ({
        url: `todo/${id}`,
        responseHandler: async (response: Response) => {
          const json = await response.json();
          return json;
        },
      }),
    }),
    getTodos: builder.query<ITodosResponse, ITodoRequest>({
      query: ({ q, status = 2 }) => {
        const queryParams = new URLSearchParams();

        if (q) {
          queryParams.append('q', q);
          status = FilterStatus.ALL;
        }

        queryParams.append('status', status.toString());

        return {
          url: `todos?${queryParams.toString()}`,
        };
      },
      providesTags: ['Todos'],
      transformResponse: (response: ISuccessResponse<ITodosResponse>) => response.data.result,
    }),
    createTodo: builder.mutation<ITodoResponse, ITodoRequest>({
      query: (body) => ({
        url: 'todo',
        method: 'POST',
        body,
        responseHandler: async (response: Response) => {
          const json = await response.json();
          return json;
        },
      }),
      onQueryStarted(_arg, { queryFulfilled }) {
        queryFulfilled.then(() => {
          toast.success('Todo created successfully');
        });
      },
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation<ITodo, ITodoUpdateRequest>({
      query: ({ _id, body }) => ({
        url: `todo/${_id}`,
        method: 'PUT',
        body,
      }),
      onQueryStarted(_arg, { queryFulfilled }) {
        queryFulfilled.then(() => {
          toast.success('Todo updated successfully');
        });
      },
      invalidatesTags: ['Todos'],
      transformResponse: (response: ISuccessResponse<ITodo>) => response.data.result,
    }),
    deleteTodo: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `todo/${id}`,
        method: 'DELETE',
      }),
      onQueryStarted(_arg, { queryFulfilled }) {
        queryFulfilled.then(() => {
          toast.success('Todo deleted successfully');
        });
      },
      invalidatesTags: ['Todos'],
      transformResponse: (response: ISuccessResponse<boolean>) => response.data.result,
    }),
    deleteAll: builder.mutation<boolean, any>({
      query: () => ({
        url: 'todos',
        method: 'DELETE',
        responseHandler: async (response: Response) => {
          const json = await response.json();
          return json;
        },
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTodoQuery,
  useLazyGetTodoQuery,
  useGetTodosQuery,
  useLazyGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteAllMutation,
  useDeleteTodoMutation,
} = todoService;

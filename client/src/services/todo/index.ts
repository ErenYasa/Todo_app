import { getEnv } from '@helpers/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodosResponse, ITodoRequest, ITodoResponse, ITodoUpdateRequest, ITodo } from './interfaces/api.interface';
import { ISuccessResponse } from './interfaces';
import { FilterStatus } from '@/types/global';
import { toast } from 'react-toastify';

const setBaseUrl = () => {
  if (getEnv() === 'DEV') return 'http://localhost:8080/api/';
  return 'https://mern-todo-app-service.onrender.com/api/';
};

export const todoService = createApi({
  reducerPath: 'todoService',
  baseQuery: fetchBaseQuery({ baseUrl: setBaseUrl() }),
  tagTypes: ['Todos'],
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

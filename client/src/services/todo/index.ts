import { getEnv } from '@helpers/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodosResponse, ITodoRequest, ITodoResponse, ITodoUpdateRequest, ITodo } from './interfaces/api.interface';
import { ISuccessResponse } from './interfaces';
import { FilterStatus } from '@/types/global';

const setBaseUrl = () => {
  if (getEnv() === 'DEV') return 'http://localhost:8080/api/';
  return '';
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
      query: ({ q, status }) => {
        const query = () => (q ? `q=${q}&` : '');
        if (q) status = FilterStatus.ALL;

        return {
          url: `todos?${query()}status=${status}`,
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
      invalidatesTags: ['Todos'],
    }),
    updateTodo: builder.mutation<ITodo, ITodoUpdateRequest>({
      query: ({ _id, body }) => ({
        url: `todo/${_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Todos'],
      transformResponse: (response: ISuccessResponse<ITodo>) => response.data.result,
    }),
    deleteTodo: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `todo/${id}`,
        method: 'DELETE',
      }),
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

import { getEnv } from '@helpers/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodosResponse, ITodoRequest, ITodoResponse, ITodoUpdateRequest, ITodo } from './interfaces/api.interface';
import { ISuccessResponse } from './interfaces';
import { setTodoCount } from '@/store/slices/app.slice';

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
    getAll: builder.query<ITodosResponse, any>({
      query: () => ({
        url: 'todos',
      }),
      providesTags: ['Todos'],
      transformResponse: (response: ISuccessResponse<ITodosResponse>) => response.data.result,
    }),
    getTodos: builder.query<ITodosResponse, 0 | 1 | 2>({
      query: (status = 2) => ({
        url: `todos?status=${status}`,
      }),
      providesTags: ['Todos'],
      transformResponse: (response: ISuccessResponse<ITodosResponse>) => response.data.result,
      onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled.then(({ data }) => {
          dispatch(setTodoCount(data.length));
        });
      },
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
    getFilteredTodos: builder.query<ITodosResponse, number>({
      query: (status) => ({
        url: `filtered-todos?status=${status}`,
      }),
      transformResponse: (response: ISuccessResponse<ITodosResponse>) => response.data.result,
    }),
    getTodosFromSearch: builder.query<ITodosResponse, string>({
      query: (q) => ({
        url: `search-todo?q=${q}`,
      }),
      transformResponse: (response: ISuccessResponse<ITodosResponse>) => response.data.result,
    }),
  }),
});

export const {
  useGetTodoQuery,
  useLazyGetTodoQuery,
  useCreateTodoMutation,
  useDeleteAllMutation,
  useDeleteTodoMutation,
  useGetAllQuery,
  useLazyGetAllQuery,
  useGetTodosQuery,
  useLazyGetTodosQuery,
  useUpdateTodoMutation,
  useGetFilteredTodosQuery,
  useLazyGetFilteredTodosQuery,
  useGetTodosFromSearchQuery,
  useLazyGetTodosFromSearchQuery,
} = todoService;

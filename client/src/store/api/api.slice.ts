import { getEnv } from '@helpers/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodosResponse, ITodo, ITodoResponse, ITodoUpdateRequest } from './interfaces/api.interface';

const setBaseUrl = () => {
  if (getEnv() === 'DEV') return 'http://localhost:8080/api/';
  return '';
};

export const apiSlice = createApi({
  reducerPath: 'api',
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
        responseHandler: async (response: Response) => {
          const json = await response.json();
          return json;
        },
      }),
      providesTags: ['Todos'],
    }),
    createTodo: builder.mutation<ITodoResponse, ITodo>({
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
    updateTodo: builder.mutation<boolean, ITodoUpdateRequest>({
      query: ({ body, id }) => ({
        url: `todo/${id}`,
        method: 'PUT',
        body,
        responseHandler: async (response: Response) => {
          const json = await response.json();
          return json;
        },
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `todo/${id}`,
        method: 'DELETE',
        responseHandler: async (response: Response) => {
          const json = await response.json();
          return json;
        },
      }),
      invalidatesTags: ['Todos'],
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

export const { useGetTodoQuery, useLazyGetTodoQuery } = apiSlice;

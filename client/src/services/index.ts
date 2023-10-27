import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './helper';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['Todos'],
  endpoints: () => ({}),
});

import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './helper';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Todos'],
  endpoints: () => ({}),
});

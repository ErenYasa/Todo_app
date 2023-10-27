import { getEnv } from '@/helpers';
import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import Cookies from 'js-cookie';

const setBaseUrl = () => {
  if (getEnv() === 'DEV') return 'http://localhost:8080/api/';
  return 'https://mern-todo-app-service.onrender.com/api/';
};

export const baseQuery = fetchBaseQuery({
  baseUrl: setBaseUrl(),
  credentials: 'same-origin',
  prepareHeaders: (headers) => {
    const accessToken = Cookies.get('access_token');

    if (accessToken) headers.set('authorization', `Bearer ${accessToken}`);

    return headers;
  },
});

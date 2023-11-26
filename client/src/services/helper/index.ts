import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import { Mutex } from 'async-mutex';
import Cookies from 'js-cookie';
import { getEnv } from '@/helpers';
import { clearTokens, setIsLoggedIn, setTokens } from '@/store/slices/auth.slice';

const mutex = new Mutex();

const setBaseUrl = () => {
  if (getEnv() === 'DEV') return 'http://localhost:8080/api/';
  return 'https://mern-todo-app-service.onrender.com/api/';
};

export const baseQuery = fetchBaseQuery({
  baseUrl: setBaseUrl(),
  credentials: 'same-origin',
  prepareHeaders: (headers, { endpoint }) => {
    const accessToken = Cookies.get(`${process.env.APP_NAME}_access_token`);
    const refreshToken = Cookies.get(`${process.env.APP_NAME}_refresh_token`);

    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }

    if (endpoint === 'auth/refresh-token') {
      headers.set('authorization', `Bearer ${refreshToken}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        if (Cookies.get(`${process.env.APP_NAME}_refresh_token`)) {
          const refreshResult = (await baseQuery(
            {
              url: 'auth/refresh-token',
              method: 'POST',
            },
            { ...api, endpoint: 'auth/refresh-token' },
            extraOptions,
          )) as any;
          if (refreshResult.error?.status !== 401) {
            api.dispatch(setTokens(refreshResult.data.data.result));

            result = await baseQuery(args, api, extraOptions);
          } else {
            api.dispatch(clearTokens(''));
          }
        } else {
          api.dispatch(setIsLoggedIn(false));
          api.dispatch(clearTokens(''));
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

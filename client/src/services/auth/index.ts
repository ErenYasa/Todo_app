import { toast } from 'react-toastify';
import { baseApi } from '..';
import { ISuccessResponse } from '../interfaces';
import { ILoginRequest, ILoginResponse, IRegisterRequest } from './interfaces';
import { clearTokens, setIsLoggedIn, setTokens } from '@/store/slices/auth.slice';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<boolean, IRegisterRequest>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ISuccessResponse<boolean>) => response.data.result,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => {
          toast.success("You've been registered successfully");
          dispatch(authApi.endpoints.login.initiate({ email: _arg.email, password: _arg.password }));
        });
      },
    }),
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: ISuccessResponse<ILoginResponse>) => response.data.result,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled.then((res) => {
          dispatch(setTokens({ access_token: res.data.accessToken }));
          dispatch(setIsLoggedIn(true));
        });
      },
    }),
    logout: builder.query<boolean, any>({
      query: () => ({
        url: 'auth/logout',
      }),
      transformResponse: (response: ISuccessResponse<boolean>) => response.data.result,
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled.then(() => {
          dispatch(clearTokens());
          dispatch(authApi.util.resetApiState());
        });
      },
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation, useLogoutQuery, useLazyLogoutQuery } = authApi;

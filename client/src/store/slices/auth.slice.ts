import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { IAuthState } from '../interfaces/auth.slice.interface';
import { IUser } from '@/types/global';

const initialState: IAuthState = {
  isLoggedIn: !!Cookies.get('access_token'),
  user: null,
  access_token: '',
  refresh_token: '',
};

export const AuthSlice: Slice<IAuthState> = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setTokens: (state, { payload }: PayloadAction<any>) => {
      state.access_token = payload.access_token;
      state.refresh_token = payload.refresh_token;

      Cookies.set('access_token', payload.access_token);
      Cookies.set('refresh_token', payload.refresh_token);
    },
    clearTokens: (state) => {
      state.isLoggedIn = false;

      const tokens = ['access_token', 'refresh_token'];
      tokens.forEach((token) => {
        state[token] = '';
        Cookies.remove(token);
      });
    },
    setIsLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoggedIn = payload;
    },
    setUserInfo: (state, { payload }: PayloadAction<IUser>) => {
      state.user = {
        id: payload.id,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
      };
    },
  },
});

export const { setTokens, clearTokens, setIsLoggedIn, setUserInfo } = AuthSlice.actions;

export default AuthSlice.reducer;

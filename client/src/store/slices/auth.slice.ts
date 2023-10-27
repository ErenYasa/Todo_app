import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { IAuthState } from '../interfaces/auth.slice.interface';
import Cookies from 'js-cookie';

const initialState: IAuthState = {
  isLoggedIn: !!Cookies.get('access_token'),
  user: null,
  access_token: null,
};

export const AuthSlice: Slice<IAuthState> = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setTokens: (state, { payload }: PayloadAction<any>) => {
      state.access_token = payload.access_token;
      Cookies.set('access_token', payload.access_token);
    },
    clearTokens: (state) => {
      state.isLoggedIn = false;
      
      const tokens = ['access_token'];
      tokens.forEach((token) => {
        state[token] = '';
        Cookies.remove(token);
      });
    },
    setIsLoggedIn: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoggedIn = payload;
    },
  },
});

export const { setTokens, clearTokens, setIsLoggedIn } = AuthSlice.actions;

export default AuthSlice.reducer;

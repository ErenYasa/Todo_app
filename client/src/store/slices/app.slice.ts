import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, Slice } from '@reduxjs/toolkit';
import { IAppState } from '../interfaces/app.slice.interface';

const initialState: IAppState = {
  mobileView: window.innerWidth < 768,
};

export const appSlice: Slice<IAppState> = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setMobileView: (state, { payload }: PayloadAction<boolean>) => {
      state.mobileView = payload;
    },
  },
});

export const { setMobileView } = appSlice.actions;

export default appSlice.reducer;

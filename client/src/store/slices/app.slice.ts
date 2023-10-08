import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, Slice } from '@reduxjs/toolkit';
import { IAppState } from '../interfaces/app.slice.interface';

const initialState: IAppState = {
  mobileView: window.innerWidth < 768,
  localLoader: false,
  appLoader: false,
  todos: [],
  filterStatus: 2,
  searchQuery: '',
};

export const appSlice: Slice<IAppState> = createSlice({
  name: 'App',
  initialState,
  reducers: {
    setMobileView: (state, { payload }: PayloadAction<boolean>) => {
      state.mobileView = payload;
    },
    setLocalLoader: (state, { payload }: PayloadAction<boolean>) => {
      state.localLoader = payload;
    },
    setAppLoader: (state, { payload }: PayloadAction<boolean>) => {
      state.localLoader = payload;
    },
    setTodos: (state, { payload }: PayloadAction<[]>) => {
      state.todos = payload;
    },
    setFilterStatus: (state, { payload }: PayloadAction<number>) => {
      state.filterStatus = payload;
    },
    setSearchQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
    },
  },
});

export const { setMobileView, setLocalLoader, setAppLoader, setTodos, setFilterStatus, setSearchQuery } =
  appSlice.actions;

export default appSlice.reducer;

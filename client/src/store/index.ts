import { Middleware, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import App from './slices/app.slice';
import { apiSlice } from './api/api.slice';
import Modal from './slices/modal.slice';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.error(action.error.message);
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    App,
    Modal,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware, rtkQueryErrorLogger);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { Middleware, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import App from './slices/app.slice';
import Modal from './slices/modal.slice';
import Auth from './slices/auth.slice';
import { baseApi } from '@/services/';
import { toast } from 'react-toastify';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error('Something went wrong');
    console.error(action.error.message);
  }

  return next(action);
};

export const store = configureStore({
  reducer: {
    App,
    Modal,
    Auth,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware, rtkQueryErrorLogger);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

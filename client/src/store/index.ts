import { Middleware, configureStore, isRejectedWithValue } from '@reduxjs/toolkit';
import App from './slices/app.slice';
import Modal from './slices/modal.slice';
import { todoService } from '@/services/todo';

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
    [todoService.reducerPath]: todoService.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(todoService.middleware, rtkQueryErrorLogger);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

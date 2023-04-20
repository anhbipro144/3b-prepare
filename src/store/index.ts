import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slice/ui-slice';
import userReducer from './slice/user-slice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

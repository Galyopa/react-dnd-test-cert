import { configureStore } from '@reduxjs/toolkit';
import certificatesReducer from './features/certificates';
import { loadState } from './localStorage';

export const store = configureStore({
  devTools: true,
  reducer: {
    certificates: certificatesReducer,
  },
  preloadedState: loadState(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
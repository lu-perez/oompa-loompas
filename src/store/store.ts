import { configureStore } from '@reduxjs/toolkit';
import { oompaLoompasSlice } from './slices/oompa-loompas/oompaLoompasSlice';

export const store = configureStore({
  reducer: {
    oompaLoompas: oompaLoompasSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

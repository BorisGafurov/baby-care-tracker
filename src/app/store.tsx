import { configureStore } from '@reduxjs/toolkit';
import { loadState } from '../utils/localStorage';
import feedingReducer from '../features/feeding/feedingSlice';
import sleepReducer from '../features/sleep/sleepSlice';

const persistedState = loadState();
export const store = configureStore({
  reducer: {
    feeding: feedingReducer,
    sleep: sleepReducer,
  },
  preloadedState: persistedState,
});

export type RootState = ReturnType<typeof store.getState>;
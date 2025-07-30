import { createSlice } from '@reduxjs/toolkit';

export interface SleepEntry {
  startTime: string;
  endTime: string | null;
  duration: number | null;
}

const sleepSlice = createSlice({
  name: 'sleep',
  initialState: [] as SleepEntry[],
  reducers: {
    toggleSleepEntry: (state) => {
      const lastEntry = state[state.length - 1];
      const now = new Date().toISOString();

      if (lastEntry && !lastEntry.endTime) {
        lastEntry.endTime = now;
        lastEntry.duration = calculateDuration(lastEntry.startTime, now);
      } else {
        state.push({ startTime: now, endTime: null, duration: null });
      }
    },
    setSleeps: (state, action) => {
      return action.payload;
    }
  },
});

function calculateDuration(start: string, end: string): number {
  return Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
}

export const { toggleSleepEntry, setSleeps } = sleepSlice.actions;
export default sleepSlice.reducer;
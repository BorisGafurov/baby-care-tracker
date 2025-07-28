import { createSlice } from '@reduxjs/toolkit';

export interface FeedingEntry {
  startTime: string;
  endTime: string | null;
  duration: number | null;
}

const feedingSlice = createSlice({
  name: 'feeding',
  initialState: [] as FeedingEntry[],
  reducers: {
    toggleFeedingEntry: (state) => {
      const lastEntry = state[state.length - 1];
      const now = new Date().toISOString();

      if (lastEntry && !lastEntry.endTime) {
        lastEntry.endTime = now;
        lastEntry.duration = calculateDuration(lastEntry.startTime, now);
      } else {
        state.push({ startTime: now, endTime: null, duration: null });
      }
    },
  },
});

function calculateDuration(start: string, end: string): number {
  return Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000);
}

export const { toggleFeedingEntry } = feedingSlice.actions;
export default feedingSlice.reducer;
import { createSlice} from '@reduxjs/toolkit';

interface DurationResult {
  hours: number;
  minutes: number;
  totalMinutes: number;
  formatted: string;
}


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
    forceEndFeeding: (state) => {
      const lastEntry = state[state.length - 1];
      const now = new Date().toISOString();
      
      if (lastEntry && !lastEntry.endTime) {
        lastEntry.endTime = now;
        lastEntry.duration = calculateDuration(lastEntry.startTime, now);
      }
    },

    setFeedings: (state, action) => {
      return action.payload;
    }
  },
});


export function calculateDuration(start: string, end: string): DurationResult {
  const totalMinutes = Math.round(
    (new Date(end).getTime() - new Date(start).getTime()) / 60000
  );
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  let formatted: string;
  
  if (totalMinutes < 60) {
    formatted = `${totalMinutes} мин`;
  } else {
    formatted = `${hours} ч ${minutes} мин`;
    
    if (hours === 1) {
      formatted = `${hours} час ${minutes} мин`;
    } else if (hours >= 2 && hours <= 4) {
      formatted = `${hours} часа ${minutes} мин`;
    } else {
      formatted = `${hours} часов ${minutes} мин`;
    }
  }
  
  return {
    hours,
    minutes,
    totalMinutes,
    formatted
  };
}

export const { toggleFeedingEntry, setFeedings, forceEndFeeding } = feedingSlice.actions;
export default feedingSlice.reducer;
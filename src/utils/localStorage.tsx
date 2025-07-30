import { FeedingEntry } from '../features/feeding/feedingSlice';
import { SleepEntry } from '../features/sleep/sleepSlice';

// Общий тип для состояния
export interface AppState {
  feeding: FeedingEntry[];
  sleep: SleepEntry[];
}

export const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('babyCareTracker', serializedState);
  } catch (err) {
    console.error("Failed to save state:", err);
  }
};

export const loadState = (): AppState => {
  try {
    const serializedState = localStorage.getItem('babyCareTracker');
    if (serializedState === null) {
      return {
        feeding: [],
        sleep: []
      };
    }
    return JSON.parse(serializedState) as AppState;
  } catch (err) {
    console.error("Failed to load state:", err);
    return {
      feeding: [],
      sleep: []
    };
  }
};

export const clearValue = (section: keyof AppState): AppState[keyof AppState] => {
  const state = loadState();
  state[section] = [];
  saveState(state);
  return state[section];
};
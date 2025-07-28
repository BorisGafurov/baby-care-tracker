// 📁 src/utils/localStorage.ts
import { FeedingEntry } from '../features/feeding/feedingSlice';
import { SleepEntry } from '../features/sleep/sleepSlice';

// 🔹 Типизация структуры сохраняемого состояния
interface AppState {
  feeding: FeedingEntry[];
  sleep: SleepEntry[];
}

// 🔹 Загрузка данных из localStorage
export const loadState = (): AppState | undefined => {
  try {
    const serialized = localStorage.getItem('babyCareTracker');
    if (!serialized) return undefined;

    const parsedState = JSON.parse(serialized);

    // 🔸 Дополнительная проверка структуры данных
    if (
      Array.isArray(parsedState?.feeding) &&
      Array.isArray(parsedState?.sleep)
    ) {
      return parsedState;
    }

    console.warn('❌ Поврежденные данные в localStorage');
    return undefined;
  } catch (error) {
    console.error('Error loading state:', error);
    return undefined;
  }
};

// 🔹 Сохранение данных в localStorage
export const saveState = (state: AppState): void => {
  try {
    localStorage.setItem('babyCareTracker', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving state:', error);
  }
};
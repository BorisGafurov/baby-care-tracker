import { useDispatch, useSelector } from 'react-redux';
import { toggleFeedingEntry } from './features/feeding/feedingSlice';
import { toggleSleepEntry } from './features/sleep/sleepSlice';
import './App.css';
import type { FeedingEntry } from './features/feeding/feedingSlice';
import type { SleepEntry } from './features/sleep/sleepSlice';
import type { RootState } from './app/store';

function App() {
  const dispatch = useDispatch();

  const feedingEntries: FeedingEntry[] = useSelector<RootState, RootState['feeding']>(
    (state) => state.feeding
  );
  
  const sleepEntries: SleepEntry[] = useSelector<RootState, RootState['sleep']>(
    (state) => state.sleep
  );

  return (
    <div className="App">
      <section>
        <h2>Кормление</h2>
        <button onClick={() => dispatch(toggleFeedingEntry())}>
          {feedingEntries.length && !feedingEntries[feedingEntries.length - 1].endTime
            ? 'Завершить кормление'
            : 'Начать кормление'}
        </button>
        <ul>
          {feedingEntries.map((entry, i) => (
            <li key={i}>
              {new Date(entry.startTime).toLocaleTimeString()} -{" "}
              {entry.endTime ? new Date(entry.endTime).toLocaleTimeString() : "Продолжается"}{" "}
              ({entry.duration} мин)
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Сон</h2>
        <button onClick={() => dispatch(toggleSleepEntry())}>
          {sleepEntries.length && !sleepEntries[sleepEntries.length - 1].endTime
            ? 'Завершить сон'
            : 'Начать сон'}
        </button>
        <ul>
          {sleepEntries.map((entry, i) => (
            <li key={i}>
              {new Date(entry.startTime).toLocaleTimeString()} -{" "}
              {entry.endTime ? new Date(entry.endTime).toLocaleTimeString() : "Продолжается"}{" "}
              ({entry.duration} мин)
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
import { useDispatch, useSelector } from 'react-redux';
import { toggleFeedingEntry, setFeedings } from './features/feeding/feedingSlice';
import { toggleSleepEntry, setSleeps } from './features/sleep/sleepSlice';
import './App.css';
import type { RootState } from './app/store';
import {clearValue, loadState} from './utils/localStorage';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const feedingEntries = useSelector((state: RootState) => state.feeding);
  const sleepEntries = useSelector((state: RootState) => state.sleep);

  useEffect(() => {
    const savedState = loadState();
    dispatch(setFeedings(savedState.feeding));
    dispatch(setSleeps(savedState.sleep));
  }, [dispatch]);

  const clearFeedingsHandler = () => {
    const updatedFeedings = clearValue('feeding');
    dispatch(setFeedings(updatedFeedings));
  };

  const clearSleepsHandler = () => {
    const updatedSleeps = clearValue('sleep');
    dispatch(setSleeps(updatedSleeps));
  };


  return (
    <div className="App">
      <section>
        <h2>Кормление</h2>
        <button onClick={() => dispatch(toggleFeedingEntry())}>
          {feedingEntries.length && !feedingEntries[feedingEntries.length - 1].endTime
            ? 'Завершить кормление'
            : 'Начать кормление'}
        </button>
        <button onClick={clearFeedingsHandler}>Сбросить кормление</button>
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
        <button onClick={clearSleepsHandler}>Сбросить сон</button>
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
import { useDispatch, useSelector } from 'react-redux';
import { toggleFeedingEntry, setFeedings, forceEndFeeding } from './features/feeding/feedingSlice';
import { toggleSleepEntry, setSleeps, forceEndSleep } from './features/sleep/sleepSlice';
import './App.css';
import type { RootState } from './app/store';
import {clearValue, loadState} from './utils/localStorage';
import { useEffect } from 'react';
import { calculateDuration } from './features/feeding/feedingSlice';

function App() {
  const dispatch = useDispatch();
  const feedingEntries = useSelector((state: RootState) => state.feeding);
  const sleepEntries = useSelector((state: RootState) => state.sleep);

  useEffect(() => {
    const savedState = loadState();
    dispatch(setFeedings(savedState.feeding));
    dispatch(setSleeps(savedState.sleep));
  }, [dispatch]);

  const handleStartFeeding = () => {
    if (sleepEntries.some(entry => !entry.endTime)) {
      dispatch(forceEndSleep());
    }
    dispatch(toggleFeedingEntry());
  };

  const handleStartSleep = () => {
    if (feedingEntries.some(entry => !entry.endTime)) {
      dispatch(forceEndFeeding());
    }
    dispatch(toggleSleepEntry());
  };

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
        <button onClick={handleStartFeeding}>
          {feedingEntries.length && !feedingEntries[feedingEntries.length - 1].endTime
            ? 'Завершить кормление'
            : 'Начать кормление'}
        </button>
        <button onClick={clearFeedingsHandler}>Сбросить кормление</button>
        <ul>
          {feedingEntries.map((entry, i) => (
          <li key={i}>
          {new Date(entry.startTime).toLocaleTimeString()} -{" "}
          {entry.endTime ? (
            <>
              {new Date(entry.endTime).toLocaleTimeString()} (
              {calculateDuration(entry.startTime, entry.endTime).formatted})
            </>
          ) : (
            "Продолжается"
          )}
        </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Сон</h2>
        <button onClick={handleStartSleep}>
          {sleepEntries.length && !sleepEntries[sleepEntries.length - 1].endTime
            ? 'Завершить сон'
            : 'Начать сон'}
        </button>
        <button onClick={clearSleepsHandler}>Сбросить сон</button>
        <ul>
          {sleepEntries.map((entry, i) => (
            <li key={i}>
            {new Date(entry.startTime).toLocaleTimeString()} -{" "}
            {entry.endTime ? (
              <>
                {new Date(entry.endTime).toLocaleTimeString()} (
                {calculateDuration(entry.startTime, entry.endTime).formatted})
              </>
            ) : (
              "Продолжается"
            )}
          </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
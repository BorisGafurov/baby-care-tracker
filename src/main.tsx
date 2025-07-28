import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import { loadState, saveState } from './utils/localStorage';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Элемент #root не найден');


const persistedState = loadState();
console.log('🔄 Первоначальное состояние:', persistedState); 
store.dispatch({ type: 'persist/REHYDRATE', payload: persistedState });

store.subscribe(() => {
  const state = {
    feeding: store.getState().feeding,
    sleep: store.getState().sleep,
  };
  saveState(state);
});

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
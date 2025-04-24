import { configureStore } from '@reduxjs/toolkit';
import cryptoReducer from './features/crypto/cryptoSlice';
import { loadState, saveState } from './utils/localStorage';

// Load persisted state from localStorage
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
  },
  preloadedState: persistedState ? { crypto: persistedState } : undefined,
});

// Subscribe to store changes to save to localStorage
store.subscribe(() => {
  saveState(store.getState().crypto);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
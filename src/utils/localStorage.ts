import { CryptoState } from '../models/types';

export const loadState = (): CryptoState | undefined => {
  try {
    const serializedState = localStorage.getItem('cryptoState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state from localStorage', err);
    return undefined;
  }
};

// Save state to localStorage
export const saveState = (state: CryptoState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cryptoState', serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage', err);
  }
};
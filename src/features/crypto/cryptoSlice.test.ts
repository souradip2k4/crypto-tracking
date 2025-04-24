import cryptoReducer, {
  updatePrice,
  updateChangePercentages,
  updateVolume
} from './cryptoSlice';
import { describe, it, expect } from 'vitest';

import { CryptoState } from '../../models/types';

describe('crypto reducer', () => {
  const initialState: CryptoState = {
    assets: [
      {
        id: 1,
        name: "Bitcoin",
        symbol: "BTC",
        logo: "https://example.com/btc.png",
        price: 50000,
        change1h: 0.5,
        change24h: 1.2,
        change7d: 5.3,
        marketCap: 1000000000000,
        volume24h: 50000000000,
        circulatingSupply: 19,
        maxSupply: 21,
        chart7d: "data:image/svg..."
      }
    ],
    status: 'idle',
    error: null
  };

  it('should handle initial state', () => {
    expect(cryptoReducer(undefined, { type: 'unknown' })).toEqual({
      assets: expect.any(Array),
      status: 'idle',
      error: null
    });
  });

  it('should handle updatePrice', () => {
    const newPrice = 51000;
    const actual = cryptoReducer(initialState, updatePrice({ id: 1, price: newPrice }));
    expect(actual.assets[0].price).toEqual(newPrice);
  });

  it('should handle updateChangePercentages', () => {
    const changes = { id: 1, change1h: 0.6, change24h: 1.5, change7d: 6.0 };
    const actual = cryptoReducer(initialState, updateChangePercentages(changes));
    expect(actual.assets[0].change1h).toEqual(changes.change1h);
    expect(actual.assets[0].change24h).toEqual(changes.change24h);
    expect(actual.assets[0].change7d).toEqual(changes.change7d);
  });

  it('should handle updateVolume', () => {
    const newVolume = 55000000000;
    const actual = cryptoReducer(initialState, updateVolume({ id: 1, volume24h: newVolume }));
    expect(actual.assets[0].volume24h).toEqual(newVolume);
  });
});
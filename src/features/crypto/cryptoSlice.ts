import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CryptoAsset, CryptoState } from '../../models/types';
import { sampleCryptoData } from '../../api/cryptoService';

const initialState: CryptoState = {
  assets: sampleCryptoData,
  status: 'idle',
  error: null,
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrice: (state, action: PayloadAction<{ id: number; price: number }>) => {
      const { id, price } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        asset.price = price;
      }
    },
    updateChangePercentages: (
      state,
      action: PayloadAction<{ id: number; change1h?: number; change24h?: number; change7d?: number }>
    ) => {
      const { id, change1h, change24h, change7d } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        if (change1h !== undefined) asset.change1h = change1h;
        if (change24h !== undefined) asset.change24h = change24h;
        if (change7d !== undefined) asset.change7d = change7d;
      }
    },
    updateVolume: (state, action: PayloadAction<{ id: number; volume24h: number }>) => {
      const { id, volume24h } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        asset.volume24h = volume24h;
      }
    },
    updateAllAssets: (state, action: PayloadAction<CryptoAsset[]>) => {
      state.assets = action.payload;
    },
  },
});

export const { updatePrice, updateChangePercentages, updateVolume, updateAllAssets } = cryptoSlice.actions;

export default cryptoSlice.reducer;
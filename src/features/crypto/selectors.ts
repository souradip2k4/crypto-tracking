import { RootState } from '../../store';
import { CryptoAsset } from '../../models/types';

export const selectAllAssets = (state: RootState): CryptoAsset[] => state.crypto.assets;

export const selectAssetById = (state: RootState, id: number): CryptoAsset | undefined =>
  state.crypto.assets.find(asset => asset.id === id);

export const selectTopGainers = (state: RootState): CryptoAsset[] =>
  [...state.crypto.assets].sort((a, b) => b.change24h - a.change24h);

export const selectTopLosers = (state: RootState): CryptoAsset[] =>
  [...state.crypto.assets].sort((a, b) => a.change24h - b.change24h);
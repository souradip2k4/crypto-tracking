import { store } from '../store';
import { updatePrice, updateChangePercentages, updateVolume } from '../features/crypto/cryptoSlice';
import { getRandomPriceChange, getRandomPercentageChange } from '../api/cryptoService';

class MockCryptoWebSocket {
  private intervalId: number | null = null;
  private updateInterval: number = 1500;

  connect(): void {
    if (this.intervalId) return;

    this.intervalId = window.setInterval(() => {
      const state = store.getState();
      const assets = state.crypto.assets;

      const assetToUpdate = assets[Math.floor(Math.random() * assets.length)];

      const newPrice = getRandomPriceChange(assetToUpdate.price);
      store.dispatch(updatePrice({ id: assetToUpdate.id, price: Number(newPrice.toFixed(2)) }));

      const newChange1h = assetToUpdate.change1h + getRandomPercentageChange();
      const newChange24h = assetToUpdate.change24h + getRandomPercentageChange();
      const newChange7d = assetToUpdate.change7d + getRandomPercentageChange(0.5);

      store.dispatch(updateChangePercentages({
        id: assetToUpdate.id,
        change1h: Number(newChange1h.toFixed(2)),
        change24h: Number(newChange24h.toFixed(2)),
        change7d: Number(newChange7d.toFixed(2))
      }));

      const volumeChange = getRandomPriceChange(assetToUpdate.volume24h, 1);
      store.dispatch(updateVolume({
        id: assetToUpdate.id,
        volume24h: Number(volumeChange.toFixed(0))
      }));
    }, this.updateInterval);
  }

  disconnect(): void {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  setUpdateInterval(ms: number): void {
    this.updateInterval = ms;
    if (this.intervalId) {
      this.disconnect();
      this.connect();
    }
  }
}

export const mockWebSocket = new MockCryptoWebSocket();
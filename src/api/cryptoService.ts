import { CryptoAsset } from '../models/types';

const sampleChartUp = "up";
const sampleChartDown = "down";
const sampleChartFlat = "flat";

export const sampleCryptoData: CryptoAsset[] = [
  {
    id: 1,
    name: "Bitcoin",
    symbol: "BTC",
    logo: "/images/crypto-logos/bitcoin-btc-logo.png",
    price: 93759.48,
    change1h: 0.43,
    change24h: 0.93,
    change7d: 11.11,
    marketCap: 1861618902186,
    volume24h: 43874950947,
    circulatingSupply: 19.85,
    maxSupply: 21,
    chart7d: sampleChartUp
  },
  {
    id: 2,
    name: "Ethereum",
    symbol: "ETH",
    logo: "/images/crypto-logos/ethereum-eth-logo.png",
    price: 1802.46,
    change1h: 0.60,
    change24h: 3.21,
    change7d: 13.68,
    marketCap: 217581279327,
    volume24h: 23547469307,
    circulatingSupply: 120.71,
    maxSupply: null,
    chart7d: sampleChartUp
  },
  {
    id: 3,
    name: "Tether",
    symbol: "USDT",
    logo: "/images/crypto-logos/tether-usdt-logo.png",
    price: 1.00,
    change1h: 0.00,
    change24h: 0.00,
    change7d: 0.04,
    marketCap: 145320022085,
    volume24h: 92288882007,
    circulatingSupply: 145.27,
    maxSupply: null,
    chart7d: sampleChartFlat
  },
  {
    id: 4,
    name: "XRP",
    symbol: "XRP",
    logo: "/images/crypto-logos/xrp-xrp-logo.png",
    price: 2.22,
    change1h: 0.46,
    change24h: 0.54,
    change7d: 6.18,
    marketCap: 130073814966,
    volume24h: 5131481491,
    circulatingSupply: 58.39,
    maxSupply: 100,
    chart7d: sampleChartUp
  },
  {
    id: 5,
    name: "BNB",
    symbol: "BNB",
    logo: "/images/crypto-logos/bnb-bnb-logo.png",
    price: 606.65,
    change1h: 0.09,
    change24h: -1.20,
    change7d: 3.73,
    marketCap: 85471956947,
    volume24h: 1874281784,
    circulatingSupply: 140.89,
    maxSupply: 200,
    chart7d: sampleChartDown
  },
  {
    id: 6,
    name: "Solana",
    symbol: "SOL",
    logo: "/images/crypto-logos/solana-sol-logo.png",
    price: 151.51,
    change1h: 0.53,
    change24h: 1.26,
    change7d: 14.74,
    marketCap: 78381958631,
    volume24h: 4881674486,
    circulatingSupply: 517.31,
    maxSupply: null,
    chart7d: sampleChartUp
  }
];

export const getRandomPriceChange = (basePrice: number, maxPercentChange: number = 0.5): number => {
  const changePercent = (Math.random() * maxPercentChange * 2) - maxPercentChange;
  return basePrice * (1 + changePercent / 100);
};

export const getRandomPercentageChange = (maxChange: number = 0.2): number => {
  return (Math.random() * maxChange * 2) - maxChange;
};
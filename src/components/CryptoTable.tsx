import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets, selectTopGainers, selectTopLosers } from '../features/crypto/selectors';
import { RootState } from '../store';
import PriceChange from './PriceChange';
import Chart from './Chart';
import { CryptoAsset } from '../models/types';

const CryptoTable: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers'>('all');

  const assets = useSelector((state: RootState) => {
    switch (filter) {
      case 'gainers':
        return selectTopGainers(state).slice(0, 5);
      case 'losers':
        return selectTopLosers(state).slice(0, 5);
      default:
        return selectAllAssets(state);
    }
  });

  console.log(assets)
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatLargeNumber = (value: number): string => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex space-x-2">
        <button
          className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          All Assets
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'gainers' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('gainers')}
        >
          Top Gainers
        </button>
        <button
          className={`px-4 py-2 rounded ${filter === 'losers' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('losers')}
        >
          Top Losers
        </button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">#</th>
          <th className="py-3 px-6 text-left">Name</th>
          <th className="py-3 px-6 text-right">Price</th>
          <th className="py-3 px-6 text-right">1h %</th>
          <th className="py-3 px-6 text-right">24h %</th>
          <th className="py-3 px-6 text-right">7d %</th>
          <th className="py-3 px-6 text-right">Market Cap</th>
          <th className="py-3 px-6 text-right">Volume (24h)</th>
          <th className="py-3 px-6 text-right">Circulating Supply</th>
          <th className="py-3 px-6 text-right">Last 7 Days</th>
        </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
        {assets.map((asset: CryptoAsset) => (
          <tr key={asset.id} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="py-3 px-6 text-left">{asset.id}</td>
            <td className="py-3 px-6 text-left whitespace-nowrap">
              <div className="flex items-center">
                <div className="mr-2">
                  <img className="w-6 h-6" src={asset.logo} alt={asset.name} />
                </div>
                <span>{asset.name}</span>
                <span className="text-gray-500 ml-1">{asset.symbol}</span>
              </div>
            </td>
            <td className="py-3 px-6 text-right">{formatCurrency(asset.price)}</td>
            <td className="py-3 px-6 text-right">
              <PriceChange value={asset.change1h} />
            </td>
            <td className="py-3 px-6 text-right">
              <PriceChange value={asset.change24h} />
            </td>
            <td className="py-3 px-6 text-right">
              <PriceChange value={asset.change7d} />
            </td>
            <td className="py-3 px-6 text-right">{formatLargeNumber(asset.marketCap)}</td>
            <td className="py-3 px-6 text-right">{formatLargeNumber(asset.volume24h)}</td>
            <td className="py-3 px-6 text-right">
              {asset.circulatingSupply} {asset.symbol}
              {asset.maxSupply && (
                <span className="text-gray-500 ml-1">
                    / {asset.maxSupply} {asset.symbol}
                  </span>
              )}
            </td>
            <td className="py-3 px-6">
              <Chart
                data={asset.chart7d}
                altText={`${asset.name} 7-day ${asset.change7d > 0 ? 'up' : asset.change7d < 0 ? 'down' : 'flat'} trend`}
              />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
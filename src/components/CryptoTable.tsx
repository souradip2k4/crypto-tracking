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
    <div className="w-full bg-white rounded-lg shadow-md">

      <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            className={`px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium 
                      ${filter === 'all'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setFilter('all')}
          >
            All Assets
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium
                      ${filter === 'gainers'
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setFilter('gainers')}
          >
            Top Gainers
          </button>
          <button
            className={`px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium
                      ${filter === 'losers'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setFilter('losers')}
          >
            Top Loss
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th scope="col" className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th scope="col" className={`py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider `}>1h %</th>
            <th scope="col" className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">24h %</th>
            <th scope="col" className={`py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider `}>7d %</th>
            <th scope="col" className={`py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider `}>Market Cap</th>
            <th scope="col" className={`py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider `}>Volume (24h)</th>
            <th scope="col" className={`py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider `}>Circulating Supply</th>
            <th scope="col" className={`py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider `}>Last 7 Days</th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {assets.map((asset: CryptoAsset) => (
            <tr key={asset.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-500">
                {asset.id}
              </td>
              <td className="py-4 px-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 mr-3">
                    <img className="h-8 w-8 rounded-full" src={asset.logo} alt={`${asset.name} logo`} />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <div className="text-sm font-medium text-gray-900">{asset.name}</div>
                    <div className="text-sm text-gray-500 sm:ml-2">{asset.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                {formatCurrency(asset.price)}
              </td>
              <td className={`py-4 px-4 whitespace-nowrap text-right text-sm `}>
                <PriceChange value={asset.change1h} />
              </td>
              <td className="py-4 px-4 whitespace-nowrap text-right text-sm">
                <PriceChange value={asset.change24h} />
              </td>
              <td className={`py-4 px-4 whitespace-nowrap text-right text-sm `}>
                <PriceChange value={asset.change7d} />
              </td>
              <td className={`py-4 px-4 whitespace-nowrap text-right text-sm text-gray-500 `}>
                {formatLargeNumber(asset.marketCap)}
              </td>
              <td className={`py-4 px-4 whitespace-nowrap text-right text-sm text-gray-500 `}>
                {formatLargeNumber(asset.volume24h)}
              </td>
              <td className={`py-4 px-4 whitespace-nowrap text-right text-sm text-gray-500 `}>
                <div>
                  <span className="font-medium">{asset.circulatingSupply.toFixed(2)}</span> {asset.symbol}
                  {asset.maxSupply && (
                    <div className="text-xs text-gray-400">
                      Max: {asset.maxSupply} {asset.symbol}
                    </div>
                  )}
                </div>
              </td>
              <td className={`py-4 px-4 whitespace-nowrap text-right`}>
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

      <div className="block sm:hidden">
        <div className="bg-gray-100 p-4 text-center text-sm text-gray-500">
          Swipe horizontally to see more data →
        </div>
      </div>

      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {assets.length} assets
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoTable;
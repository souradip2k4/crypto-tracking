import React from 'react';

interface PriceChangeProps {
  value: number;
}

const PriceChange: React.FC<PriceChangeProps> = ({ value }) => {
  const isPositive = value > 0;
  const isNegative = value < 0;

  let colorClasses = '';

  if (isPositive) {
    colorClasses = 'text-green-600 bg-green-50';
  } else if (isNegative) {
    colorClasses = 'text-red-600 bg-red-50';
  } else {
    colorClasses = 'text-gray-600 bg-gray-50';
  }

  const formattedValue = value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;

  // Determine the arrow direction
  const arrow = isPositive ? '↑' : isNegative ? '↓' : '—';

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${colorClasses}`}>
      <span className="mr-1">{arrow}</span>
      {formattedValue}
    </span>
  );
};

export default PriceChange;
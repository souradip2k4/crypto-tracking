import React from 'react';

interface PriceChangeProps {
  value: number;
}

const PriceChange: React.FC<PriceChangeProps> = ({ value }) => {
  const textColor = value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : 'text-gray-500';

  const formattedValue = value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;

  const arrow = value > 0 ? '▲' : value < 0 ? '▼' : '';

  return (
    <span className={textColor}>
      {arrow} {formattedValue}
    </span>
  );
};

export default PriceChange;
import React from 'react';

interface ChartProps {
  data: string;
  altText: string;
}

const Chart: React.FC<ChartProps> = ({ data, altText }) => {
  return (
    <div className="h-10 w-32">
      {data.startsWith('data:') ? (
        <img src={data} alt={altText} className="h-full w-full object-cover" />
      ) : (
        // Placeholder sparkline chart
        <svg
          className="h-full w-full"
          viewBox="0 0 100 25"
          preserveAspectRatio="none"
        >
          <path
            d={altText.includes('up') ?
              "M0,25 L5,20 L10,22 L15,18 L20,16 L30,17 L40,15 L50,13 L60,10 L70,8 L80,5 L90,3 L100,0" :
              altText.includes('down') ?
                "M0,0 L10,3 L20,1 L30,5 L40,7 L50,10 L60,12 L70,15 L80,17 L90,20 L100,25" :
                "M0,12 L10,13 L20,11 L30,12 L40,13 L50,12 L60,11 L70,12 L80,13 L90,12 L100,11"}
            stroke={altText.includes('up') ? "#16a34a" : altText.includes('down') ? "#dc2626" : "#6b7280"}
            strokeWidth="2"
            fill="none"
          />
        </svg>
      )}
    </div>
  );
};

export default Chart;
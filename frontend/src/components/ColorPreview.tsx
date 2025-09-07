import React from 'react';

export const ColorPreview: React.FC = () => {
  const colorPalette = [
    { name: 'Primary Blue', colors: ['#f0f9ff', '#0ea5e9', '#0284c7', '#0c4a6e'] },
    { name: 'Secondary Beige', colors: ['#fefdf8', '#c4b5a0', '#a68b5b', '#4a3f35'] },
    { name: 'Accent Green', colors: ['#f0fdf4', '#22c55e', '#16a34a', '#14532d'] },
    { name: 'Neutral', colors: ['#fefefe', '#a3a3a3', '#525252', '#262626'] },
  ];

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">Color Palette</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {colorPalette.map((palette) => (
          <div key={palette.name} className="space-y-2">
            <h4 className="font-medium text-beige text-sm">{palette.name}</h4>
            <div className="space-y-1">
              {palette.colors.map((color, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-6 h-6 rounded border border-secondary-200"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-neutral-600 font-mono">{color}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-beige rounded-lg">
        <h4 className="font-medium text-primary-700 mb-2">Design Philosophy</h4>
        <p className="text-sm text-beige">
          This color scheme combines the warmth of beige with the clarity of blue and the freshness of green, 
          creating a sophisticated and calming interface that promotes focus and productivity.
        </p>
      </div>
    </div>
  );
};

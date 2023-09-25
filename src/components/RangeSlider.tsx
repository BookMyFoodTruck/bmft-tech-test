import React, { useState } from 'react';

interface RangeSliderProps {
  min: number;
  max: number;
  defaultValue: number;
  onHoverText: boolean;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  defaultValue,
  onHoverText,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value, 10));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = (offsetX / rect.width) * 100;
    const newValue = (percentage / 100) * (max - min) + min;
    setHoveredValue(newValue);
  };

  const handleMouseLeave = () => {
    setHoveredValue(null);
  };

  return (
    <div className="relative">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`w-full h-2 rounded-lg appearance-none bg-gray-100 focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500`}
        style={{
          backgroundImage: `linear-gradient(to right, #F08012 0%, #F08012 ${(value / max) * 100}%, #ccc ${(value / max) * 100}%, #ccc 100%)`,
        }}
      />
      <div
        className={`absolute top-0 left-0 transform -translate-y-1/2 -translate-x-1/2 h-6 w-6 bg-orange-500 rounded-full transition-opacity duration-300 ${
          onHoverText ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: `${((value - min) / (max - min)) * 100}%`,
        }}
      ></div>
      {hoveredValue !== null && (
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 text-gray-600 text-xs py-1 px-2 rounded"
          style={{
            left: `${((hoveredValue - min) / (max - min)) * 100}%`,
          }}
        >
          {hoveredValue.toFixed(2)}
        </div>
      )}
      <div
        className={`absolute top-0 left-0 transform -translate-y-full translate-x-1/2 text-gray-600 transition-opacity duration-300 ${
          onHoverText ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: `${((value - min) / (max - min)) * 100}%`,
        }}
      >
        {value}
      </div>
      <div className="text-gray-600 text-sm absolute left-2 top-5 transform -translate-x-1/2">
        {min}
      </div>
      <div className="text-gray-600 text-sm absolute right-2 top-5 transform translate-x-1/2">
        {max}
      </div>
    </div>
  );
};

export default RangeSlider;

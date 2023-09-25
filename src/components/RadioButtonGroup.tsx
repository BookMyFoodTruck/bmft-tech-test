import React, { useState } from 'react';
import theme from '../styles/theme';

interface RadioButtonProps {
  label: string;
  value: number;
  checked: boolean;
  onChange: (value: number) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, checked, onChange }) => {

  return (
      <div className="inline-flex items-center">
        <label
          className="relative flex cursor-pointer items-center rounded-full p-3"
        >
          <input
            type="radio"
            value={value}
            checked={checked}
            onChange={() => onChange(value)}
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-orange-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-orange-500 checked:before:bg-orange-500 hover:before:opacity-10"
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-orange-500 opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
          </div>
        </label>
        <span>{label.charAt(0).toUpperCase() + label.slice(1)}</span>
      </div>
  );
};

interface RadioButtonGroupProps {
  options: { id: number; title: string }[];
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleRadioChange = (value: number) => {
    setSelectedValue(value);
  };

  return (
    <div className="flex space-x-4 md:space-x-8 lg:space-x-12">
      {options.map((option) => (
        <RadioButton
          key={option.id}
          label={option.title}
          value={option.id}
          checked={selectedValue === option.id}
          onChange={handleRadioChange}
        />
      ))}
    </div>
  );
};

export default RadioButtonGroup;


import React from 'react';
import type { Option } from '../types';

interface OptionSelectorProps {
  title: string;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export const OptionSelector: React.FC<OptionSelectorProps> = ({ title, options, selectedValue, onChange }) => {
  return (
    <div>
      <h3 className="text-md font-semibold text-gray-300 mb-3">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-400
              ${selectedValue === option.id
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

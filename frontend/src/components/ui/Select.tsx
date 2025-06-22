import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({ label, error, options, id, ...props }) => {
  const selectId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={selectId} className="mb-1 font-semibold text-gray-700">
        {label}
      </label>
      <select
        id={selectId}
        className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

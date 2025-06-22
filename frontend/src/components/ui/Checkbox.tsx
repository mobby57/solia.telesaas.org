import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, error, id, ...props }) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        id={inputId}
        className={`form-checkbox h-5 w-5 text-blue-600 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...props}
      />
      <label htmlFor={inputId} className="ml-2 block text-gray-700">
        {label}
      </label>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

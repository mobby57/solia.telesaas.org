import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <input
        className={
          'px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mint dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 ' +
          (error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-mint') +
          ' ' +
          className
        }
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

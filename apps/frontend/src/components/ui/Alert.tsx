import React from 'react';

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ type = 'info', children }) => {
  const baseClasses = 'p-4 rounded-lg text-sm font-medium';
  let typeClasses = '';

  switch (type) {
    case 'success':
      typeClasses = 'bg-green-100 text-green-800';
      break;
    case 'warning':
      typeClasses = 'bg-yellow-100 text-yellow-800';
      break;
    case 'error':
      typeClasses = 'bg-red-100 text-red-800';
      break;
    default:
      typeClasses = 'bg-blue-100 text-blue-800';
  }

  return <div className={`${baseClasses} ${typeClasses}`}>{children}</div>;
};

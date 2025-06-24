import React from 'react';
import { Avatar } from './Avatar';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center h-16 bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <img
          src="/solia logo.png"
          alt="Solia Logo"
          className="h-10 w-auto"
          aria-label="Solia logo"
        />
      </div>
      <div className="flex-1" />
      <div className="pr-4">
        <Avatar />
      </div>
    </header>
  );
};

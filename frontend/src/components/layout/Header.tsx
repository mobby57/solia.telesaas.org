import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Solia</div>
      <div>
        {/* TODO: Add user info, logout button */}
      </div>
    </header>
  );
};

export default Header;

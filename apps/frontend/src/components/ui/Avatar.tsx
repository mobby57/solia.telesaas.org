import React from 'react';

export const Avatar: React.FC = () => {
  return (
    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-mint">
      <img
        src="/avatar-placeholder.png"
        alt="User Avatar"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

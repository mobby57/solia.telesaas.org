import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li><a href="/dashboard" className="block py-2 px-3 rounded hover:bg-gray-700">Dashboard</a></li>
          <li><a href="/missions" className="block py-2 px-3 rounded hover:bg-gray-700">Missions</a></li>
          <li><a href="/apikeys" className="block py-2 px-3 rounded hover:bg-gray-700">API Keys</a></li>
          <li><a href="/feedbacks" className="block py-2 px-3 rounded hover:bg-gray-700">Feedbacks</a></li>
          <li><a href="/notifications" className="block py-2 px-3 rounded hover:bg-gray-700">Notifications</a></li>
          <li><a href="/subscription" className="block py-2 px-3 rounded hover:bg-gray-700">Subscription</a></li>
          <li><a href="/profile" className="block py-2 px-3 rounded hover:bg-gray-700">Profile</a></li>
          <li><a href="/admin" className="block py-2 px-3 rounded hover:bg-gray-700">Admin</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

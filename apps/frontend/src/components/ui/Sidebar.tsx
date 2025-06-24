import React from 'react';
import Link from 'next/link';

interface SidebarItem {
  label: string;
  href: string;
}

interface SidebarProps {
  items: SidebarItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  return (
    <nav className="w-64 bg-white dark:bg-gray-900 shadow-md min-h-screen p-4">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-mint hover:text-white transition"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

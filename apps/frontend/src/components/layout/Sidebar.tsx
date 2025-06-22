import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/missions', label: 'Missions' },
    { href: '/admin/users', label: 'Utilisateurs' },
  ];

  return (
    <aside className="w-64 bg-offWhite border-r border-gray-200 min-h-screen p-6">
      <nav>
        <ul className="space-y-4 font-primary text-darkGray">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block rounded px-3 py-2 hover:bg-blueViolet hover:text-white transition-colors ${
                  pathname === href ? 'bg-blueViolet text-white' : ''
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

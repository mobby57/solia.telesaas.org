import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-offWhite shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/" className="text-blueViolet font-secondary text-2xl font-bold">
        Solia
      </Link>

      <nav>
        <ul className="flex space-x-6 text-darkGray font-primary">
          <li>
            <Link href="/landing" className="hover:text-blueViolet transition-colors">Accueil</Link>

          </li>
          <li>
            <Link href="/login" className="hover:text-blueViolet transition-colors">Connexion</Link>

          </li>
          <li>
            <Link href="/register" className="hover:text-blueViolet transition-colors">Inscription</Link>

          </li>
        </ul>
      </nav>
    </header>
  );
}

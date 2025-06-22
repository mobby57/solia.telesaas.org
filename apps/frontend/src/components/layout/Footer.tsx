import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-darkGray text-offWhite py-6 text-center text-sm font-primary">
      <Link href="/contact" className="mx-2 hover:text-goldenYellow transition-colors">Contact</Link>
      {' | '}
      <Link href="/cgu" className="mx-2 hover:text-goldenYellow transition-colors">CGU</Link>
      {' | '}
      <Link href="/privacy" className="mx-2 hover:text-goldenYellow transition-colors">Politique de confidentialité</Link>

    </footer>
  );
}

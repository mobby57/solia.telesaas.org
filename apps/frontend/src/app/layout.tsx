import './globals.css'
import type { ReactNode } from 'react'
import LogoSolia from '../components/LogoSolia'
import Link from 'next/link';

export const metadata = {
  title: 'Solia App',
  description: 'Accessibility improved layout',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header className="bg-gray-100 p-4 shadow">
          <nav className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <LogoSolia />
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="text-blue-600 hover:underline font-semibold">Home</Link>
              <Link href="/login" className="text-blue-600 hover:underline font-semibold">Login</Link>
              <Link href="/register" className="text-blue-600 hover:underline font-semibold">Register</Link>

            </div>
          </nav>
        </header>
        <main role="main" className="px-4 py-8 max-w-4xl mx-auto">
          {children}
        </main>
        <footer className="text-center p-4 text-gray-500">
          {/* Add your footer content here */}
        </footer>
      </body>
    </html>
  )
}

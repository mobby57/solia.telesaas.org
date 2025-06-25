import '../src/styles/globals.css'
import { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import { Header } from '../src/components/ui/Header'
import { Sidebar } from '../src/components/ui/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Solia',
  description: 'Solia SaaS platform',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // Provide sidebar items as required by Sidebar component
  const sidebarItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Missions', href: '/missions' },
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' },
  ]

  return (
    <html lang="fr" className="dark">
      <body className={inter.className + ' bg-violetPastel text-gray-900 dark:text-gray-100'}>
        <Header />
        <div className="flex min-h-screen">
          <Sidebar items={sidebarItems} />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

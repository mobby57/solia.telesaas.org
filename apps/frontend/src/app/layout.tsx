import '../styles/globals.css'
import React from 'react'

export const metadata = {
  title: 'Solia',
  description: 'Solia Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}

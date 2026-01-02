import type { Metadata } from 'next'
import { LanguageProvider } from './contexts/LanguageContext'
import IPTracker from './components/IPTracker'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pardon - Official Return to the Network',
  description: 'pardon was created in December 2024. We are announcing its official return to the network.',
  keywords: 'pardon, telegram, channel, chat, bot',
  openGraph: {
    title: 'Pardon - Official Return to the Network',
    description: 'pardon was created in December 2024. We are announcing its official return to the network.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Comfortaa:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>
          <IPTracker />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}


import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EOI Booking | Premium Residences',
  description: 'Register your expression of interest for premium residential units',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

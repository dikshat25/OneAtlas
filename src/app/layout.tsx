import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { MegaNav } from '@/components/nav/MegaNav'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'OneAtlas | Build Internal Tools, Deploy in Seconds',
  description: 'OneAtlas generates operational apps, dashboards, and workflows from a single prompt.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <MegaNav />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}

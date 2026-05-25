import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { MegaNav } from '@/components/nav/MegaNav'
import { Footer } from '@/components/layout/Footer'
import { AuthProvider } from '@/components/providers/AuthProvider'

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
      <body className={`${inter.variable} antialiased selection:bg-primary/20 selection:text-primary`}>
        <AuthProvider>
          <MegaNav />
          <main className="flex-1 relative">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

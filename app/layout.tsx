import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'
import { Navbar } from '@/components/navbar'
import { CartProvider } from '@/lib/cart-context'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KHUSHIBOX - Premium Personalized Gifts',
  description: 'Discover premium personalized gifts at KHUSHIBOX. Made Personal • Made Timeless',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#b91c1c',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}

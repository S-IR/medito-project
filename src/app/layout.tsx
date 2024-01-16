import type { Metadata } from 'next'
import { Inter, Mali, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import Providers from './providers'
import { atom } from 'jotai'
import Nav from '@/components/Nav'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sourceSerifFour = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
})
const mali = Mali({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-mali',
})
export const metadata: Metadata = {
  title: 'Donation Website',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='dark' lang="en">
      <body
        className={`flex flex-col ${inter.variable} ${sourceSerifFour.variable} ${mali.variable}`}
      >
        <Providers>
          <Nav />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

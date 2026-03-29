import type { Metadata } from 'next'
import { Syne, Instrument_Sans } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Moksh Siruvani — Engineer & Builder',
  description:
    '16. Graduating early. Building software that ships — from autonomous SEO platforms to wildfire detection agents.',
  openGraph: {
    title: 'Moksh Siruvani — Engineer & Builder',
    description:
      'Building software that ships — from autonomous SEO platforms to wildfire detection agents.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${instrumentSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}

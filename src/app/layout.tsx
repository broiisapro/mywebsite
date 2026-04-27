import type { Metadata } from 'next'
import { Syne, Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'

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

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Moksh Siruvani — Engineer & Builder',
  description:
    '16. Graduating early. Building software that ships — from autonomous SEO platforms to wildfire detection agents.',
  alternates: {
    canonical: 'https://broiisapro.github.io/mywebsite',
  },
  openGraph: {
    title: 'Moksh Siruvani — Engineer & Builder',
    description:
      'Building software that ships — from autonomous SEO platforms to wildfire detection agents.',
    url: 'https://broiisapro.github.io/mywebsite',
    siteName: 'Moksh Siruvani',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Moksh Siruvani — Engineer & Builder',
    description:
      '16. Graduating early. Building software that ships — from autonomous SEO platforms to wildfire detection agents.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}

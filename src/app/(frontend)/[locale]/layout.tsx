import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Header, Footer } from '@/components/layout'
import type { Locale } from '@/lib/utils'
import '../../globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Lead From The Front',
    default: 'Lead From The Front',
  },
  description: 'Empowering communities through leadership, mentorship, and education.',
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validLocale = (locale === 'es' ? 'es' : 'en') as Locale

  return (
    <html lang={validLocale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header locale={validLocale} />
        <main>{children}</main>
        <Footer locale={validLocale} />
      </body>
    </html>
  )
}

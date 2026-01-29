import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lead From The Front',
  description: 'Empowering communities through leadership, mentorship, and education.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

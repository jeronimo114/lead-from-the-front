'use client'

import Link from 'next/link'
import { Container, Section, Button } from '@/components/ui'
import type { Locale } from '@/lib/utils'

interface Highlight {
  id: string
  title: string
  description?: string
  linkUrl?: string
  linkText?: string
}

interface HighlightsProps {
  locale: Locale
  highlights: Highlight[]
  title?: string
}

// Image placeholder SVG matching the PDF style
const ImagePlaceholder = () => (
  <div className="aspect-[4/3] bg-secondary-100 rounded-lg flex items-center justify-center">
    <svg viewBox="0 0 100 80" className="w-16 h-12 text-secondary-300">
      <rect x="10" y="10" width="80" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="35" cy="35" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 60 L40 45 L55 55 L80 35 L80 60 Z" fill="currentColor" opacity="0.3" />
    </svg>
  </div>
)

export function Highlights({ locale, highlights, title }: HighlightsProps) {
  const defaultTitle = 'Highlights'

  // Default highlights matching PDF
  const displayHighlights = highlights.length > 0 ? highlights : [
    {
      id: '1',
      title: locale === 'en' ? 'Impact at a glance' : 'Impacto de un vistazo',
      description: 'Lorem ipsum dolor sit amet consectetur. Lacus velit ut urna vitae commodo arcu consequat feugiat sit.',
      linkUrl: '/what-we-do',
      linkText: locale === 'en' ? 'Learn More' : 'Saber mas',
    },
    {
      id: '2',
      title: locale === 'en' ? 'Community reach' : 'Alcance comunitario',
      description: 'Lorem ipsum dolor sit amet consectetur. Lacus velit ut urna vitae commodo arcu consequat feugiat sit.',
      linkUrl: '/what-we-do',
      linkText: locale === 'en' ? 'Learn More' : 'Saber mas',
    },
    {
      id: '3',
      title: locale === 'en' ? 'Leaders trained' : 'Lideres formados',
      description: 'Lorem ipsum dolor sit amet consectetur. Lacus velit ut urna vitae commodo arcu consequat feugiat sit.',
      linkUrl: '/stories',
      linkText: locale === 'en' ? 'Learn More' : 'Saber mas',
    },
  ]

  return (
    <Section>
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 text-center mb-12">
          {title || defaultTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {displayHighlights.map((highlight, index) => (
            <div
              key={highlight.id}
              className="bg-white rounded-2xl shadow-sm border border-secondary-100 overflow-hidden"
            >
              <div className="p-6">
                <ImagePlaceholder />
              </div>
              <div className="px-6 pb-6">
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {highlight.title}
                </h3>
                {highlight.description && (
                  <p className="text-secondary-600 text-sm mb-4 leading-relaxed">
                    {highlight.description}
                  </p>
                )}
                {highlight.linkUrl && (
                  <Link href={`/${locale}${highlight.linkUrl}`}>
                    {/* Alternating button styles: first outlined, second filled, third outlined */}
                    <Button
                      variant={index === 1 ? 'primary' : 'outline'}
                      size="sm"
                    >
                      {highlight.linkText || (locale === 'en' ? 'Learn More' : 'Saber mas')}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

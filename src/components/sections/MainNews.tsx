'use client'

import Link from 'next/link'
import { Container, Section } from '@/components/ui'
import type { Locale } from '@/lib/utils'

interface Story {
  id: string
  title: string
  slug: string
  excerpt?: string
  titleAccent?: string
}

interface MainNewsProps {
  locale: Locale
  story: Story | null
  title?: string
}

// Image placeholder matching PDF
const ImagePlaceholder = () => (
  <div className="aspect-video bg-secondary-100 rounded-lg flex items-center justify-center">
    <svg viewBox="0 0 100 80" className="w-20 h-16 text-secondary-300">
      <rect x="10" y="10" width="80" height="60" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="35" cy="35" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 60 L40 45 L55 55 L80 35 L80 60 Z" fill="currentColor" opacity="0.3" />
    </svg>
  </div>
)

export function MainNews({ locale, story, title }: MainNewsProps) {
  const defaultTitle = locale === 'en' ? 'Main news' : 'Noticias principales'

  // Default story if none provided
  const displayStory = story || {
    id: '1',
    title: 'Leading forward:',
    titleAccent: 'initiative highlights',
    slug: 'leading-forward',
    excerpt: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.',
  }

  return (
    <Section>
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 text-center mb-12">
          {title || defaultTitle}
        </h2>

        <div className="bg-white rounded-2xl shadow-sm border border-secondary-100 p-8 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Image placeholder */}
            <ImagePlaceholder />

            {/* Content */}
            <div>
              <h3 className="text-xl font-bold text-secondary-900 mb-1">
                {displayStory.title}{' '}
                <span className="text-primary-500 italic">
                  {displayStory.titleAccent || ''}
                </span>
              </h3>
              {displayStory.excerpt && (
                <p className="text-secondary-600 text-sm leading-relaxed mt-4">
                  {displayStory.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

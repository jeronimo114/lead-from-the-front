'use client'

import React from 'react'
import { Container, Section } from '@/components/ui'
import type { Locale } from '@/lib/utils'

interface WhoWeServeProps {
  locale: Locale
  title?: string
}

// Image placeholder matching PDF
const ImagePlaceholder = () => (
  <div className="w-20 h-20 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
    <svg viewBox="0 0 60 50" className="w-10 h-8 text-secondary-300">
      <rect x="5" y="5" width="50" height="40" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 38 L25 28 L35 34 L50 22 L50 38 Z" fill="currentColor" opacity="0.3" />
    </svg>
  </div>
)

const content = {
  en: {
    title: 'Who we serve',
    groups: [
      {
        id: '1',
        title: 'Veterans',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat',
      },
      {
        id: '2',
        title: 'Community Leaders',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat',
      },
      {
        id: '3',
        title: 'Partners',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad',
      },
    ],
  },
  es: {
    title: 'A quienes servimos',
    groups: [
      {
        id: '1',
        title: 'Veteranos',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat',
      },
      {
        id: '2',
        title: 'Lideres Comunitarios',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat',
      },
      {
        id: '3',
        title: 'Socios',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad',
      },
    ],
  },
}

export function WhoWeServe({ locale, title }: WhoWeServeProps) {
  const t = content[locale]

  return (
    <Section variant="light">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 text-center mb-12">
          {title || t.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {t.groups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-xl p-6 border-l-4 border-primary-100 shadow-sm flex gap-4"
            >
              <ImagePlaceholder />
              <div>
                <h3 className="text-lg font-semibold text-primary-600 mb-2">
                  {group.title}
                </h3>
                <p className="text-secondary-600 text-sm leading-relaxed">
                  {group.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

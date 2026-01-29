'use client'

import React from 'react'
import Link from 'next/link'
import { Container, Section, Button } from '@/components/ui'
import type { Locale } from '@/lib/utils'

interface Pillar {
  id: string
  title: string
  description?: string
}

interface OurPillarsProps {
  locale: Locale
  pillars: Pillar[]
  title?: string
}

export function OurPillars({ locale, pillars, title }: OurPillarsProps) {
  const defaultTitle = locale === 'en' ? 'Our pillars' : 'Nuestros pilares'

  // Default pillars matching PDF
  const displayPillars = pillars.length > 0 ? pillars : [
    {
      id: '1',
      title: locale === 'en' ? 'Leadership' : 'Liderazgo',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim.',
    },
    {
      id: '2',
      title: locale === 'en' ? 'Community' : 'Comunidad',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim.',
    },
    {
      id: '3',
      title: locale === 'en' ? 'Impact' : 'Impacto',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim.',
    },
    {
      id: '4',
      title: locale === 'en' ? 'Resources' : 'Recursos',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim.',
    },
  ]

  return (
    <Section variant="light">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 text-center mb-12">
          {title || defaultTitle}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPillars.map((pillar, index) => (
            <div
              key={pillar.id}
              className="bg-white rounded-xl p-6 border-l-4 border-primary-500 shadow-sm"
            >
              <h3 className="text-lg font-bold text-secondary-900 mb-3">
                {pillar.title}
              </h3>
              {pillar.description && (
                <p className="text-secondary-600 text-sm leading-relaxed mb-4">
                  {pillar.description}
                </p>
              )}
              <Link href={`/${locale}/what-we-do`}>
                {/* Alternating button styles matching PDF */}
                <Button
                  variant={index === 0 || index === 2 ? 'primary' : 'outline'}
                  size="sm"
                >
                  {locale === 'en' ? 'Learn More' : 'Saber mas'}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

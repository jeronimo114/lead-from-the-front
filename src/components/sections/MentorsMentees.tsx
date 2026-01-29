'use client'

import Link from 'next/link'
import { Container, Section } from '@/components/ui'
import type { Locale } from '@/lib/utils'

interface MentorsMenteesProps {
  locale: Locale
  title?: string
  subtitle?: string
}

const content = {
  en: {
    title: 'Mentors & mentess',
    subtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl',
    mentor: {
      title: 'Support for mentors',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo',
      link: 'Explore mentor resources',
    },
    mentee: {
      title: 'Growth for mentess',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo',
      link: 'Discover mentee pathways',
    },
  },
  es: {
    title: 'Mentores y aprendices',
    subtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl',
    mentor: {
      title: 'Apoyo para mentores',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo',
      link: 'Explorar recursos para mentores',
    },
    mentee: {
      title: 'Crecimiento para aprendices',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo',
      link: 'Descubrir caminos para aprendices',
    },
  },
}

export function MentorsMentees({ locale, title, subtitle }: MentorsMenteesProps) {
  const t = content[locale]

  return (
    <Section>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            {title || t.title}
          </h2>
          <p className="text-secondary-600 max-w-4xl mx-auto">
            {subtitle || t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mentor Card */}
          <div className="bg-primary-50 rounded-xl p-8 border-t-4 border-primary-500">
            <h3 className="text-lg font-semibold text-primary-700 mb-4 underline underline-offset-4">
              {t.mentor.title}
            </h3>
            <p className="text-secondary-600 text-sm leading-relaxed mb-6">
              {t.mentor.description}
            </p>
            <Link
              href={`/${locale}/get-involved#mentor`}
              className="inline-flex items-center gap-2 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors underline underline-offset-4"
            >
              {t.mentor.link}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mentee Card */}
          <div className="bg-primary-50 rounded-xl p-8 border-t-4 border-primary-500">
            <h3 className="text-lg font-semibold text-primary-700 mb-4 underline underline-offset-4">
              {t.mentee.title}
            </h3>
            <p className="text-secondary-600 text-sm leading-relaxed mb-6">
              {t.mentee.description}
            </p>
            <Link
              href={`/${locale}/get-involved#mentee`}
              className="inline-flex items-center gap-2 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors underline underline-offset-4"
            >
              {t.mentee.link}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}

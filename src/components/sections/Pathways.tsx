'use client'

import React from 'react'
import Link from 'next/link'
import { Container, Section } from '@/components/ui'
import type { Locale } from '@/lib/utils'

interface PathwaysProps {
  locale: Locale
}

const content = {
  en: {
    title: 'Mentor and mentee pathways',
    subtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl',
    mentor: {
      title: 'Become a mentor',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo',
      link: 'Sing up to mentor',
    },
    mentee: {
      title: 'Apply as a mentee',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo',
      link: 'Start your mentee application',
    },
  },
  es: {
    title: 'Caminos para mentores y aprendices',
    subtitle: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl',
    mentor: {
      title: 'Conviertete en mentor',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo',
      link: 'Registrate como mentor',
    },
    mentee: {
      title: 'Aplica como aprendiz',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo',
      link: 'Comienza tu aplicacion',
    },
  },
}

export function Pathways({ locale }: PathwaysProps) {
  const t = content[locale]

  return (
    <Section>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            {t.title}
          </h2>
          <p className="text-secondary-600 max-w-4xl mx-auto">
            {t.subtitle}
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
              href={`/${locale}/get-involved#mentor-form`}
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
              href={`/${locale}/get-involved#mentee-form`}
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

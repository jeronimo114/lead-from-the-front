'use client'

import React from 'react'
import { Container } from '@/components/ui'
import type { Locale } from '@/lib/utils'

interface QuickFactsProps {
  locale: Locale
}

const content = {
  en: {
    title: 'Quick facts',
    facts: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Aenean efficitur libero sed magna tempus accumsan.',
      'Etiam tempus nunc non dui ultricies lacinia nec ut massa.',
      'Vivamus id tellus nec est aliquet rhoncus ut sed ligula.',
    ],
  },
  es: {
    title: 'Datos rapidos',
    facts: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Aenean efficitur libero sed magna tempus accumsan.',
      'Etiam tempus nunc non dui ultricies lacinia nec ut massa.',
      'Vivamus id tellus nec est aliquet rhoncus ut sed ligula.',
    ],
  },
}

export function QuickFacts({ locale }: QuickFactsProps) {
  const t = content[locale]

  return (
    <div className="bg-primary-500 rounded-xl p-6 text-white">
      <h3 className="text-xl font-bold mb-4">{t.title}</h3>
      <ul className="space-y-3">
        {t.facts.map((fact, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <span className="text-primary-200 mt-1">*</span>
            <span className="text-white/90">{fact}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

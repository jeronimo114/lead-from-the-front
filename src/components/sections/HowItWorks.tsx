'use client'

import React from 'react'
import { Container, Section } from '@/components/ui'
import type { Locale } from '@/lib/utils'

interface HowItWorksProps {
  locale: Locale
}

// Icons matching PDF exactly - people, puzzle, plant in green circles
const StepIcon = ({ type, isHighlighted }: { type: string; isHighlighted?: boolean }) => {
  const iconColor = isHighlighted ? '#ffffff' : '#22c55e'
  const bgColor = isHighlighted ? '#22c55e' : '#dcfce7'

  const icons: Record<string, React.ReactElement> = {
    connect: (
      <svg viewBox="0 0 60 60" className="w-16 h-16">
        <circle cx="30" cy="30" r="28" fill={bgColor} />
        <g fill={iconColor}>
          {/* Two people connected */}
          <circle cx="22" cy="22" r="6" />
          <path d="M14 42 L14 34 C14 30 18 28 22 28 C26 28 30 30 30 34 L30 42 Z" />
          <circle cx="38" cy="22" r="6" />
          <path d="M30 42 L30 34 C30 30 34 28 38 28 C42 28 46 30 46 34 L46 42 Z" />
        </g>
      </svg>
    ),
    equip: (
      <svg viewBox="0 0 60 60" className="w-16 h-16">
        <circle cx="30" cy="30" r="28" fill={bgColor} />
        <g fill={iconColor}>
          {/* Puzzle pieces */}
          <path d="M18 24 L18 20 C18 18 20 16 22 16 L26 16 C26 14 28 12 30 12 C32 12 34 14 34 16 L38 16 C40 16 42 18 42 20 L42 24 C44 24 46 26 46 28 C46 30 44 32 42 32 L42 36 C42 38 40 40 38 40 L34 40 C34 42 32 44 30 44 C28 44 26 42 26 40 L22 40 C20 40 18 38 18 36 L18 32 C16 32 14 30 14 28 C14 26 16 24 18 24 Z" />
        </g>
      </svg>
    ),
    lead: (
      <svg viewBox="0 0 60 60" className="w-16 h-16">
        <circle cx="30" cy="30" r="28" fill={bgColor} />
        <g fill={iconColor}>
          {/* Plant/growth icon */}
          <path d="M30 48 L30 32" stroke={iconColor} strokeWidth="3" fill="none" />
          <path d="M30 32 C30 24 22 20 16 24 C22 22 26 26 30 32" />
          <path d="M30 28 C30 20 38 16 44 20 C38 18 34 22 30 28" />
          <circle cx="30" cy="16" r="4" />
        </g>
      </svg>
    ),
  }
  return icons[type] || null
}

const content = {
  en: {
    title: 'How it works',
    steps: [
      {
        icon: 'connect',
        title: 'Connect',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
      },
      {
        icon: 'equip',
        title: 'Equip',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
        highlighted: true,
      },
      {
        icon: 'lead',
        title: 'Lead',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
      },
    ],
  },
  es: {
    title: 'Como funciona',
    steps: [
      {
        icon: 'connect',
        title: 'Conectar',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
      },
      {
        icon: 'equip',
        title: 'Equipar',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
        highlighted: true,
      },
      {
        icon: 'lead',
        title: 'Liderar',
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh.',
      },
    ],
  },
}

export function HowItWorks({ locale }: HowItWorksProps) {
  const t = content[locale]

  return (
    <Section>
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 text-center mb-12">
          {t.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {t.steps.map((step, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 text-center ${
                step.highlighted
                  ? 'bg-primary-500 text-white'
                  : 'bg-white border border-secondary-200'
              }`}
            >
              <div className="flex justify-center mb-4">
                <StepIcon type={step.icon} isHighlighted={step.highlighted} />
              </div>
              <h3
                className={`text-xl font-semibold mb-3 ${
                  step.highlighted ? 'text-white' : 'text-secondary-900'
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  step.highlighted ? 'text-white/90' : 'text-secondary-600'
                }`}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

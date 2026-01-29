'use client'

import Link from 'next/link'
import { Container, Button } from '@/components/ui'
import type { Locale } from '@/lib/utils'

interface ShareExperienceProps {
  locale: Locale
}

const content = {
  en: {
    title: 'Share your experience',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut',
    cta: 'Submit a storie',
  },
  es: {
    title: 'Comparte tu experiencia',
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut',
    cta: 'Enviar una historia',
  },
}

export function ShareExperience({ locale }: ShareExperienceProps) {
  const t = content[locale]

  return (
    <section className="bg-primary-500 py-12">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-white/90 text-sm leading-relaxed mb-6">
            {t.description}
          </p>
          <Link href={`/${locale}/get-involved#share-story`}>
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-secondary-900 border-white hover:bg-secondary-100"
            >
              {t.cta}
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}

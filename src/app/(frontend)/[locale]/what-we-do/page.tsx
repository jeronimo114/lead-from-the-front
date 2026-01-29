import type { Metadata } from 'next'
import { OurPillars, MentorsMentees, WhoWeServe, QuickFacts } from '@/components/sections'
import { Container } from '@/components/ui'
import { getPillars } from '@/lib/payload'
import type { Locale } from '@/lib/utils'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === 'es'

  return {
    title: isEs ? 'Que Hacemos' : 'What We Do',
    description: isEs
      ? 'Descubre nuestra mision, programas y el impacto que estamos generando en nuestra comunidad.'
      : 'Discover our mission, programs, and the impact we are making in our community.',
  }
}

const heroContent = {
  en: {
    title: 'WHAT WE DO',
    titleAccent: 'Lorem ipsum',
    description: 'We empower leaders to serve their communities through mentorship. Resources, and measurable impact.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n\nDuis autem vel eum iriure dolor in hendrerit in vulputate velit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy',
  },
  es: {
    title: 'QUE HACEMOS',
    titleAccent: 'Lorem ipsum',
    description: 'Empoderamos lideres para servir a sus comunidades a traves de mentoria. Recursos e impacto medible. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.\n\nDuis autem vel eum iriure dolor in hendrerit in vulputate velit Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy',
  },
}

interface PillarData {
  id: string
  title: string
  description?: string
}

export default async function WhatWeDoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const validLocale = (locale === 'es' ? 'es' : 'en') as Locale

  // Fetch data from Payload CMS
  const pillars = await getPillars(validLocale).catch(() => [])

  const hero = heroContent[validLocale]

  // Transform data for components
  const pillarsData: PillarData[] = (pillars as unknown[]).map((p) => {
    const pillar = p as Record<string, unknown>
    return {
      id: String(pillar.id || ''),
      title: String(pillar.title || ''),
      description: typeof pillar.description === 'string' ? pillar.description : '',
    }
  })

  return (
    <>
      {/* Hero Section with Quick Facts box */}
      <section className="bg-gradient-to-r from-white via-white to-primary-50 py-12 lg:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left content */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 mb-2">
                {hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-primary-500 italic mb-6">
                {hero.titleAccent}
              </p>
              <p className="text-secondary-600 leading-relaxed whitespace-pre-line">
                {hero.description}
              </p>
            </div>

            {/* Right - Quick Facts box */}
            <div className="lg:mt-12">
              <QuickFacts locale={validLocale} />
            </div>
          </div>
        </Container>
      </section>

      <OurPillars
        locale={validLocale}
        pillars={pillarsData}
      />

      <MentorsMentees locale={validLocale} />

      <WhoWeServe locale={validLocale} />
    </>
  )
}

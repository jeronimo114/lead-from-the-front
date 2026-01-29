import type { Metadata } from 'next'
import Image from 'next/image'
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
      {/* Hero Section with full-width background and Quick Facts box */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-nyc-street.jpg"
            alt="New York City street"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Dark and Green Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 via-secondary-900/70 to-primary-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-secondary-900/40" />

        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start py-12 lg:py-20">
            {/* Left content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                {hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-primary-400 italic mb-6">
                {hero.titleAccent}
              </p>
              <p className="text-white/90 leading-relaxed whitespace-pre-line text-lg max-w-xl">
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

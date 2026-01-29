import type { Metadata } from 'next'
import { Hero, Highlights, HowItWorks, Partners } from '@/components/sections'
import { getHighlights, getPartners } from '@/lib/payload'
import type { Locale } from '@/lib/utils'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === 'es'

  return {
    title: isEs ? 'Inicio' : 'Home',
    description: isEs
      ? 'Lead From The Front - Empoderando comunidades a traves del liderazgo, mentoria y educacion.'
      : 'Lead From The Front - Empowering communities through leadership, mentorship, and education.',
  }
}

const heroContent = {
  en: {
    title: 'LEAD FROM THE FRONT:',
    titleAccent: 'turning commitment into action',
    subtitle: 'We empower leaders to serve their communities through mentorship. Resources, and measurable impact.',
    ctaText: 'Get Involved',
    secondaryCtaText: 'Donate',
  },
  es: {
    title: 'LEAD FROM THE FRONT:',
    titleAccent: 'convirtiendo compromiso en accion',
    subtitle: 'Empoderamos lideres para servir a sus comunidades a traves de mentoria. Recursos e impacto medible.',
    ctaText: 'Participa',
    secondaryCtaText: 'Donar',
  },
}

interface HighlightData {
  id: string
  title: string
  description?: string
  image?: { url: string; alt: string }
  linkUrl?: string
  linkText?: string
}

interface PartnerData {
  id: string
  name: string
  logo?: { url: string; alt?: string }
  website?: string
  tier?: 'gold' | 'silver' | 'bronze'
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const validLocale = (locale === 'es' ? 'es' : 'en') as Locale

  // Fetch data from Payload CMS
  const [highlights, partners] = await Promise.all([
    getHighlights(validLocale).catch(() => []),
    getPartners().catch(() => []),
  ])

  const hero = heroContent[validLocale]

  // Transform data for components
  const highlightsData: HighlightData[] = (highlights as unknown[]).map((h) => {
    const highlight = h as Record<string, unknown>
    const image = highlight.image as { url?: string; alt?: string } | undefined
    return {
      id: String(highlight.id || ''),
      title: String(highlight.title || ''),
      description: highlight.description as string | undefined,
      image: image?.url ? { url: image.url, alt: image.alt || String(highlight.title || '') } : undefined,
      linkUrl: highlight.linkUrl as string | undefined,
      linkText: highlight.linkText as string | undefined,
    }
  })

  const partnersData: PartnerData[] = (partners as unknown[]).map((p) => {
    const partner = p as Record<string, unknown>
    const logo = partner.logo as { url?: string; alt?: string } | undefined
    return {
      id: String(partner.id || ''),
      name: String(partner.name || ''),
      logo: logo?.url ? { url: logo.url, alt: logo.alt } : undefined,
      website: partner.website as string | undefined,
      tier: partner.tier as 'gold' | 'silver' | 'bronze' | undefined,
    }
  })

  return (
    <>
      <Hero
        locale={validLocale}
        title={hero.title}
        titleAccent={hero.titleAccent}
        subtitle={hero.subtitle}
        ctaText={hero.ctaText}
        ctaLink="/get-involved"
        secondaryCtaText={hero.secondaryCtaText}
        secondaryCtaLink="/get-involved#donate"
      />

      <Highlights
        locale={validLocale}
        highlights={highlightsData}
        title="Highlights"
      />

      <HowItWorks locale={validLocale} />

      <Partners locale={validLocale} partners={partnersData} />
    </>
  )
}

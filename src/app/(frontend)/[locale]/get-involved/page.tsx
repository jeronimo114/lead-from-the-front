import type { Metadata } from 'next'
import { Hero, Pathways, Partners } from '@/components/sections'
import { DonateForm, VolunteerForm, SubscribeForm } from '@/components/forms'
import { Container, Section } from '@/components/ui'
import { getPartners } from '@/lib/payload'
import type { Locale } from '@/lib/utils'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === 'es'

  return {
    title: isEs ? 'Participa' : 'Get Involved',
    description: isEs
      ? 'Unete a nuestra mision. Dona, hazte voluntario, o conviertete en mentor o mentee.'
      : 'Join our mission. Donate, volunteer, or become a mentor or mentee.',
  }
}

const heroContent = {
  en: {
    title: 'GET INVOLVED',
    titleAccent: 'Lorem ipsum Lorem ipsum',
    subtitle: 'We empower leaders to serve their communities through mentorship. Resources, and measurable impact.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed',
  },
  es: {
    title: 'PARTICIPA',
    titleAccent: 'Lorem ipsum Lorem ipsum',
    subtitle: 'Empoderamos lideres para servir a sus comunidades a traves de mentoria. Recursos e impacto medible. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed',
  },
}

interface PartnerData {
  id: string
  name: string
  logo?: { url: string; alt?: string }
  website?: string
  tier?: 'gold' | 'silver' | 'bronze'
}

export default async function GetInvolvedPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const validLocale = (locale === 'es' ? 'es' : 'en') as Locale

  const partners = await getPartners().catch(() => [])

  const hero = heroContent[validLocale]

  // Transform partners data
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
        variant="page"
        backgroundImage="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80"
      />

      <Pathways locale={validLocale} />

      {/* Three forms side by side matching PDF */}
      <Section variant="light">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            <DonateForm locale={validLocale} />
            <VolunteerForm locale={validLocale} />
            <SubscribeForm locale={validLocale} variant="card" />
          </div>
        </Container>
      </Section>

      <Partners
        locale={validLocale}
        partners={partnersData}
        title={validLocale === 'en' ? 'Partners & sponsors' : 'Socios y patrocinadores'}
      />
    </>
  )
}

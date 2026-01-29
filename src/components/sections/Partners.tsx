'use client'

import Image from 'next/image'
import { Container } from '@/components/ui'
import type { Locale } from '@/lib/utils'

interface Partner {
  id: string
  name: string
  logo?: { url: string; alt?: string }
  website?: string
}

interface PartnersProps {
  locale: Locale
  partners: Partner[]
  title?: string
  subtitle?: string
}

// Circular image placeholder matching PDF
const LogoPlaceholder = () => (
  <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-sm">
    <svg viewBox="0 0 60 50" className="w-10 h-8 text-secondary-300">
      <rect x="5" y="5" width="50" height="40" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 38 L25 28 L35 34 L50 22 L50 38 Z" fill="currentColor" opacity="0.3" />
    </svg>
  </div>
)

export function Partners({ locale, partners, title, subtitle }: PartnersProps) {
  const defaultTitle = locale === 'en' ? 'Partners & supporters' : 'Socios y patrocinadores'
  const defaultSubtitle = 'Lorem ipsum dolor sit amet consectetur aenean porta libero nisl sit elementum.'

  // Show 5 placeholder circles if no partners
  const displayCount = partners.length > 0 ? partners.length : 5

  return (
    <section className="bg-primary-500 py-16">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title || defaultTitle}
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.length > 0 ? (
            partners.map((partner) => (
              <div key={partner.id}>
                {partner.logo?.url ? (
                  partner.website ? (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      aria-label={partner.name}
                    >
                      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center p-4 shadow-sm hover:shadow-md transition-shadow">
                        <Image
                          src={partner.logo.url}
                          alt={partner.logo.alt || partner.name}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                    </a>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center p-4 shadow-sm">
                      <Image
                        src={partner.logo.url}
                        alt={partner.logo.alt || partner.name}
                        width={60}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                  )
                ) : (
                  <LogoPlaceholder />
                )}
              </div>
            ))
          ) : (
            // Show placeholder circles
            Array.from({ length: displayCount }).map((_, index) => (
              <LogoPlaceholder key={index} />
            ))
          )}
        </div>
      </Container>
    </section>
  )
}

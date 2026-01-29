'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Container, Button } from '@/components/ui'
import type { Locale } from '@/lib/utils'

interface HeroProps {
  locale: Locale
  title: string
  titleAccent?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  variant?: 'home' | 'page'
  backgroundImage?: string
}

export function Hero({
  locale,
  title,
  titleAccent,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  variant = 'home',
  backgroundImage,
}: HeroProps) {
  if (variant === 'page' && backgroundImage) {
    // Page hero with full-width background image (Stories, Get Involved pages)
    return (
      <section
        className="relative min-h-[400px] flex items-end pb-16"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <Container className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            {title}
          </h1>
          {titleAccent && (
            <p className="text-xl md:text-2xl text-primary-400 italic">
              {titleAccent}
            </p>
          )}
          {subtitle && (
            <p className="text-white/90 mt-4 max-w-xl">
              {subtitle}
            </p>
          )}
        </Container>
      </section>
    )
  }

  // Home page hero - full-width background with dark/green gradient overlay
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-capitol.jpg"
          alt="U.S. Capitol Building"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark and Green Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 via-secondary-900/70 to-primary-900/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-secondary-900/40" />

      <Container className="relative z-10">
        <div className="max-w-2xl py-12 lg:py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
            {title}
          </h1>
          {titleAccent && (
            <p className="text-2xl md:text-3xl lg:text-4xl text-primary-400 italic font-medium mb-6">
              {titleAccent}
            </p>
          )}
          {subtitle && (
            <p className="text-white/90 mb-8 max-w-lg leading-relaxed text-lg">
              {subtitle}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            {ctaText && ctaLink && (
              <Link href={ctaLink.startsWith('/') ? `/${locale}${ctaLink}` : ctaLink}>
                <Button size="lg" className="uppercase tracking-wide">
                  {ctaText}
                </Button>
              </Link>
            )}
            {secondaryCtaText && secondaryCtaLink && (
              <Link href={secondaryCtaLink.startsWith('/') ? `/${locale}${secondaryCtaLink}` : secondaryCtaLink}>
                <Button variant="outline" size="lg" className="uppercase tracking-wide border-white text-white hover:bg-white/10">
                  {secondaryCtaText}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

'use client'

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

  // Home page hero - matching PDF exactly
  return (
    <section className="relative overflow-hidden">
      {/* Green gradient on right side */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-400/30 via-primary-300/20 to-transparent" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-8 items-center py-12 lg:py-20">
          {/* Left content */}
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 mb-1">
              {title}
            </h1>
            {titleAccent && (
              <p className="text-2xl md:text-3xl lg:text-4xl text-primary-500 italic font-medium mb-6">
                {titleAccent}
              </p>
            )}
            {subtitle && (
              <p className="text-secondary-600 mb-8 max-w-md leading-relaxed">
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
                  <Button variant="outline" size="lg" className="uppercase tracking-wide">
                    {secondaryCtaText}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Right side - Person silhouette placeholder */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-md ml-auto">
              {/* Gray silhouette placeholder matching PDF */}
              <svg viewBox="0 0 300 350" className="w-full h-full">
                <defs>
                  <linearGradient id="silhouetteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e5e7eb" />
                    <stop offset="100%" stopColor="#d1d5db" />
                  </linearGradient>
                </defs>
                {/* Head */}
                <ellipse cx="150" cy="60" rx="45" ry="50" fill="url(#silhouetteGradient)" />
                {/* Body/shoulders */}
                <path
                  d="M50 350 L50 200 C50 140 100 120 150 120 C200 120 250 140 250 200 L250 350 Z"
                  fill="url(#silhouetteGradient)"
                />
              </svg>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

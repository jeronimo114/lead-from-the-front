'use client'

import React from 'react'
import Link from 'next/link'
import { Container, Button } from '@/components/ui'
import type { Locale } from '@/lib/utils'

interface FooterProps {
  locale: Locale
}

// Social icons in green circles matching PDF
const SocialIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactElement> = {
    facebook: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z M4 20l6.768 -6.768 M17.232 10.768 L20 8" />
      </svg>
    ),
  }
  return icons[type] || null
}

const sitemapLinks = {
  en: [
    { label: 'Home', href: '' },
    { label: 'What We Do', href: '/what-we-do' },
    { label: 'Stories', href: '/stories' },
    { label: 'Get Involved', href: '/get-involved' },
  ],
  es: [
    { label: 'Inicio', href: '' },
    { label: 'Que Hacemos', href: '/what-we-do' },
    { label: 'Historias', href: '/stories' },
    { label: 'Participa', href: '/get-involved' },
  ],
}

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="bg-secondary-800 text-white">
      <Container>
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand & About */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                {/* Green circle with logo mark */}
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
                    <circle cx="6" cy="6" r="2" />
                    <path d="M4 20 L4 12 L2 8 L4 10 L6 7 L8 10 L10 8 L8 12 L8 20 Z" />
                    <circle cx="12" cy="4" r="2.5" />
                    <path d="M9 20 L9 10 L6 5 L9 8 L12 4 L15 8 L18 5 L15 10 L15 20 Z" />
                    <circle cx="18" cy="6" r="2" />
                    <path d="M16 20 L16 12 L14 8 L16 10 L18 7 L20 10 L22 8 L20 12 L20 20 Z" />
                  </svg>
                </div>
                <div className="leading-tight">
                  <div className="font-bold text-white">LEAD FROM</div>
                  <div className="font-bold text-white">THE FRONT</div>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
                {locale === 'en' ? 'About Lead From The Front.org' : 'Sobre Lead From The Front.org'}
              </h3>
              <p className="text-secondary-400 text-sm leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis
              </p>

              {/* Social Links */}
              <div>
                <p className="text-sm text-secondary-400 mb-3">
                  {locale === 'en' ? 'Follow us on' : 'Siguenos en'}
                </p>
                <div className="flex items-center gap-2">
                  {['facebook', 'instagram', 'twitter'].map((social) => (
                    <a
                      key={social}
                      href={`https://${social}.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white hover:bg-primary-600 transition-colors"
                      aria-label={social}
                    >
                      <SocialIcon type={social} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Sitemap */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                Sitemap
              </h3>
              <ul className="space-y-2">
                {sitemapLinks[locale].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={`/${locale}${link.href}`}
                      className="text-secondary-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                Subscribe
              </h3>
              <div className="flex items-center gap-2 mb-4">
                {/* Email icon in green circle */}
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="flex-1 px-4 py-2 rounded-md border border-secondary-600 bg-transparent text-white placeholder-secondary-500 text-sm focus:outline-none focus:border-primary-500"
                />
              </div>
              <Button variant="outline" size="sm" className="border-secondary-600 text-secondary-300 hover:bg-secondary-700 hover:text-white">
                Submit Now
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 border-t border-secondary-700 text-center">
          <p className="text-secondary-500 text-sm">
            Lorem ipsum dolor sit amet consectetur.
          </p>
        </div>
      </Container>
    </footer>
  )
}

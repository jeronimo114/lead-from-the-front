'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/utils'
import { Container } from '@/components/ui'
import { Logo } from '@/components/ui/Logo'
import { Navigation } from './Navigation'
import { LanguageSwitcher } from './LanguageSwitcher'

interface HeaderProps {
  locale: Locale
}

export function Header({ locale }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white py-4">
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`}>
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Navigation locale={locale} />
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-secondary-600 hover:text-secondary-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="relative w-6 h-6">
              <span
                className={cn(
                  'absolute left-0 block w-6 h-0.5 bg-current transition-all duration-300',
                  isMobileMenuOpen ? 'top-3 rotate-45' : 'top-1'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-3 block w-6 h-0.5 bg-current transition-all duration-300',
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 block w-6 h-0.5 bg-current transition-all duration-300',
                  isMobileMenuOpen ? 'top-3 -rotate-45' : 'top-5'
                )}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'md:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-[400px] pt-4' : 'max-h-0'
          )}
        >
          <Navigation
            locale={locale}
            mobile
            onLinkClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="mt-4 pt-4 border-t border-secondary-100">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </Container>
    </header>
  )
}

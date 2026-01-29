'use client'

import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/utils'

interface LanguageSwitcherProps {
  currentLocale: Locale
  className?: string
}

export function LanguageSwitcher({ currentLocale, className }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    router.push(newPath)
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {/* EN circle */}
      <button
        onClick={() => switchLocale('en')}
        className={cn(
          'w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center',
          currentLocale === 'en'
            ? 'bg-primary-500 text-white'
            : 'bg-primary-500 text-white opacity-70 hover:opacity-100'
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      {/* ES circle */}
      <button
        onClick={() => switchLocale('es')}
        className={cn(
          'w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 flex items-center justify-center',
          currentLocale === 'es'
            ? 'bg-primary-500 text-white'
            : 'bg-primary-500 text-white opacity-70 hover:opacity-100'
        )}
        aria-label="Cambiar a Espanol"
      >
        ES
      </button>
    </div>
  )
}

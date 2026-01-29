'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/utils'
import { t } from '@/lib/utils'

interface NavigationProps {
  locale: Locale
  className?: string
  mobile?: boolean
  onLinkClick?: () => void
}

const navItems = [
  { key: 'home', href: '' },
  { key: 'whatWeDo', href: '/what-we-do' },
  { key: 'stories', href: '/stories' },
  { key: 'getInvolved', href: '/get-involved' },
]

export function Navigation({ locale, className, mobile = false, onLinkClick }: NavigationProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    const localePath = `/${locale}${href}`
    if (href === '') {
      return pathname === `/${locale}` || pathname === `/${locale}/`
    }
    return pathname.startsWith(localePath)
  }

  return (
    <nav className={cn(mobile ? 'flex flex-col space-y-2' : 'flex items-center gap-1', className)}>
      {navItems.map((item) => (
        <Link
          key={item.key}
          href={`/${locale}${item.href}`}
          onClick={onLinkClick}
          className={cn(
            'font-medium transition-all duration-200',
            mobile ? 'text-lg py-2 px-4' : 'text-sm px-4 py-2 rounded-full',
            isActive(item.href)
              ? 'bg-white text-secondary-900 shadow-sm border border-secondary-200'
              : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
          )}
        >
          {t(locale, `nav.${item.key}`)}
        </Link>
      ))}
    </nav>
  )
}

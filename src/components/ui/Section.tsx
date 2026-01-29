import { cn } from '@/lib/utils'
import { type HTMLAttributes, forwardRef } from 'react'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'light' | 'dark' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white',
      light: 'bg-secondary-50',
      dark: 'bg-secondary-900 text-white',
      gradient: 'bg-gradient-to-b from-primary-50 to-white',
    }

    const sizes = {
      sm: 'py-12 md:py-16',
      md: 'py-16 md:py-24',
      lg: 'py-24 md:py-32',
    }

    return (
      <section ref={ref} className={cn(variants[variant], sizes[size], className)} {...props}>
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

export { Section }

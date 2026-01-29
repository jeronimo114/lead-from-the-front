import { cn } from '@/lib/utils'
import { type HTMLAttributes, forwardRef } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outline'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const baseStyles = 'rounded-2xl overflow-hidden'

    const variants = {
      default: 'bg-white',
      elevated: 'bg-white shadow-lg shadow-secondary-200/50',
      outline: 'bg-white border border-secondary-200',
    }

    return (
      <div ref={ref} className={cn(baseStyles, variants[variant], className)} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props} />
  )
)

CardHeader.displayName = 'CardHeader'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
)

CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0 flex items-center', className)} {...props} />
  )
)

CardFooter.displayName = 'CardFooter'

const CardImage = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { aspectRatio?: string }>(
  ({ className, aspectRatio = 'aspect-video', ...props }, ref) => (
    <div ref={ref} className={cn('relative w-full', aspectRatio, className)} {...props} />
  )
)

CardImage.displayName = 'CardImage'

export { Card, CardHeader, CardContent, CardFooter, CardImage }

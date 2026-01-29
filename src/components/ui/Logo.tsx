'use client'

import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'full' | 'mark'
}

// Logo matching the PDF exactly - "Lead from the Front" with people silhouettes raising hands
export function Logo({ className, variant = 'full' }: LogoProps) {
  return (
    <div className={cn('flex items-end gap-0', className)}>
      {/* Text part - stacked "Lead from the Front" */}
      {variant === 'full' && (
        <div className="leading-tight mr-0.5">
          <div className="text-[10px] text-secondary-500 italic leading-none">Lead</div>
          <div className="text-[10px] text-secondary-500 italic leading-none">from the</div>
          <div className="text-xl font-bold text-secondary-900 leading-none -mt-0.5">Front</div>
        </div>
      )}
      {/* People silhouettes with raised arms - green */}
      <svg viewBox="0 0 50 40" className="w-12 h-10">
        <g fill="#22c55e">
          {/* Left person */}
          <circle cx="10" cy="10" r="4" />
          <path d="M6 40 L6 22 L2 14 L6 18 L10 12 L14 18 L18 14 L14 22 L14 40 Z" />
          {/* Middle person (taller, arms up higher) */}
          <circle cx="25" cy="6" r="5" />
          <path d="M19 40 L19 20 L13 10 L19 16 L25 8 L31 16 L37 10 L31 20 L31 40 Z" />
          {/* Right person */}
          <circle cx="40" cy="10" r="4" />
          <path d="M36 40 L36 22 L32 14 L36 18 L40 12 L44 18 L48 14 L44 22 L44 40 Z" />
        </g>
      </svg>
    </div>
  )
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 40" className={className || 'w-12 h-10'}>
      <g fill="#22c55e">
        <circle cx="10" cy="10" r="4" />
        <path d="M6 40 L6 22 L2 14 L6 18 L10 12 L14 18 L18 14 L14 22 L14 40 Z" />
        <circle cx="25" cy="6" r="5" />
        <path d="M19 40 L19 20 L13 10 L19 16 L25 8 L31 16 L37 10 L31 20 L31 40 Z" />
        <circle cx="40" cy="10" r="4" />
        <path d="M36 40 L36 22 L32 14 L36 18 L40 12 L44 18 L48 14 L44 22 L44 40 Z" />
      </g>
    </svg>
  )
}

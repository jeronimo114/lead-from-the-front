'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { Locale } from '@/lib/utils'

interface DonateFormProps {
  locale: Locale
}

export function DonateForm({ locale }: DonateFormProps) {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time')
  const [amount, setAmount] = useState<number | 'other'>(100)

  const amounts = [25, 50, 100]

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6" id="donate">
      <h3 className="text-lg font-bold text-secondary-900 mb-4">
        {locale === 'en' ? 'Donate' : 'Donar'}
      </h3>

      {/* Frequency toggle */}
      <div className="mb-4">
        <p className="text-sm text-secondary-600 mb-2">
          {locale === 'en' ? 'Frequency' : 'Frecuencia'}
        </p>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="frequency"
              checked={frequency === 'one-time'}
              onChange={() => setFrequency('one-time')}
              className="w-4 h-4 text-primary-500"
            />
            <span className="text-sm text-secondary-700">
              {locale === 'en' ? 'One-time' : 'Una vez'}
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="frequency"
              checked={frequency === 'monthly'}
              onChange={() => setFrequency('monthly')}
              className="w-4 h-4 text-primary-500"
            />
            <span className="text-sm text-secondary-700">
              {locale === 'en' ? 'Monthly' : 'Mensual'}
            </span>
          </label>
        </div>
      </div>

      {/* Amount selection */}
      <div className="flex gap-2 mb-6">
        {amounts.map((amt) => (
          <button
            key={amt}
            type="button"
            onClick={() => setAmount(amt)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              amount === amt
                ? 'bg-primary-500 text-white'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            )}
          >
            ${amt}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setAmount('other')}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            amount === 'other'
              ? 'bg-primary-500 text-white'
              : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
          )}
        >
          {locale === 'en' ? 'Other' : 'Otro'}
        </button>
      </div>

      <Button className="w-full">
        {locale === 'en' ? 'Continue' : 'Continuar'}
      </Button>
    </div>
  )
}

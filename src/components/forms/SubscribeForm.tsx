'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui'
import type { Locale } from '@/lib/utils'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type FormData = z.infer<typeof schema>

interface SubscribeFormProps {
  locale: Locale
  variant?: 'default' | 'card'
}

export function SubscribeForm({ locale, variant = 'default' }: SubscribeFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed')
      setStatus('success')
      reset()
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div className={variant === 'card' ? 'bg-white rounded-2xl shadow-sm p-6 text-center' : ''}>
        <p className="text-primary-600 font-medium">
          {locale === 'en' ? 'Thank you for subscribing!' : 'Gracias por suscribirte!'}
        </p>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6" id="subscribe">
        <h3 className="text-lg font-bold text-secondary-900 mb-4">
          {locale === 'en' ? 'Subscribe' : 'Suscribete'}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 border border-secondary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              {...register('email')}
            />
          </div>

          <Button type="submit" className="w-full" isLoading={status === 'loading'}>
            {locale === 'en' ? 'Subscribe' : 'Suscribirse'}
          </Button>
        </form>
      </div>
    )
  }

  // Default inline variant
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        type="email"
        placeholder="example@gmail.com"
        className="w-full px-4 py-2 border border-secondary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        {...register('email')}
      />
      <Button type="submit" className="w-full" isLoading={status === 'loading'}>
        {locale === 'en' ? 'Subscribe' : 'Suscribirse'}
      </Button>
    </form>
  )
}

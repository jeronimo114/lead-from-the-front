'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui'
import type { Locale } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  interest: z.string().min(1, 'Please select an interest'),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface VolunteerFormProps {
  locale: Locale
}

export function VolunteerForm({ locale }: VolunteerFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const response = await fetch('/api/volunteer', {
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
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
        <p className="text-primary-600 font-medium">
          {locale === 'en' ? 'Thank you!' : 'Gracias!'}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6" id="volunteer">
      <h3 className="text-lg font-bold text-secondary-900 mb-4">
        {locale === 'en' ? 'Volunteer' : 'Voluntario'}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            {locale === 'en' ? 'Name' : 'Nombre'}
          </label>
          <input
            type="text"
            placeholder={locale === 'en' ? 'Full name' : 'Nombre completo'}
            className="w-full px-4 py-2 border border-secondary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            {...register('name')}
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            {locale === 'en' ? 'Interest' : 'Interes'}
          </label>
          <div className="relative">
            <select
              className="w-full px-4 py-2 border border-secondary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none bg-white"
              {...register('interest')}
            >
              <option value="">{locale === 'en' ? 'Select an area' : 'Selecciona un area'}</option>
              <option value="mentoring">{locale === 'en' ? 'Mentoring' : 'Mentoria'}</option>
              <option value="events">{locale === 'en' ? 'Events' : 'Eventos'}</option>
              <option value="admin">{locale === 'en' ? 'Administrative' : 'Administrativo'}</option>
              <option value="other">{locale === 'en' ? 'Other' : 'Otro'}</option>
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-500 pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            {locale === 'en' ? 'Notes' : 'Notas'}
          </label>
          <textarea
            placeholder={locale === 'en' ? 'Share your interests' : 'Comparte tus intereses'}
            rows={3}
            className="w-full px-4 py-2 border border-secondary-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            {...register('notes')}
          />
        </div>

        <Button type="submit" className="w-full" isLoading={status === 'loading'}>
          {locale === 'en' ? 'Send' : 'Enviar'}
        </Button>
      </form>
    </div>
  )
}

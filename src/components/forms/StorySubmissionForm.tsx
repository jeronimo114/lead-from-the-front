'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input, Textarea, Button, Card, CardContent } from '@/components/ui'
import { Check, AlertCircle, PenLine } from 'lucide-react'
import type { Locale } from '@/lib/utils'
import { t as translate } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  title: z.string().min(1, 'Story title is required'),
  story: z.string().min(50, 'Please share at least a few sentences'),
  consent: z.boolean().refine((val) => val === true, 'You must consent to share your story'),
})

type FormData = z.infer<typeof schema>

interface StorySubmissionFormProps {
  locale: Locale
}

const content = {
  en: {
    title: 'Share Your Story',
    subtitle: 'Your experience can inspire others',
    nameLabel: 'Your Name',
    storyTitleLabel: 'Story Title',
    storyTitlePlaceholder: 'Give your story a title',
    storyLabel: 'Your Story',
    storyPlaceholder: 'Tell us about your journey with Lead From The Front. What impact has it had on your life?',
    consentLabel: 'I consent to having my story shared on the Lead From The Front website and social media channels',
    submit: 'Submit Story',
    success: 'Thank you for sharing your story! Our team will review it soon.',
    error: 'Something went wrong. Please try again.',
  },
  es: {
    title: 'Comparte Tu Historia',
    subtitle: 'Tu experiencia puede inspirar a otros',
    nameLabel: 'Tu Nombre',
    storyTitleLabel: 'Título de la Historia',
    storyTitlePlaceholder: 'Dale un título a tu historia',
    storyLabel: 'Tu Historia',
    storyPlaceholder: 'Cuéntanos sobre tu experiencia con Lead From The Front. ¿Qué impacto ha tenido en tu vida?',
    consentLabel: 'Consiento que mi historia sea compartida en el sitio web y redes sociales de Lead From The Front',
    submit: 'Enviar Historia',
    success: '¡Gracias por compartir tu historia! Nuestro equipo la revisará pronto.',
    error: 'Algo salió mal. Por favor intenta de nuevo.',
  },
}

export function StorySubmissionForm({ locale }: StorySubmissionFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const t = content[locale]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      consent: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      const response = await fetch('/api/story-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to submit')

      setStatus('success')
      reset()
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  if (status === 'success') {
    return (
      <Card variant="elevated">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-primary-600" />
          </div>
          <p className="text-lg font-medium text-secondary-900">{t.success}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card variant="elevated" id="share-story">
      <CardContent className="p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <PenLine className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-secondary-900">{t.title}</h3>
            <p className="text-secondary-600">{t.subtitle}</p>
          </div>
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-600 mb-4 p-3 bg-red-50 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            {t.error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label={t.nameLabel}
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              type="email"
              label={translate(locale, 'common.email')}
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <Input
            label={t.storyTitleLabel}
            placeholder={t.storyTitlePlaceholder}
            error={errors.title?.message}
            {...register('title')}
          />

          <Textarea
            label={t.storyLabel}
            placeholder={t.storyPlaceholder}
            rows={6}
            error={errors.story?.message}
            {...register('story')}
          />

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 mt-0.5 rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
              {...register('consent')}
            />
            <span className="text-secondary-700 text-sm">{t.consentLabel}</span>
          </label>
          {errors.consent && (
            <p className="text-sm text-red-600">{errors.consent.message}</p>
          )}

          <Button type="submit" size="lg" isLoading={status === 'loading'} className="w-full">
            {t.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

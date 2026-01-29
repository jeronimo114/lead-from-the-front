import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, locale: string = 'en') {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function getLocaleFromPath(path: string): 'en' | 'es' {
  const segments = path.split('/')
  if (segments[1] === 'es') return 'es'
  return 'en'
}

export const locales = ['en', 'es'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const translations = {
  en: {
    nav: {
      home: 'Home',
      whatWeDo: 'What We Do',
      stories: 'Stories',
      getInvolved: 'Get Involved',
    },
    common: {
      learnMore: 'Learn More',
      readMore: 'Read More',
      donate: 'Donate',
      volunteer: 'Volunteer',
      subscribe: 'Subscribe',
      submit: 'Submit',
      loading: 'Loading...',
      email: 'Email',
      firstName: 'First Name',
      lastName: 'Last Name',
      phone: 'Phone',
      message: 'Message',
    },
    footer: {
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      whatWeDo: 'Qué Hacemos',
      stories: 'Historias',
      getInvolved: 'Participa',
    },
    common: {
      learnMore: 'Más Información',
      readMore: 'Leer Más',
      donate: 'Donar',
      volunteer: 'Voluntariado',
      subscribe: 'Suscribirse',
      submit: 'Enviar',
      loading: 'Cargando...',
      email: 'Correo Electrónico',
      firstName: 'Nombre',
      lastName: 'Apellido',
      phone: 'Teléfono',
      message: 'Mensaje',
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
    },
  },
} as const

export function t(locale: Locale, key: string): string {
  const keys = key.split('.')
  let value: unknown = translations[locale]

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      return key
    }
  }

  return typeof value === 'string' ? value : key
}

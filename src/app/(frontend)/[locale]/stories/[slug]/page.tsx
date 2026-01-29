import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { Container, Section, Badge } from '@/components/ui'
import { ShareExperience } from '@/components/sections'
import { getStoryBySlug, getStories } from '@/lib/payload'
import { formatDate, type Locale } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const storyData = await getStoryBySlug(slug, locale).catch(() => null)

  if (!storyData) {
    return { title: 'Story Not Found' }
  }

  const story = storyData as Record<string, unknown>

  return {
    title: String(story.title || 'Story'),
    description: (story.excerpt as string) || String(story.title || ''),
  }
}

export async function generateStaticParams() {
  const [enStories, esStories] = await Promise.all([
    getStories({ locale: 'en', limit: 100 }).catch(() => []),
    getStories({ locale: 'es', limit: 100 }).catch(() => []),
  ])

  const params: { locale: string; slug: string }[] = []

  ;(enStories as unknown[]).forEach((s) => {
    const story = s as Record<string, unknown>
    if (story.slug) {
      params.push({ locale: 'en', slug: String(story.slug) })
    }
  })

  ;(esStories as unknown[]).forEach((s) => {
    const story = s as Record<string, unknown>
    if (story.slug) {
      params.push({ locale: 'es', slug: String(story.slug) })
    }
  })

  return params
}

const categoryLabels: Record<string, Record<Locale, string>> = {
  'success-story': { en: 'Success Story', es: 'Historia de Éxito' },
  news: { en: 'News', es: 'Noticias' },
  event: { en: 'Event', es: 'Evento' },
  announcement: { en: 'Announcement', es: 'Anuncio' },
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const validLocale = (locale === 'es' ? 'es' : 'en') as Locale

  const storyData = await getStoryBySlug(slug, validLocale).catch(() => null)

  if (!storyData) {
    notFound()
  }

  const story = storyData as Record<string, unknown>
  const featuredImage = story.featuredImage as { url?: string; alt?: string } | undefined

  const backText = validLocale === 'en' ? 'Back to Stories' : 'Volver a Historias'

  return (
    <>
      <Section variant="gradient" size="sm">
        <Container size="md">
          <Link
            href={`/${validLocale}/stories`}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {backText}
          </Link>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            {typeof story.category === 'string' && story.category && (
              <Badge variant="success">
                {categoryLabels[story.category]?.[validLocale] || story.category}
              </Badge>
            )}
            {typeof story.publishedAt === 'string' && story.publishedAt && (
              <span className="flex items-center gap-2 text-secondary-500">
                <Calendar className="w-4 h-4" />
                {formatDate(story.publishedAt, validLocale)}
              </span>
            )}
            {typeof story.author === 'string' && story.author && (
              <span className="flex items-center gap-2 text-secondary-500">
                <User className="w-4 h-4" />
                {story.author}
              </span>
            )}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-900 mb-6">
            {String(story.title || '')}
          </h1>

          {typeof story.excerpt === 'string' && story.excerpt && (
            <p className="text-xl text-secondary-600">{story.excerpt}</p>
          )}
        </Container>
      </Section>

      {featuredImage?.url && (
        <div className="relative w-full aspect-[21/9]">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || String(story.title || '')}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <Section>
        <Container size="sm">
          {story.content ? (
            <div
              className="prose prose-lg prose-secondary max-w-none"
              dangerouslySetInnerHTML={{
                __html: typeof story.content === 'string' ? story.content : '',
              }}
            />
          ) : (
            <p className="text-secondary-600">
              {validLocale === 'en'
                ? 'This story is coming soon. Check back later for the full content.'
                : 'Esta historia estará disponible pronto. Vuelve más tarde para ver el contenido completo.'}
            </p>
          )}
        </Container>
      </Section>

      <ShareExperience locale={validLocale} />
    </>
  )
}

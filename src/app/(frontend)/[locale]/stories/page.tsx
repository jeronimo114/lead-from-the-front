import type { Metadata } from 'next'
import { Hero, MainNews, FeaturedStories, ShareExperience } from '@/components/sections'
import { getStories } from '@/lib/payload'
import type { Locale } from '@/lib/utils'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEs = locale === 'es'

  return {
    title: isEs ? 'Historias' : 'Stories',
    description: isEs
      ? 'Lee historias inspiradoras de nuestra comunidad de mentores y mentees.'
      : 'Read inspiring stories from our community of mentors and mentees.',
  }
}

const heroContent = {
  en: {
    title: 'STORIES OF LEADERSHIP',
    titleAccent: 'Lorem ipsum Lorem ipsum',
    subtitle: 'We empower leaders to serve their communities through mentorship. Resources, and measurable impact.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed',
  },
  es: {
    title: 'HISTORIAS DE LIDERAZGO',
    titleAccent: 'Lorem ipsum Lorem ipsum',
    subtitle: 'Empoderamos lideres para servir a sus comunidades a traves de mentoria. Recursos e impacto medible. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed',
  },
}

interface StoryData {
  id: string
  title: string
  slug: string
  excerpt?: string
  author?: string
  featuredImage?: { url: string; alt?: string }
  publishedAt?: string
  category?: string
}

export default async function StoriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const validLocale = (locale === 'es' ? 'es' : 'en') as Locale

  // Fetch stories from Payload CMS
  const [mainNewsStories, featuredStories, allStories] = await Promise.all([
    getStories({ locale: validLocale, mainNews: true, limit: 1 }).catch(() => []),
    getStories({ locale: validLocale, featured: true, limit: 6 }).catch(() => []),
    getStories({ locale: validLocale, limit: 20 }).catch(() => []),
  ])

  const hero = heroContent[validLocale]

  // Transform data for components
  const transformStory = (s: unknown): StoryData => {
    const story = s as Record<string, unknown>
    const featuredImage = story.featuredImage as { url?: string; alt?: string } | undefined
    return {
      id: String(story.id || ''),
      title: String(story.title || ''),
      slug: String(story.slug || ''),
      excerpt: story.excerpt as string | undefined,
      author: story.author as string | undefined,
      featuredImage: featuredImage?.url ? { url: featuredImage.url, alt: featuredImage.alt } : undefined,
      publishedAt: story.publishedAt as string | undefined,
      category: story.category as string | undefined,
    }
  }

  const mainNews = mainNewsStories[0] ? transformStory(mainNewsStories[0]) : null
  const featured = (featuredStories as unknown[]).map(transformStory)
  const stories = (allStories as unknown[]).map(transformStory)

  return (
    <>
      <Hero
        locale={validLocale}
        title={hero.title}
        titleAccent={hero.titleAccent}
        subtitle={hero.subtitle}
        variant="page"
        backgroundImage="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80"
      />

      <MainNews locale={validLocale} story={mainNews} />

      <FeaturedStories
        locale={validLocale}
        stories={featured.length > 0 ? featured : stories.slice(0, 6)}
      />

      <ShareExperience locale={validLocale} />
    </>
  )
}

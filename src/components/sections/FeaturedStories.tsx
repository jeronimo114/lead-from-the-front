'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container, Button } from '@/components/ui'
import type { Locale } from '@/lib/utils'

interface Story {
  id: string
  title: string
  slug: string
  excerpt?: string
  author?: string
}

interface FeaturedStoriesProps {
  locale: Locale
  stories: Story[]
  title?: string
}

// Image placeholder matching PDF
const ImagePlaceholder = () => (
  <div className="aspect-square bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
    <svg viewBox="0 0 60 50" className="w-12 h-10 text-secondary-300">
      <rect x="5" y="5" width="50" height="40" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M10 38 L25 28 L35 34 L50 22 L50 38 Z" fill="currentColor" opacity="0.3" />
    </svg>
  </div>
)

export function FeaturedStories({ locale, stories, title }: FeaturedStoriesProps) {
  const [currentPage, setCurrentPage] = useState(0)

  const defaultTitle = locale === 'en' ? 'Featured stories' : 'Historias destacadas'

  // Default stories if none provided
  const displayStories: Story[] = stories.length > 0 ? stories : [
    {
      id: '1',
      title: 'Alex Morgan',
      author: 'Alex Morgan',
      slug: 'story-1',
      excerpt: 'Lorem ipsum dolor sit amet consectetur. Lacus velit ut urna vitae commodo arcu consequat feugiat sit.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim',
    },
    {
      id: '2',
      title: 'Alex Morgan',
      author: 'Alex Morgan',
      slug: 'story-2',
      excerpt: 'Lorem ipsum dolor sit amet consectetur. Lacus velit ut urna vitae commodo arcu consequat feugiat sit.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim',
    },
    {
      id: '3',
      title: 'Alex Morgan',
      author: 'Alex Morgan',
      slug: 'story-3',
      excerpt: 'Lorem ipsum dolor sit amet consectetur. Lacus velit ut urna vitae commodo arcu consequat feugiat sit.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim',
    },
    {
      id: '4',
      title: 'Alex Morgan',
      author: 'Alex Morgan',
      slug: 'story-4',
      excerpt: 'Lorem ipsum dolor sit amet consectetur. Lacus velit ut urna vitae commodo arcu consequat feugiat sit.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim',
    },
  ]

  const totalPages = Math.ceil(displayStories.length / 4)

  return (
    <section className="bg-gradient-to-b from-primary-50 to-primary-100/50 py-16 relative">
      <Container>
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 text-center mb-12">
          {title || defaultTitle}
        </h2>

        {/* Stories carousel */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 text-secondary-400 hover:text-secondary-600 transition-colors hidden md:block"
            aria-label="Previous"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Stories grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayStories.slice(currentPage * 4, (currentPage + 1) * 4).map((story, index) => (
              <div
                key={story.id}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <ImagePlaceholder />
                <h3 className="font-semibold text-secondary-900 mb-2">
                  {story.author || story.title}
                </h3>
                {story.excerpt && (
                  <p className="text-secondary-600 text-xs leading-relaxed mb-4 line-clamp-6">
                    {story.excerpt}
                  </p>
                )}
                <Link href={`/${locale}/stories/${story.slug}`}>
                  <Button
                    variant={index === 0 ? 'primary' : 'outline'}
                    size="sm"
                  >
                    {locale === 'en' ? 'Learn More' : 'Saber mas'}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 text-secondary-400 hover:text-secondary-600 transition-colors hidden md:block"
            aria-label="Next"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination dots */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentPage ? 'bg-primary-500' : 'bg-secondary-300'
                }`}
                aria-label={`Page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

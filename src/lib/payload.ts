import { getPayload, Where } from 'payload'
import config from '@/payload.config'

export const getPayloadClient = async () => {
  return await getPayload({ config })
}

export async function getPage(slug: string, locale: string = 'en') {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: locale as 'en' | 'es',
    limit: 1,
  })

  return result.docs[0] || null
}

export async function getStories(options: {
  locale?: string
  featured?: boolean
  mainNews?: boolean
  limit?: number
} = {}) {
  const payload = await getPayloadClient()
  const { locale = 'en', featured, mainNews, limit = 10 } = options

  const where: Where = {}

  if (featured !== undefined) {
    where.isFeatured = { equals: featured }
  }

  if (mainNews !== undefined) {
    where.isMainNews = { equals: mainNews }
  }

  const result = await payload.find({
    collection: 'stories',
    where,
    locale: locale as 'en' | 'es',
    limit,
    sort: '-publishedAt',
  })

  return result.docs
}

export async function getStoryBySlug(slug: string, locale: string = 'en') {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'stories',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: locale as 'en' | 'es',
    limit: 1,
  })

  return result.docs[0] || null
}

export async function getPartners(tier?: 'gold' | 'silver' | 'bronze') {
  const payload = await getPayloadClient()

  const where: Where = {}

  if (tier) {
    where.tier = { equals: tier }
  }

  const result = await payload.find({
    collection: 'partners',
    where,
    sort: 'order',
    limit: 50,
  })

  return result.docs
}

export async function getHighlights(locale: string = 'en') {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'highlights',
    locale: locale as 'en' | 'es',
    sort: 'order',
    limit: 10,
  })

  return result.docs
}

export async function getPillars(locale: string = 'en') {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'pillars',
    locale: locale as 'en' | 'es',
    sort: 'order',
    limit: 10,
  })

  return result.docs
}

export async function getTeamMembers(type?: string, locale: string = 'en') {
  const payload = await getPayloadClient()

  const where: Where = {}

  if (type) {
    where.type = { equals: type }
  }

  const result = await payload.find({
    collection: 'team-members',
    where,
    locale: locale as 'en' | 'es',
    sort: 'order',
    limit: 50,
  })

  return result.docs
}

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  return await payload.findGlobal({ slug: 'site-settings' })
}

export async function getNavigation(locale: string = 'en') {
  const payload = await getPayloadClient()
  return await payload.findGlobal({
    slug: 'navigation',
    locale: locale as 'en' | 'es',
  })
}

export async function getFooter(locale: string = 'en') {
  const payload = await getPayloadClient()
  return await payload.findGlobal({
    slug: 'footer',
    locale: locale as 'en' | 'es',
  })
}

export async function createSubscriber(data: {
  email: string
  firstName?: string
  lastName?: string
}) {
  const payload = await getPayloadClient()

  return await payload.create({
    collection: 'subscribers',
    data: {
      ...data,
      status: 'active',
    },
  })
}

export async function createVolunteer(data: {
  firstName: string
  lastName: string
  email: string
  phone?: string
  interests?: string[]
  message?: string
  availability?: string
}) {
  const payload = await getPayloadClient()

  return await payload.create({
    collection: 'volunteers',
    data: {
      ...data,
      status: 'new',
    },
  })
}

export async function createDonation(data: {
  email: string
  firstName?: string
  lastName?: string
  amount: number
  type?: 'one-time' | 'monthly' | 'annual'
  message?: string
  isAnonymous?: boolean
}) {
  const payload = await getPayloadClient()

  return await payload.create({
    collection: 'donations',
    data: {
      ...data,
      status: 'pending',
    },
  })
}

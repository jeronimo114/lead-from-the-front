import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'heroTitle',
      type: 'text',
      localized: true,
      admin: {
        description: 'The main heading displayed in the hero section',
      },
    },
    {
      name: 'heroSubtitle',
      type: 'richText',
      localized: true,
      admin: {
        description: 'The subtitle or description in the hero section',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'heroCtaText',
      type: 'text',
      localized: true,
      admin: {
        description: 'Call to action button text',
      },
    },
    {
      name: 'heroCtaLink',
      type: 'text',
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
      admin: {
        position: 'sidebar',
        description: 'SEO meta description',
      },
    },
  ],
}

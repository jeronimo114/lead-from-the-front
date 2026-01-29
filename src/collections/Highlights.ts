import type { CollectionConfig } from 'payload'

export const Highlights: CollectionConfig = {
  slug: 'highlights',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order'],
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
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'linkUrl',
      type: 'text',
      admin: {
        description: 'Link when clicking the highlight card',
      },
    },
    {
      name: 'linkText',
      type: 'text',
      localized: true,
      admin: {
        description: 'Text for the link (e.g., "Learn more")',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Display order (lower numbers first)',
      },
    },
  ],
}

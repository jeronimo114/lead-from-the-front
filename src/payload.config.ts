import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Stories } from './collections/Stories'
import { Partners } from './collections/Partners'
import { Highlights } from './collections/Highlights'
import { Pillars } from './collections/Pillars'
import { TeamMembers } from './collections/TeamMembers'
import { Subscribers } from './collections/Subscribers'
import { Volunteers } from './collections/Volunteers'
import { Donations } from './collections/Donations'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { Navigation } from './globals/Navigation'
import { Footer } from './globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' - Lead From The Front',
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    Media,
    Pages,
    Stories,
    Partners,
    Highlights,
    Pillars,
    TeamMembers,
    Subscribers,
    Volunteers,
    Donations,
  ],
  globals: [SiteSettings, Navigation, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'super-secret-key-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  // Temporarily disabled - causing issues with postgres adapter
  // localization: {
  //   locales: [
  //     {
  //       label: 'English',
  //       code: 'en',
  //     },
  //     {
  //       label: 'Español',
  //       code: 'es',
  //     },
  //   ],
  //   defaultLocale: 'en',
  //   fallback: true,
  // },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },
})

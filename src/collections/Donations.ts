import type { CollectionConfig } from 'payload'

export const Donations: CollectionConfig = {
  slug: 'donations',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'amount', 'type', 'status', 'createdAt'],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'firstName',
      type: 'text',
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
      min: 1,
      admin: {
        description: 'Donation amount in USD',
      },
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'One-time', value: 'one-time' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Annual', value: 'annual' },
      ],
      defaultValue: 'one-time',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
        { label: 'Refunded', value: 'refunded' },
      ],
      defaultValue: 'pending',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'stripePaymentId',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Stripe payment intent ID (for future integration)',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      admin: {
        description: 'Optional message from donor',
      },
    },
    {
      name: 'isAnonymous',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

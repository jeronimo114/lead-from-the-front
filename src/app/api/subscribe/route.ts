import { NextResponse } from 'next/server'
import { createSubscriber } from '@/lib/payload'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    await createSubscriber({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

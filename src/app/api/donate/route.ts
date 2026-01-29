import { NextResponse } from 'next/server'
import { createDonation } from '@/lib/payload'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    await createDonation({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      amount: data.amount,
      type: data.type,
      message: data.message,
      isAnonymous: data.isAnonymous,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Donation submission error:', error)
    return NextResponse.json(
      { error: 'Failed to process donation' },
      { status: 500 }
    )
  }
}

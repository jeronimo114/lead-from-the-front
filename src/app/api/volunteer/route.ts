import { NextResponse } from 'next/server'
import { createVolunteer } from '@/lib/payload'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    await createVolunteer({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      interests: data.interests ? [data.interests] : undefined,
      message: data.message,
      availability: data.availability,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Volunteer submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit volunteer application' },
      { status: 500 }
    )
  }
}

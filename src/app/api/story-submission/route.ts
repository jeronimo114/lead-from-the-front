import { NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const payload = await getPayloadClient()

    // Store story submissions (you could create a separate collection for this)
    // For now, we'll log and return success
    console.log('Story submission received:', data)

    // In a real implementation, you might:
    // 1. Create a StorySubmissions collection
    // 2. Send an email notification to admins
    // 3. Store in a queue for review

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Story submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit story' },
      { status: 500 }
    )
  }
}

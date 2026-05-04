import { NextRequest, NextResponse } from 'next/server'
import { getResumeData, saveResumeData } from '@/lib/resume'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  const data = await getResumeData()
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !await verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json()
  await saveResumeData(body)
  return NextResponse.json({ ok: true })
}

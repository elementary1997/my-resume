import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'
import { writeFile, unlink, access } from 'fs/promises'
import { join } from 'path'
import { constants } from 'fs'

const PDF_PATH = join(process.cwd(), 'public', 'resume.pdf')

export async function GET() {
  try {
    await access(PDF_PATH, constants.F_OK)
    return NextResponse.json({ exists: true })
  } catch {
    return NextResponse.json({ exists: false })
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
    return NextResponse.json({ error: 'PDF required' }, { status: 400 })
  }
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(PDF_PATH, buffer)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    await unlink(PDF_PATH)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}

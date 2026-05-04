import { NextRequest, NextResponse } from 'next/server'
import { verifyPassword, signToken, verifyToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: 'wrong_password' }, { status: 401 })
  }

  const token = await signToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('admin_token')
  return res
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (token && await verifyToken(token)) {
    return NextResponse.json({ authenticated: true })
  }
  return NextResponse.json({ authenticated: false })
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

async function isAuthed(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  return token && await verifyToken(token)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: idStr } = await params
  const id = parseInt(idStr)
  const body = await req.json()

  const project = await prisma.project.update({
    where: { id },
    data: {
      title: body.title,
      titleEn: body.titleEn,
      description: body.description,
      descriptionEn: body.descriptionEn,
      techStack: body.techStack,
      githubUrl: body.githubUrl,
      demoUrl: body.demoUrl,
      imageUrl: body.imageUrl,
      category: body.category,
      featured: body.featured,
      sortOrder: body.sortOrder,
    },
  })
  return NextResponse.json(project)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: idStr } = await params
  const id = parseInt(idStr)
  await prisma.project.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

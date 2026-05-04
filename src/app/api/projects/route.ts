import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
  })
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !await verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const project = await prisma.project.create({
    data: {
      title: body.title ?? '',
      titleEn: body.titleEn ?? '',
      description: body.description ?? '',
      descriptionEn: body.descriptionEn ?? '',
      techStack: body.techStack ?? '',
      githubUrl: body.githubUrl ?? '',
      demoUrl: body.demoUrl ?? '',
      imageUrl: body.imageUrl ?? '',
      category: body.category ?? 'ai',
      featured: body.featured ?? false,
      sortOrder: body.sortOrder ?? 0,
    },
  })
  return NextResponse.json(project)
}

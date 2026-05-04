import { prisma } from './db'
import { resumeData as staticData } from '@/data/resume'

export type ResumeData = typeof staticData

export async function getResumeData(): Promise<ResumeData> {
  try {
    const row = await prisma.resumeContent.findUnique({ where: { id: 1 } })
    if (row && row.data && row.data !== '{}') {
      return JSON.parse(row.data) as ResumeData
    }
  } catch {
    // fall through to static data
  }
  return staticData
}

export async function saveResumeData(data: ResumeData): Promise<void> {
  await prisma.resumeContent.upsert({
    where: { id: 1 },
    create: { id: 1, data: JSON.stringify(data) },
    update: { data: JSON.stringify(data) },
  })
}

import { getResumeData } from '@/lib/resume'
import NavV3 from '@/components/v3/NavV3'
import HeroV3 from '@/components/v3/HeroV3'
import AboutV3 from '@/components/v3/AboutV3'
import ExperienceV3 from '@/components/v3/ExperienceV3'
import SkillsV3 from '@/components/v3/SkillsV3'
import EducationV3 from '@/components/v3/EducationV3'
import ContactV3 from '@/components/v3/ContactV3'
import CursorV3 from '@/components/v3/CursorV3'
import ScrollProgress from '@/components/v3/ScrollProgress'
import MascotAssistant from '@/components/MascotAssistant'
import './v3.css'

export const dynamic = 'force-dynamic'

export default async function V3Page() {
  const data = await getResumeData()

  return (
    <div className="v3" style={{ background: 'var(--bg)', color: 'var(--white)', minHeight: '100vh' }}>
      <CursorV3 />
      <ScrollProgress />
      <NavV3 />
      <HeroV3 data={data} />
      <AboutV3 data={data} />
      <ExperienceV3 data={data} />
      <SkillsV3 data={data} />
      <EducationV3 data={data} />
      <ContactV3 data={data} />

      <MascotAssistant variant="v3" />
      <footer className="border-t px-6 md:px-10 py-6 flex items-center justify-between"
        style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
        <span className="text-xs font-mono" style={{ color: 'var(--gray)' }}>
          © {new Date().getFullYear()} Pavel Elipashev
        </span>
        <span className="text-xs font-mono" style={{ color: 'var(--lime)' }}>v3</span>
      </footer>
    </div>
  )
}

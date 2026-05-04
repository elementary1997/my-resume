import { getResumeData } from '@/lib/resume'
import NavV2 from '@/components/v2/NavV2'
import MascotAssistant from '@/components/MascotAssistant'
import HeroV2 from '@/components/v2/HeroV2'
import AboutV2 from '@/components/v2/AboutV2'
import ExperienceV2 from '@/components/v2/ExperienceV2'
import SkillsV2 from '@/components/v2/SkillsV2'
import EducationV2 from '@/components/v2/EducationV2'
import ContactV2 from '@/components/v2/ContactV2'
import Footer from '@/components/Footer'
import './v2.css'

export const dynamic = 'force-dynamic'

export default async function V2Page() {
  const data = await getResumeData()

  return (
    <div className="v2" style={{ background: 'var(--v2-bg)', color: 'var(--v2-text)', minHeight: '100vh' }}>
      <NavV2 />
      <HeroV2 data={data} />
      <AboutV2 data={data} />
      <ExperienceV2 data={data} />
      <SkillsV2 data={data} />
      <EducationV2 data={data} />
      <ContactV2 data={data} />
      <footer className="py-8 text-center border-t" style={{ borderColor: 'var(--v2-border)' }}>
        <p className="text-sm font-mono" style={{ color: 'var(--v2-muted)' }}>
          Pavel Elipashev · {new Date().getFullYear()} · v2
        </p>
      </footer>
      <MascotAssistant variant="v2" />
    </div>
  )
}

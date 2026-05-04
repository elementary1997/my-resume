import { getResumeData } from '@/lib/resume'
import NavBar from '@/components/NavBar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ExperienceSection from '@/components/ExperienceSection'
import SkillsSection from '@/components/SkillsSection'
import EducationSection from '@/components/EducationSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import MascotAssistant from '@/components/MascotAssistant'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const data = await getResumeData()

  return (
    <main>
      <NavBar />
      <HeroSection data={data} />
      <AboutSection data={data} />
      <ExperienceSection data={data} />
      <SkillsSection data={data} />
      <EducationSection data={data} />
      <ContactSection data={data} />
      <Footer />
      <MascotAssistant variant="v1" />
    </main>
  )
}

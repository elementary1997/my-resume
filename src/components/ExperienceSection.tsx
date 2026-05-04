'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown, ChevronUp, Briefcase } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'
import clsx from 'clsx'

function ExperienceCard({
  job,
  index,
  lang,
}: {
  job: ResumeData['experience'][0]
  index: number
  lang: 'ru' | 'en'
}) {
  const [open, setOpen] = useState(index === 0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const title = lang === 'ru' ? job.title : job.titleEn
  const company = lang === 'ru' ? job.company : (job.companyEn ?? job.company)
  const period = lang === 'ru' ? job.period : job.periodEn
  const duties = lang === 'ru' ? job.duties : job.dutiesEn
  const achievements = lang === 'ru' ? job.achievements : job.achievementsEn

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-8 mb-8"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-0 top-5 w-3 h-3 rounded-full border-2 z-10"
        style={{
          borderColor: 'var(--primary)',
          background: open ? 'var(--primary)' : 'var(--bg)',
          boxShadow: open ? '0 0 10px rgba(249,115,22,0.6)' : 'none',
        }}
      />

      {/* Card */}
      <div
        className={clsx(
          'glass-card rounded-2xl transition-all duration-300',
          open ? 'shadow-lg' : ''
        )}
        style={{ boxShadow: open ? '0 0 20px rgba(249,115,22,0.08)' : 'none' }}
      >
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left p-5 flex items-start justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <div
              className="mt-0.5 p-2 rounded-lg flex-shrink-0"
              style={{ background: 'rgba(249,115,22,0.1)' }}
            >
              <Briefcase size={16} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 className="font-bold text-base" style={{ color: 'var(--text)' }}>
                {title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="font-semibold text-sm" style={{ color: 'var(--primary)' }}>
                  {company}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{
                  background: 'rgba(249,115,22,0.08)',
                  color: 'var(--text-muted)',
                }}>
                  {period}
                </span>
              </div>
            </div>
          </div>
          <span style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: 4 }}>
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </span>
        </button>

        {/* Expanded content */}
        {open && (
          <div className="px-5 pb-5 pt-0">
            <div className="border-t pt-4" style={{ borderColor: 'var(--border)' }}>
              {/* Stack */}
              {job.stack && job.stack.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--primary)' }}>
                    {tr(t.experience.stack, lang)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.stack.map((s) => (
                      <span key={s} className="skill-badge text-xs">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Duties */}
              {duties && duties.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--cyan)' }}>
                    {tr(t.experience.duties, lang)}
                  </p>
                  <ul className="space-y-1.5">
                    {duties.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: 2 }}>▸</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements */}
              {achievements && achievements.length > 0 && (
                <div>
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--green)' }}>
                    {tr(t.experience.achievements, lang)}
                  </p>
                  <ul className="space-y-1.5">
                    {achievements.map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                        <span style={{ color: 'var(--green)', flexShrink: 0, marginTop: 2 }}>✓</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function ExperienceSection({ data }: { data: ResumeData }) {
  const resumeData = data
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-title">{tr(t.experience.title, lang)}</h2>
          <div className="section-subtitle-line" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[5px] top-6 bottom-6 w-px"
            style={{ background: 'linear-gradient(180deg, var(--primary), transparent)' }}
          />

          {resumeData.experience.map((job, i) => (
            <ExperienceCard key={i} job={job} index={i} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  )
}

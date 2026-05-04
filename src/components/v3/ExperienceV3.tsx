'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

export default function ExperienceV3({ data }: { data: ResumeData }) {
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="border-b" style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Header */}
        <div ref={ref} className="flex items-end justify-between mb-16 border-b pb-6"
          style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest block mb-2" style={{ color: 'var(--lime)' }}>
              02 — {tr(t.experience.title, lang)}
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-none" style={{ color: 'var(--white)', letterSpacing: '-0.03em' }}>
              Work<br /><span style={{ color: 'var(--lime)' }}>History.</span>
            </h2>
          </div>
          <span className="text-xs font-mono hidden sm:block" style={{ color: 'var(--gray)' }}>
            {data.experience.length} {lang === 'ru' ? 'позиции' : 'positions'}
          </span>
        </div>

        {/* All jobs — visible at once */}
        <div className="space-y-0">
          {data.experience.map((job, i) => {
            const title     = lang === 'ru' ? job.title      : job.titleEn
            const company   = lang === 'ru' ? job.company    : (job.companyEn ?? job.company)
            const period    = lang === 'ru' ? job.period     : job.periodEn
            const achieve   = lang === 'ru' ? (job.achievements ?? []) : (job.achievementsEn ?? [])
            const duties    = lang === 'ru' ? (job.duties ?? [])       : (job.dutiesEn ?? [])
            const allPoints = [...duties, ...achieve].slice(0, 6)

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="v3-job border-b group py-10 px-6 transition-all"
                style={{ borderColor: 'rgba(240,236,226,0.07)' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 mb-6">
                  {/* Company + Role */}
                  <div>
                    <div className="text-xs font-mono mb-2" style={{ color: 'var(--gray)' }}>{period}</div>
                    <div className="font-black leading-none mb-1 transition-colors group-hover:text-[var(--lime)]"
                      style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: 'var(--white)', letterSpacing: '-0.02em' }}>
                      {company}
                    </div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--lime)' }}>{title}</div>
                  </div>

                  {/* Stack */}
                  {job.stack && job.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 content-start md:max-w-64">
                      {job.stack.map(s => (
                        <span key={s} className="v3-tag text-xs">{s}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Points */}
                {allPoints.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-1.5">
                    {allPoints.map((p, j) => (
                      <p key={j} className="text-sm flex items-start gap-2" style={{ color: 'var(--gray)' }}>
                        <span style={{ color: 'var(--lime)', flexShrink: 0, marginTop: 2 }}>›</span>
                        {p}
                      </p>
                    ))}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

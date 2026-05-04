'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

const jobColors = ['#8b5cf6', '#22d3ee', '#10b981', '#f59e0b']

export default function ExperienceV2({ data }: { data: ResumeData }) {
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)

  return (
    <section id="experience" className="py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139,92,246,0.04), transparent)' }} />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16 relative">
          <span className="section-num">02</span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: 'var(--v2-text)' }}>
            {tr(t.experience.title, lang)}
            <span className="v2-gradient-text-2">.</span>
          </h2>
        </motion.div>

        {/* Tab selector */}
        <div className="flex flex-wrap gap-2 mb-8">
          {data.experience.map((job, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
              style={{
                background: active === i ? `${jobColors[i % jobColors.length]}20` : 'transparent',
                border: `1px solid ${active === i ? jobColors[i % jobColors.length] : 'var(--v2-border)'}`,
                color: active === i ? jobColors[i % jobColors.length] : 'var(--v2-muted)',
              }}
            >
              {lang === 'ru' ? job.company : (job.companyEn ?? job.company)}
            </button>
          ))}
        </div>

        {/* Active job card */}
        {data.experience.map((job, i) => {
          if (i !== active) return null
          const color = jobColors[i % jobColors.length]
          const title = lang === 'ru' ? job.title : job.titleEn
          const company = lang === 'ru' ? job.company : (job.companyEn ?? job.company)
          const period = lang === 'ru' ? job.period : job.periodEn
          const duties = lang === 'ru' ? (job.duties ?? []) : (job.dutiesEn ?? [])
          const achievements = lang === 'ru' ? (job.achievements ?? []) : (job.achievementsEn ?? [])

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="v2-card p-8"
              style={{ borderColor: `${color}40` }}
            >
              {/* Company header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                    <span className="font-mono text-sm" style={{ color: 'var(--v2-muted)' }}>{period}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black leading-tight" style={{ color }}>
                    {company}
                  </h3>
                  <p className="text-lg font-semibold mt-1" style={{ color: 'var(--v2-text)' }}>{title}</p>
                </div>
                {job.stack && job.stack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 md:max-w-xs">
                    {job.stack.map(s => (
                      <span key={s} className="v2-badge" style={{ borderColor: `${color}30`, background: `${color}10`, color: 'var(--v2-text)' }}>{s}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {duties.length > 0 && (
                  <div>
                    <p className="text-xs font-mono font-bold uppercase tracking-widest mb-4" style={{ color }}>
                      {tr(t.experience.duties, lang)}
                    </p>
                    <ul className="space-y-2">
                      {duties.map((d, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'var(--v2-muted)' }}>
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {achievements.length > 0 && (
                  <div>
                    <p className="text-xs font-mono font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--v2-emerald)' }}>
                      {tr(t.experience.achievements, lang)}
                    </p>
                    <ul className="space-y-2">
                      {achievements.map((a, j) => (
                        <li key={j} className="flex items-start gap-3 text-sm" style={{ color: 'var(--v2-muted)' }}>
                          <span className="mt-1 flex-shrink-0 text-emerald-400">✓</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}

        {/* Timeline dots */}
        <div className="flex items-center gap-2 mt-6 justify-center">
          {data.experience.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: active === i ? 24 : 8,
                height: 8,
                background: active === i ? jobColors[i % jobColors.length] : 'var(--v2-border)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

export default function EducationV2({ data }: { data: ResumeData }) {
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="py-28 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34,211,238,0.03), transparent)' }}
      />
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16 relative">
          <span className="section-num">04</span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: 'var(--v2-text)' }}>
            {tr(t.education.title, lang)}
            <span className="v2-gradient-text-2">.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* University */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {data.education.map((edu, i) => (
              <div key={i} className="v2-card p-8 h-full">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: 'rgba(139,92,246,0.15)' }}>
                  <GraduationCap size={28} style={{ color: 'var(--v2-violet)' }} />
                </div>
                <div className="text-5xl font-black v2-gradient-text mb-2">{edu.year}</div>
                <h3 className="font-bold text-base leading-snug mb-2" style={{ color: 'var(--v2-text)' }}>
                  {lang === 'ru' ? edu.institution : edu.institutionEn}
                </h3>
                <p className="text-sm v2-badge inline-block" style={{ color: 'var(--v2-muted)' }}>
                  {lang === 'ru' ? edu.degree : edu.degreeEn}
                </p>
                <p className="text-xs font-mono mt-3" style={{ color: 'var(--v2-muted)' }}>{edu.location}</p>
              </div>
            ))}
          </motion.div>

          {/* Certs grid */}
          <div className="md:col-span-2">
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mb-6">
              <Award size={18} style={{ color: 'var(--v2-gold)' }} />
              <h3 className="font-bold text-lg" style={{ color: 'var(--v2-text)' }}>
                {tr(t.education.courses, lang)}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {data.certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
                  className="v2-card p-4 flex items-start gap-3 hover:scale-[1.02] transition-transform duration-200"
                >
                  <span className="text-xs font-black px-2 py-1 rounded-lg flex-shrink-0 font-mono"
                    style={{ background: 'rgba(245,158,11,0.1)', color: 'var(--v2-gold)' }}>
                    {cert.year}
                  </span>
                  <div>
                    <p className="text-xs font-medium leading-snug" style={{ color: 'var(--v2-text)' }}>
                      {lang === 'ru' ? cert.name : cert.nameEn}
                    </p>
                    <p className="text-xs mt-0.5 font-mono" style={{ color: 'var(--v2-muted)' }}>{cert.org}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

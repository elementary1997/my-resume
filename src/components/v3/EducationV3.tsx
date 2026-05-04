'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

export default function EducationV3({ data }: { data: ResumeData }) {
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="border-b" style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Header */}
        <div ref={ref} className="flex items-end justify-between mb-16 border-b pb-6"
          style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest block mb-2" style={{ color: 'var(--lime)' }}>
              04 — {tr(t.education.title, lang)}
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-none" style={{ color: 'var(--white)', letterSpacing: '-0.03em' }}>
              Education<br /><span style={{ color: 'var(--lime)' }}>& Certs.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* University */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'var(--gray)' }}>
              {lang === 'ru' ? 'Высшее образование' : 'Higher Education'}
            </p>
            {data.education.map((edu, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="v3-block p-6 hover:shadow-[5px_5px_0_var(--lime)] transition-all">
                <div className="text-5xl font-black mb-4" style={{ color: 'var(--lime)' }}>{edu.year}</div>
                <p className="font-bold text-base leading-snug mb-2" style={{ color: 'var(--white)' }}>
                  {lang === 'ru' ? edu.institution : edu.institutionEn}
                </p>
                <p className="text-sm font-mono" style={{ color: 'var(--gray)' }}>
                  {lang === 'ru' ? edu.degree : edu.degreeEn} · {edu.location}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Certs */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: 'var(--gray)' }}>
              {tr(t.education.courses, lang)}
            </p>
            <div className="space-y-0">
              {data.certifications.map((cert, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.04 }}
                  className="flex items-start gap-4 py-3 border-b group hover:bg-[rgba(185,255,102,0.02)] transition-colors px-1"
                  style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
                  <span className="text-xs font-black font-mono w-10 flex-shrink-0 pt-0.5" style={{ color: 'var(--lime)' }}>
                    {cert.year}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-snug transition-colors group-hover:text-[var(--lime)]"
                      style={{ color: 'var(--white)' }}>
                      {lang === 'ru' ? cert.name : cert.nameEn}
                    </p>
                    <p className="text-xs mt-0.5 font-mono" style={{ color: 'var(--gray)' }}>{cert.org}</p>
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

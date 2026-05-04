'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Award } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

export default function EducationSection({ data }: { data: ResumeData }) {
  const resumeData = data
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-title">{tr(t.education.title, lang)}</h2>
          <div className="section-subtitle-line" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* University */}
          <div className="md:col-span-1">
            {resumeData.education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card rounded-2xl p-6"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(249,115,22,0.1)' }}
                >
                  <GraduationCap size={24} style={{ color: 'var(--primary)' }} />
                </div>
                <div
                  className="text-3xl font-bold font-mono mb-1"
                  style={{ color: 'var(--primary)' }}
                >
                  {edu.year}
                </div>
                <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text)' }}>
                  {lang === 'ru' ? edu.institution : edu.institutionEn}
                </h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'ru' ? edu.degree : edu.degreeEn}
                </p>
                <p className="text-xs font-mono mt-1" style={{ color: 'var(--text-muted)' }}>
                  {edu.location}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div className="md:col-span-2">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="font-bold mb-4 flex items-center gap-2"
              style={{ color: 'var(--text)' }}
            >
              <Award size={18} style={{ color: 'var(--primary)' }} />
              {tr(t.education.courses, lang)}
            </motion.h3>

            <div className="space-y-2">
              {resumeData.certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                  className="glass-card rounded-xl p-3 flex items-start gap-3 hover:border-orange-500/30 transition-colors"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <span
                    className="text-xs font-mono font-bold px-2 py-1 rounded-lg flex-shrink-0"
                    style={{
                      background: 'rgba(249,115,22,0.1)',
                      color: 'var(--primary)',
                    }}
                  >
                    {cert.year}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug" style={{ color: 'var(--text)' }}>
                      {lang === 'ru' ? cert.name : cert.nameEn}
                    </p>
                    <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {cert.org}
                    </p>
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

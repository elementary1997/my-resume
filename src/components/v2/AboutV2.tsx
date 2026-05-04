'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Zap, Shield, Code2, MapPin, Globe2, Award } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

const bentoItems = [
  {
    id: 'desc',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    color: '#8b5cf6',
  },
  {
    id: 'iac',
    icon: Zap,
    ruLabel: 'IaC & Автоматизация',
    enLabel: 'IaC & Automation',
    color: '#f59e0b',
  },
  {
    id: 'cicd',
    icon: Shield,
    ruLabel: 'CI/CD & Безопасность',
    enLabel: 'CI/CD & Security',
    color: '#22d3ee',
  },
  {
    id: 'code',
    icon: Code2,
    ruLabel: 'Python & Bash',
    enLabel: 'Python & Bash',
    color: '#10b981',
  },
]

export default function AboutV2({ data }: { data: ResumeData }) {
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-12 relative">
          <span className="section-num">01</span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: 'var(--v2-text)' }}>
            {tr(t.about.title, lang)}
            <span className="v2-gradient-text">.</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr">
          {/* Large description card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="v2-card md:col-span-2 md:row-span-2 p-8 flex flex-col justify-between min-h-[280px] hover:scale-[1.01] transition-transform duration-300"
          >
            <div>
              <div className="w-10 h-10 rounded-xl mb-6 flex items-center justify-center"
                style={{ background: 'rgba(139,92,246,0.15)' }}>
                <span className="text-xl">👋</span>
              </div>
              <div className="space-y-4">
                {[t.about.text1, t.about.text2, t.about.text3].map((text, i) => (
                  <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--v2-muted)' }}>
                    {tr(text, lang)}
                  </p>
                ))}
              </div>
            </div>
            {/* Stats row */}
            <div className="flex gap-6 mt-8 pt-6" style={{ borderTop: '1px solid var(--v2-border)' }}>
              {[
                { num: '3+', label: lang === 'ru' ? 'лет опыта' : 'years exp.' },
                { num: '9+', label: lang === 'ru' ? 'сертификатов' : 'certs' },
                { num: '4', label: lang === 'ru' ? 'компании' : 'companies' },
              ].map(s => (
                <div key={s.num}>
                  <div className="text-2xl font-black v2-gradient-text">{s.num}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--v2-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Feature cards */}
          {[
            { icon: Zap, ruLabel: 'IaC & Автоматизация', enLabel: 'IaC & Automation', color: '#f59e0b', emoji: '⚡' },
            { icon: Shield, ruLabel: 'CI/CD & Безопасность', enLabel: 'CI/CD & Security', color: '#22d3ee', emoji: '🛡️' },
            { icon: Code2, ruLabel: 'Python & Bash', enLabel: 'Python & Bash', color: '#10b981', emoji: '🐍' },
          ].map((item, i) => (
            <motion.div
              key={item.emoji}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="v2-card p-6 hover:scale-[1.03] transition-transform duration-300 cursor-default min-h-[120px] flex flex-col justify-between"
            >
              <span className="text-2xl">{item.emoji}</span>
              <p className="font-bold text-sm mt-3" style={{ color: 'var(--v2-text)' }}>
                {lang === 'ru' ? item.ruLabel : item.enLabel}
              </p>
              <div className="w-8 h-0.5 mt-2 rounded" style={{ background: item.color }} />
            </motion.div>
          ))}
        </div>

        {/* Info chips */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-3 mt-6"
        >
          <span className="v2-badge flex items-center gap-1.5">
            <MapPin size={12} style={{ color: 'var(--v2-violet)' }} />
            {lang === 'ru' ? data.location : data.locationEn}
          </span>
          {data.languages.map((l, i) => (
            <span key={i} className="v2-badge flex items-center gap-1.5">
              <Globe2 size={12} style={{ color: 'var(--v2-cyan)' }} />
              {lang === 'ru' ? l.name : l.nameEn} — {lang === 'ru' ? l.level : l.levelEn}
            </span>
          ))}
          <span className="v2-badge flex items-center gap-1.5">
            <Award size={12} style={{ color: 'var(--v2-gold)' }} />
            {data.certifications.length}+ {lang === 'ru' ? 'сертификатов' : 'certifications'}
          </span>
        </motion.div>
      </div>
    </section>
  )
}

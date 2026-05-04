'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Zap, Code2, Users } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

const features = [
  {
    icon: Zap,
    ru: 'IaC & Автоматизация',
    en: 'IaC & Automation',
    color: '#f97316',
  },
  {
    icon: Shield,
    ru: 'Безопасность & CI/CD',
    en: 'Security & CI/CD',
    color: '#22d3ee',
  },
  {
    icon: Code2,
    ru: 'Python & Bash скрипты',
    en: 'Python & Bash Scripts',
    color: '#4ade80',
  },
  {
    icon: Users,
    ru: 'Командная работа',
    en: 'Team Collaboration',
    color: '#a78bfa',
  },
]

export default function AboutSection({ data: _data }: { data: ResumeData }) {
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="section-title">{tr(t.about.title, lang)}</h2>
            <div className="section-subtitle-line" />

            <div className="space-y-4">
              {[t.about.text1, t.about.text2, t.about.text3].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {tr(text, lang)}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-6 mt-8"
            >
              {[
                { num: '3+', label: lang === 'ru' ? 'лет опыта' : 'years exp.' },
                { num: '9+', label: lang === 'ru' ? 'сертификатов' : 'certifications' },
                { num: '4', label: lang === 'ru' ? 'стека технологий' : 'tech stacks' },
              ].map((stat) => (
                <div key={stat.num} className="text-center">
                  <div className="text-3xl font-bold font-mono text-gradient-primary">
                    {stat.num}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Feature cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-card rounded-2xl p-5 cursor-default"
                style={{ boxShadow: `0 0 0 1px ${f.color}20` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: `${f.color}15` }}
                >
                  <f.icon size={20} style={{ color: f.color }} />
                </div>
                <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--text)' }}>
                  {lang === 'ru' ? f.ru : f.en}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

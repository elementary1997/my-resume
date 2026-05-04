'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

// Deterministic "weight" per skill name → controls font size
function skillWeight(name: string) {
  const h = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  const sizes = [
    { cls: 'text-sm',  w: 400 },
    { cls: 'text-base',w: 500 },
    { cls: 'text-base',w: 600 },
    { cls: 'text-lg',  w: 700 },
    { cls: 'text-xl',  w: 800 },
    { cls: 'text-2xl', w: 900 },
  ]
  return sizes[h % sizes.length]
}

const catColors: Record<string, string> = {
  'DevOps / IaC':           '#b9ff66',
  'Мониторинг':             '#22d3ee',
  'Monitoring':             '#22d3ee',
  'Облако':                 '#a78bfa',
  'Cloud':                  '#a78bfa',
  'Виртуализация':          '#4ade80',
  'Virtualization':         '#4ade80',
  'Резервное копирование':  '#fb923c',
  'Backup':                 '#fb923c',
  'Операционные системы':   '#60a5fa',
  'Operating Systems':      '#60a5fa',
  'Службы каталогов':       '#f472b6',
  'Directory Services':     '#f472b6',
  'Почтовые сервисы':       '#34d399',
  'Mail Services':          '#34d399',
  'Программирование':       '#fbbf24',
  'Programming':            '#fbbf24',
}

export default function SkillsV3({ data }: { data: ResumeData }) {
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const skillsData = lang === 'ru' ? data.skills : data.skillsEn

  return (
    <section id="skills" className="border-b" style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Header */}
        <div ref={ref} className="flex items-end justify-between mb-16 border-b pb-6"
          style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest block mb-2" style={{ color: 'var(--lime)' }}>
              03 — {tr(t.skills.title, lang)}
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-none" style={{ color: 'var(--white)', letterSpacing: '-0.03em' }}>
              Tech<br /><span style={{ color: 'var(--lime)' }}>Stack.</span>
            </h2>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {Object.entries(skillsData).map(([cat, skills], i) => {
            const color = catColors[cat] ?? '#b9ff66'
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="grid grid-cols-[140px_1fr] md:grid-cols-[200px_1fr] gap-6 items-start"
              >
                {/* Category label */}
                <div className="pt-1">
                  <span className="text-xs font-black uppercase tracking-widest block mb-1"
                    style={{ color }}>
                    {cat}
                  </span>
                  <div className="w-6 h-0.5" style={{ background: color }} />
                </div>

                {/* Word-cloud skills */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 items-baseline">
                  {skills.map((skill, j) => {
                    const { cls, w } = skillWeight(skill)
                    return (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: i * 0.07 + j * 0.04 }}
                        className={`${cls} font-mono transition-colors cursor-default hover:text-[var(--lime)]`}
                        style={{ fontWeight: w, color: 'var(--white)', lineHeight: 1.3 }}
                      >
                        {skill}
                      </motion.span>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

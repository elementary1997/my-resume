'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

const categoryConfig: Record<string, { color: string; emoji: string; span?: string }> = {
  'DevOps / IaC':           { color: '#8b5cf6', emoji: '⚙️', span: 'md:col-span-2' },
  'Мониторинг':             { color: '#22d3ee', emoji: '📊' },
  'Monitoring':             { color: '#22d3ee', emoji: '📊' },
  'Облако':                 { color: '#a78bfa', emoji: '☁️' },
  'Cloud':                  { color: '#a78bfa', emoji: '☁️' },
  'Виртуализация':          { color: '#10b981', emoji: '💻', span: 'md:col-span-2' },
  'Virtualization':         { color: '#10b981', emoji: '💻', span: 'md:col-span-2' },
  'Резервное копирование':  { color: '#fb923c', emoji: '💾' },
  'Backup':                 { color: '#fb923c', emoji: '💾' },
  'Операционные системы':   { color: '#60a5fa', emoji: '🐧' },
  'Operating Systems':      { color: '#60a5fa', emoji: '🐧' },
  'Службы каталогов':       { color: '#f472b6', emoji: '📁' },
  'Directory Services':     { color: '#f472b6', emoji: '📁' },
  'Почтовые сервисы':       { color: '#34d399', emoji: '📧' },
  'Mail Services':          { color: '#34d399', emoji: '📧' },
  'Программирование':       { color: '#fbbf24', emoji: '🐍', span: 'md:col-span-1' },
  'Programming':            { color: '#fbbf24', emoji: '🐍', span: 'md:col-span-1' },
}

export default function SkillsV2({ data }: { data: ResumeData }) {
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const skillsData = lang === 'ru' ? data.skills : data.skillsEn

  return (
    <section id="skills" className="py-28 relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16 relative">
          <span className="section-num">03</span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: 'var(--v2-text)' }}>
            {tr(t.skills.title, lang)}
            <span className="v2-gradient-text">.</span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(skillsData).map(([cat, skills], i) => {
            const cfg = categoryConfig[cat] ?? { color: '#8b5cf6', emoji: '🔧' }
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`v2-card p-6 hover:scale-[1.02] transition-all duration-300 cursor-default ${cfg.span ?? ''}`}
                style={{ boxShadow: `0 0 0 1px ${cfg.color}20` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-2xl">{cfg.emoji}</span>
                    <h3 className="font-bold text-sm mt-2" style={{ color: cfg.color }}>{cat}</h3>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full"
                    style={{ background: `${cfg.color}15`, color: cfg.color }}>
                    {skills.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.06 + j * 0.04 }}
                      className="v2-badge text-xs"
                      style={{ borderColor: `${cfg.color}25`, background: `${cfg.color}08` }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

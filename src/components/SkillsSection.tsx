'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

const categoryIcons: Record<string, string> = {
  'DevOps / IaC': '⚙️',
  'Мониторинг': '📊',
  'Monitoring': '📊',
  'Облако': '☁️',
  'Cloud': '☁️',
  'Виртуализация': '💻',
  'Virtualization': '💻',
  'Резервное копирование': '💾',
  'Backup': '💾',
  'Операционные системы': '🐧',
  'Operating Systems': '🐧',
  'Службы каталогов': '📁',
  'Directory Services': '📁',
  'Почтовые сервисы': '📧',
  'Mail Services': '📧',
  'Программирование': '🐍',
  'Programming': '🐍',
}

const categoryColors: Record<string, string> = {
  'DevOps / IaC': '#f97316',
  'Мониторинг': '#22d3ee',
  'Monitoring': '#22d3ee',
  'Облако': '#a78bfa',
  'Cloud': '#a78bfa',
  'Виртуализация': '#4ade80',
  'Virtualization': '#4ade80',
  'Резервное копирование': '#fb923c',
  'Backup': '#fb923c',
  'Операционные системы': '#60a5fa',
  'Operating Systems': '#60a5fa',
  'Службы каталогов': '#f472b6',
  'Directory Services': '#f472b6',
  'Почтовые сервисы': '#34d399',
  'Mail Services': '#34d399',
  'Программирование': '#fbbf24',
  'Programming': '#fbbf24',
}

function SkillCategory({
  name,
  skills,
  index,
}: {
  name: string
  skills: string[]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const color = categoryColors[name] ?? '#f97316'
  const icon = categoryIcons[name] ?? '🔧'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="glass-card rounded-2xl p-5 group hover:scale-[1.02] transition-transform duration-300"
      style={{
        boxShadow: `0 0 0 1px ${color}20`,
      }}
    >
      {/* Category header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{icon}</span>
        <h3 className="font-bold text-sm" style={{ color }}>
          {name}
        </h3>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill, i) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.3, delay: index * 0.07 + i * 0.05 }}
            className="skill-badge text-xs"
            style={{
              borderColor: `${color}30`,
              background: `${color}10`,
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsSection({ data }: { data: ResumeData }) {
  const resumeData = data
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const skillsData = lang === 'ru' ? resumeData.skills : resumeData.skillsEn

  return (
    <section id="skills" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(249,115,22,0.04), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="section-title">{tr(t.skills.title, lang)}</h2>
          <div className="section-subtitle-line" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skillsData).map(([category, skills], i) => (
            <SkillCategory key={category} name={category} skills={skills} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

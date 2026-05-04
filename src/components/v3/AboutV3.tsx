'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

export default function AboutV3({ data }: { data: ResumeData }) {
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const facts = [
    { label: lang === 'ru' ? 'Специализация' : 'Specialization', value: 'IaC, CI/CD, Monitoring' },
    { label: lang === 'ru' ? 'Основной стек' : 'Core stack', value: 'Ansible · Terraform · Grafana' },
    { label: lang === 'ru' ? 'Облако' : 'Cloud', value: 'Yandex Cloud' },
    { label: lang === 'ru' ? 'ОС' : 'OS', value: 'Astra Linux · Red OS' },
  ]

  return (
    <section id="about" className="border-b" style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_1fr] divide-y lg:divide-y-0 lg:divide-x"
          style={{ borderColor: 'rgba(240,236,226,0.07)' }}>

          {/* Rotated label col */}
          <div className="hidden lg:flex items-center justify-center border-b"
            style={{ borderColor: 'rgba(240,236,226,0.07)', minHeight: 400 }}>
            <span className="v3-section-label">
              {tr(t.about.title, lang)}
            </span>
          </div>

          {/* Description */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="p-8 md:p-12 flex flex-col justify-center"
          >
            <div className="text-xs font-bold uppercase tracking-widest mb-8" style={{ color: 'var(--lime)' }}>
              01 — {tr(t.about.title, lang)}
            </div>
            <div className="space-y-5">
              {[t.about.text1, t.about.text2, t.about.text3].map((text, i) => (
                <motion.p key={i}
                  initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.15 }}
                  className="text-base leading-relaxed" style={{ color: 'var(--gray)' }}>
                  {tr(text, lang)}
                </motion.p>
              ))}
            </div>
          </motion.div>

          {/* Facts grid */}
          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 divide-x divide-y"
            style={{ borderColor: 'rgba(240,236,226,0.07)' }}
          >
            {facts.map((f, i) => (
              <div key={i} className="p-6 flex flex-col justify-between group hover:bg-[rgba(185,255,102,0.03)] transition-colors"
                style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
                <span className="text-xs font-mono uppercase tracking-wider block mb-3"
                  style={{ color: 'var(--gray)' }}>
                  {f.label}
                </span>
                <span className="text-sm font-bold leading-snug transition-colors group-hover:text-[var(--lime)]"
                  style={{ color: 'var(--white)' }}>
                  {f.value}
                </span>
              </div>
            ))}

            {/* Stats */}
            <div className="col-span-2 p-6 flex gap-8"
              style={{ borderTop: '1px solid rgba(240,236,226,0.07)' }}>
              {[
                { n: '3+', l: lang === 'ru' ? 'лет опыта' : 'years exp.' },
                { n: '9+', l: lang === 'ru' ? 'сертификатов' : 'certifications' },
                { n: '4', l: lang === 'ru' ? 'места работы' : 'workplaces' },
              ].map(s => (
                <div key={s.n}>
                  <div className="v3-stat-num">{s.n}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--gray)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

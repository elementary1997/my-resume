'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Send, Github, MapPin, Phone } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

export default function ContactSection({ data }: { data: ResumeData }) {
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: data.contacts.email,
      href: `mailto:${data.contacts.email}`,
      color: '#f97316',
    },
    {
      icon: Send,
      label: 'Telegram',
      value: data.contacts.telegram,
      href: data.contacts.telegramUrl,
      color: '#22d3ee',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: data.contacts.phone,
      href: `tel:${data.contacts.phone.replace(/\D/g, '')}`,
      color: '#4ade80',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: data.contacts.github.replace('https://github.com/', ''),
      href: data.contacts.github,
      color: '#a78bfa',
    },
  ]

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(249,115,22,0.06), transparent)',
        }}
      />

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="section-title text-center">{tr(t.contact.title, lang)}</h2>
          <div className="section-subtitle-line mx-auto" />
          <p className="text-lg" style={{ color: 'var(--text-muted)' }}>
            {tr(t.contact.subtitle, lang)}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.label !== 'Phone' ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="glass-card rounded-2xl p-5 flex items-center gap-4 group cursor-pointer transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${c.color}15`, boxShadow: `0 0 0 1px ${c.color}30` }}
              >
                <c.icon size={22} style={{ color: c.color }} />
              </div>
              <div>
                <p className="text-xs font-mono font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>
                  {c.label}
                </p>
                <p className="font-semibold text-sm transition-colors group-hover:text-orange-500" style={{ color: 'var(--text)' }}>
                  {c.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center items-center gap-6 text-sm"
          style={{ color: 'var(--text-muted)' }}
        >
          <span className="flex items-center gap-2">
            <MapPin size={14} style={{ color: 'var(--primary)' }} />
            {lang === 'ru' ? data.location : data.locationEn}
          </span>
          <span style={{ color: 'var(--border)' }}>·</span>
          {data.languages.map((l, i) => (
            <span key={i} className="font-mono">
              {lang === 'ru' ? l.name : l.nameEn}
              {' '}
              <span style={{ color: 'var(--primary)' }}>({lang === 'ru' ? l.level : l.levelEn})</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

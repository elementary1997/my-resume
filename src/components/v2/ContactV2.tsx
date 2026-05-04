'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Send, Github, Phone } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

export default function ContactV2({ data }: { data: ResumeData }) {
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const contacts = [
    { icon: Mail,   label: 'Email',    value: data.contacts.email,    href: `mailto:${data.contacts.email}`,           color: '#8b5cf6' },
    { icon: Send,   label: 'Telegram', value: data.contacts.telegram, href: data.contacts.telegramUrl,                 color: '#22d3ee' },
    { icon: Phone,  label: 'Phone',    value: data.contacts.phone,    href: `tel:${data.contacts.phone.replace(/\D/g,'')}`, color: '#10b981' },
    { icon: Github, label: 'GitHub',   value: data.contacts.github.replace('https://github.com/',''), href: data.contacts.github, color: '#f59e0b' },
  ]

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(139,92,246,0.06), transparent)' }} />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }} className="mb-16 relative">
          <span className="section-num">05</span>
          <h2 className="text-4xl md:text-5xl font-black" style={{ color: 'var(--v2-text)' }}>
            {tr(t.contact.title, lang)}
            <span className="v2-gradient-text">.</span>
          </h2>
          <p className="text-lg mt-4" style={{ color: 'var(--v2-muted)' }}>
            {tr(t.contact.subtitle, lang)}
          </p>
        </motion.div>

        {/* Big contact card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="v2-card p-8 md:p-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.label !== 'Phone' ? '_blank' : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-5 p-4 rounded-2xl transition-all duration-200 group cursor-pointer"
                style={{ background: `${c.color}08`, border: `1px solid ${c.color}20` }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                  style={{ background: `${c.color}15`, boxShadow: `0 0 20px ${c.color}20` }}>
                  <c.icon size={22} style={{ color: c.color }} />
                </div>
                <div>
                  <p className="text-xs font-mono mb-0.5" style={{ color: 'var(--v2-muted)' }}>{c.label}</p>
                  <p className="font-bold text-sm transition-colors group-hover:opacity-80" style={{ color: 'var(--v2-text)' }}>
                    {c.value}
                  </p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: c.color }}>→</div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

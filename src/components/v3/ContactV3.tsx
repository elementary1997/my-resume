'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Send, Github, Phone } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

export default function ContactV3({ data }: { data: ResumeData }) {
  const { lang } = useApp()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const contacts = [
    { icon: Mail,   label: 'Email',    value: data.contacts.email,    href: `mailto:${data.contacts.email}` },
    { icon: Send,   label: 'Telegram', value: data.contacts.telegram, href: data.contacts.telegramUrl },
    { icon: Github, label: 'GitHub',   value: 'elementary1997',       href: data.contacts.github },
    { icon: Phone,  label: 'Phone',    value: data.contacts.phone,    href: `tel:${data.contacts.phone.replace(/\D/g,'')}` },
  ]

  return (
    <section id="contact">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-28">
        {/* Big CTA headline */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-xs font-mono uppercase tracking-widest block mb-6" style={{ color: 'var(--lime)' }}>
            05 — {tr(t.contact.title, lang)}
          </span>
          <h2 className="font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', letterSpacing: '-0.04em', color: 'var(--white)' }}>
            {lang === 'ru' ? "ДАВАЙ\nРАБОТАТЬ" : "LET'S\nWORK"}
            <span style={{ color: 'var(--lime)' }}>.</span>
          </h2>
          <p className="text-base mt-6 max-w-lg" style={{ color: 'var(--gray)' }}>
            {tr(t.contact.subtitle, lang)}
          </p>
        </motion.div>

        {/* Contact rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t"
          style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target={c.label !== 'Phone' ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-5 py-6 px-4 border-b group transition-all hover:bg-[rgba(185,255,102,0.04)] cursor-pointer"
              style={{
                borderColor: 'rgba(240,236,226,0.07)',
                borderRight: i % 2 === 0 ? '1px solid rgba(240,236,226,0.07)' : 'none',
              }}
            >
              <div className="w-10 h-10 flex items-center justify-center border transition-all group-hover:bg-[var(--lime)] group-hover:border-[var(--lime)]"
                style={{ borderColor: 'rgba(240,236,226,0.15)' }}>
                <c.icon size={18} className="transition-colors group-hover:text-black" style={{ color: 'var(--white)' }} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-mono uppercase tracking-wider mb-0.5" style={{ color: 'var(--gray)' }}>{c.label}</p>
                <p className="font-bold text-sm transition-colors group-hover:text-[var(--lime)]" style={{ color: 'var(--white)' }}>
                  {c.value}
                </p>
              </div>
              <span className="text-lg transition-all group-hover:translate-x-2" style={{ color: 'var(--lime)' }}>→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

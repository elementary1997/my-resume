'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Send, ArrowDown, Layers } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'
import AuroraBackground from './AuroraBackground'

function useTyping(phrases: string[], speed = 65, pause = 2200) {
  const [text, setText] = useState('')
  const [pi, setPi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const phrase = phrases[pi]
    const delay = del ? speed / 2 : ci === phrase.length ? pause : speed
    const id = setTimeout(() => {
      if (!del && ci < phrase.length) { setText(phrase.slice(0, ci + 1)); setCi(c => c + 1) }
      else if (!del && ci === phrase.length) setDel(true)
      else if (del && ci > 0) { setText(phrase.slice(0, ci - 1)); setCi(c => c - 1) }
      else { setDel(false); setPi(i => (i + 1) % phrases.length) }
    }, delay)
    return () => clearTimeout(id)
  }, [text, ci, del, pi, phrases, speed, pause])

  return text
}

export default function HeroV2({ data }: { data: ResumeData }) {
  const { lang } = useApp()
  const phrases = t.hero.typing[lang]
  const typed = useTyping(phrases)

  const stats = [
    { num: '3+', label: lang === 'ru' ? 'лет опыта' : 'years exp.' },
    { num: '9+', label: lang === 'ru' ? 'сертификатов' : 'certs' },
    { num: '4', label: lang === 'ru' ? 'стека' : 'tech stacks' },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center px-4">
      <AuroraBackground />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Status pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-sm"
          style={{
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.3)',
            color: 'var(--v2-violet)',
          }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {lang === 'ru' ? 'Открыт к предложениям' : 'Open to opportunities'}
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-black mb-4 leading-none"
          style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', color: 'var(--v2-text)' }}
        >
          <span className="v2-gradient-text">
            {lang === 'ru' ? data.name : data.nameEn}
          </span>
        </motion.h1>

        {/* Typed subtitle */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="h-10 flex items-center justify-center mb-6"
        >
          <span
            className="text-xl md:text-2xl font-mono font-semibold cursor-blink"
            style={{ color: 'var(--v2-cyan)' }}
          >
            {typed}
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10"
          style={{ color: 'var(--v2-muted)' }}
        >
          {lang === 'ru'
            ? 'Автоматизирую IT-инфраструктуру с применением Ansible и Terraform. Строю надёжные CI/CD-процессы и системы мониторинга на базе Astra Linux.'
            : 'Automating IT infrastructure with Ansible and Terraform. Building reliable CI/CD pipelines and monitoring systems based on Astra Linux.'}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-8 mb-10"
        >
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black v2-gradient-text">{s.num}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--v2-muted)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          <a href="/projects"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6, #22d3ee)',
              color: '#fff',
              boxShadow: '0 0 30px rgba(139,92,246,0.4)',
            }}>
            <Layers size={16} />
            {tr(t.hero.cta_projects, lang)}
          </a>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 border"
            style={{ borderColor: 'rgba(139,92,246,0.4)', color: 'var(--v2-violet)', background: 'transparent' }}>
            <Send size={16} />
            {tr(t.hero.cta_contact, lang)}
          </button>
        </motion.div>

        {/* Social row */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-5"
        >
          {[
            { href: data.contacts.github, label: 'GitHub', icon: Github, color: 'var(--v2-violet)' },
            { href: data.contacts.telegramUrl, label: 'Telegram', icon: Send, color: 'var(--v2-cyan)' },
          ].map(({ href, label, icon: Icon, color }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium transition-all"
              style={{ color: 'var(--v2-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = color)}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--v2-muted)')}
            >
              <Icon size={16} /> {label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
      >
        <span className="text-xs font-mono" style={{ color: 'var(--v2-muted)' }}>scroll</span>
        <ArrowDown size={18} className="animate-bounce" style={{ color: 'var(--v2-violet)' }} />
      </motion.button>
    </section>
  )
}

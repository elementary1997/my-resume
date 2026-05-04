'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Github, Send } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'

function useTyping(phrases: string[], speed = 70, pause = 2000) {
  const [text, setText] = useState('')
  const [pi, setPi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const phrase = phrases[pi]
    const delay = del ? speed / 2 : ci === phrase.length ? pause : speed
    const id = setTimeout(() => {
      if (!del && ci < phrase.length) { setText(phrase.slice(0, ci + 1)); setCi(c => c + 1) }
      else if (!del) setDel(true)
      else if (del && ci > 0) { setText(phrase.slice(0, ci - 1)); setCi(c => c - 1) }
      else { setDel(false); setPi(i => (i + 1) % phrases.length) }
    }, delay)
    return () => clearTimeout(id)
  }, [text, ci, del, pi, phrases, speed, pause])
  return text
}

export default function HeroV3({ data }: { data: ResumeData }) {
  const { lang } = useApp()
  const phrases = tr(t.hero.typing, lang) as string[]
  const typed = useTyping(phrases)
  const [time, setTime] = useState('')
  const marqRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const allSkills = Object.values(data.skills).flat()
  const marqueeItems = [...allSkills, ...allSkills]

  const nameLines = lang === 'ru'
    ? [data.name.split(' ')[0], data.name.split(' ')[1]]
    : [data.nameEn.split(' ')[0], data.nameEn.split(' ')[1]]

  return (
    <section className="relative min-h-screen flex flex-col v3-grid-bg overflow-hidden">
      {/* Top info bar */}
      <div className="border-b flex items-center justify-between px-6 md:px-10 py-2 mt-14"
        style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--gray)' }}>
          {lang === 'ru' ? 'Доступен к работе' : 'Available for work'}
        </span>
        <span className="text-xs font-mono" style={{ color: 'var(--lime)' }}>{time}</span>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--gray)' }}>
          {lang === 'ru' ? data.location : data.locationEn}
        </span>
      </div>

      {/* Main hero content */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-6 md:px-10 py-12 gap-8">

        {/* LEFT — Giant name */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {nameLines.map((line, i) => (
              <div key={i} className="leading-none font-black overflow-hidden"
                style={{ fontSize: 'clamp(4rem, 13vw, 10rem)', color: i === 0 ? 'var(--white)' : 'var(--lime)', letterSpacing: '-0.04em' }}>
                <motion.span
                  initial={{ y: 120 }} animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'block' }}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </motion.div>

          {/* Typed role */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 h-8 flex items-center gap-3"
          >
            <div className="w-8 h-px" style={{ background: 'var(--lime)' }} />
            <span className="font-mono text-sm font-semibold cursor-blink" style={{ color: 'var(--lime)' }}>
              {typed}
            </span>
          </motion.div>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-3 items-center"
          >
            <a href="/v3/projects" className="v3-btn v3-btn-lime">
              {tr(t.hero.cta_projects, lang)} →
            </a>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="v3-btn">
              {tr(t.hero.cta_contact, lang)}
            </button>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 flex items-center gap-5"
          >
            {[
              { href: data.contacts.github, label: 'GitHub', icon: Github },
              { href: data.contacts.telegramUrl, label: 'Telegram', icon: Send },
            ].map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="v3-arrow-link">
                <Icon size={14} /> {label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — Info panel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:w-72 xl:w-80 flex flex-col gap-3"
        >
          {/* Status box */}
          <div className="v3-block-lime p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--lime)' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--lime)' }}>
                {lang === 'ru' ? 'Активен' : 'Active'}
              </span>
            </div>
            <p className="text-2xl font-black leading-tight" style={{ color: 'var(--white)' }}>
              {lang === 'ru' ? data.title : data.titleEn}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { n: '3+', label: lang === 'ru' ? 'лет' : 'years' },
              { n: '4', label: lang === 'ru' ? 'компании' : 'companies' },
              { n: '9+', label: lang === 'ru' ? 'сертиф.' : 'certs' },
            ].map(s => (
              <div key={s.n} className="v3-block p-3 text-center">
                <div className="v3-stat-num" style={{ fontSize: '1.75rem' }}>{s.n}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--gray)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Contacts quick */}
          <div className="v3-block p-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--gray)' }}>Contacts</p>
            {[
              { label: data.contacts.email, href: `mailto:${data.contacts.email}` },
              { label: data.contacts.telegram, href: data.contacts.telegramUrl },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                className="block text-sm font-semibold transition-colors hover:text-[var(--lime)]"
                style={{ color: 'var(--white)' }}>
                {c.label} →
              </a>
            ))}
          </div>

          {/* Languages */}
          <div className="v3-block p-4 flex gap-4">
            {data.languages.map((l, i) => (
              <div key={i}>
                <div className="text-xs font-bold" style={{ color: 'var(--white)' }}>
                  {lang === 'ru' ? l.name : l.nameEn}
                </div>
                <div className="text-xs font-mono" style={{ color: 'var(--lime)' }}>
                  {lang === 'ru' ? l.level : l.levelEn}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="border-t overflow-hidden" style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
        <div className="flex py-3" style={{ width: 'max-content' }}>
          <div ref={marqRef} className="v3-marquee-track flex items-center gap-0">
            {marqueeItems.map((skill, i) => (
              <span key={i} className="flex items-center">
                <span className="text-xs font-mono font-semibold px-4 whitespace-nowrap"
                  style={{ color: i % 7 === 0 ? 'var(--lime)' : 'var(--gray)' }}>
                  {skill}
                </span>
                <span style={{ color: 'var(--lime)', opacity: 0.3 }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-20 left-10 flex items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ArrowDown size={14} className="animate-bounce" style={{ color: 'var(--lime)' }} />
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color: 'var(--gray)' }}>scroll</span>
      </motion.div>
    </section>
  )
}

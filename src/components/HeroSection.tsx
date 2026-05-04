'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Github, Send, ChevronDown, Terminal } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { ResumeData } from '@/lib/resume'
import ParticleCanvas from './ParticleCanvas'

function useTyping(phrases: string[], speed = 60, pause = 2000) {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[phraseIdx]
    const delay = deleting
      ? speed / 2
      : charIdx === phrase.length
      ? pause
      : speed

    const timer = setTimeout(() => {
      if (!deleting && charIdx < phrase.length) {
        setText(phrase.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      } else if (!deleting && charIdx === phrase.length) {
        setDeleting(true)
      } else if (deleting && charIdx > 0) {
        setText(phrase.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      } else {
        setDeleting(false)
        setPhraseIdx((i) => (i + 1) % phrases.length)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, charIdx, deleting, phraseIdx, phrases, speed, pause])

  return text
}

const terminalLines = [
  { cmd: '$ cat about.json', delay: 0 },
  { out: '{', delay: 600 },
  { out: '  "name": "Елипашев Павел",', delay: 900, color: '#22d3ee' },
  { out: '  "role": "Middle DevOps Engineer",', delay: 1200, color: '#4ade80' },
  { out: '  "location": "Нижний Новгород",', delay: 1500, color: '#a78bfa' },
  { out: '  "experience": "3+ years",', delay: 1800, color: '#fb923c' },
  { out: '  "focus": ["IaC", "CI/CD", "Monitoring"]', delay: 2100, color: '#f97316' },
  { out: '}', delay: 2400 },
  { cmd: '$ █', delay: 2800 },
]

export default function HeroSection({ data }: { data: ResumeData }) {
  const resumeData = data
  const { lang } = useApp()
  const phrases = t.hero.typing[lang]
  const typed = useTyping(phrases)
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    terminalLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay)
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-grid">
      {/* Particle background */}
      <div className="absolute inset-0">
        <ParticleCanvas />
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, transparent, var(--bg) 80%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 font-mono text-sm border"
              style={{
                borderColor: 'rgba(249,115,22,0.4)',
                background: 'rgba(249,115,22,0.08)',
                color: 'var(--primary)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {lang === 'ru' ? 'Открыт к предложениям' : 'Open to opportunities'}
            </motion.div>

            {/* Name with glitch */}
            <h1 className="font-bold leading-tight mb-3">
              <div
                className="glitch text-5xl md:text-6xl xl:text-7xl"
                data-text={lang === 'ru' ? resumeData.name : resumeData.nameEn}
                style={{ color: 'var(--text)' }}
              >
                {lang === 'ru' ? resumeData.name : resumeData.nameEn}
              </div>
            </h1>

            {/* Typing subtitle */}
            <div className="h-8 mb-6">
              <span
                className="text-xl md:text-2xl font-mono font-medium cursor-blink"
                style={{ color: 'var(--primary)' }}
              >
                {typed}
              </span>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-base md:text-lg leading-relaxed mb-8 max-w-lg"
              style={{ color: 'var(--text-muted)' }}
            >
              {lang === 'ru'
                ? 'Автоматизирую IT-инфраструктуру с применением Ansible и Terraform. Строю надёжные CI/CD-процессы и системы мониторинга.'
                : 'Automating IT infrastructure with Ansible and Terraform. Building reliable CI/CD pipelines and monitoring systems.'}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: 'var(--primary)',
                  color: '#fff',
                  boxShadow: '0 0 20px rgba(249,115,22,0.3)',
                }}
              >
                <Terminal size={16} />
                {tr(t.hero.cta_projects, lang)}
              </a>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 border"
                style={{
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  background: 'transparent',
                }}
              >
                <Send size={16} />
                {tr(t.hero.cta_contact, lang)}
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-4"
            >
              <a
                href={resumeData.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-orange-500"
                style={{ color: 'var(--text-muted)' }}
              >
                <Github size={18} />
                GitHub
              </a>
              <span style={{ color: 'var(--border)' }}>·</span>
              <a
                href={resumeData.contacts.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-cyan-500"
                style={{ color: 'var(--text-muted)' }}
              >
                <Send size={16} />
                Telegram
              </a>
            </motion.div>
          </motion.div>

          {/* Right column — Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="hidden lg:block animate-float"
          >
            <div className="terminal shadow-2xl" style={{ boxShadow: '0 0 40px rgba(249,115,22,0.15)' }}>
              <div className="terminal-header">
                <span className="terminal-dot bg-red-500" />
                <span className="terminal-dot bg-yellow-500" />
                <span className="terminal-dot bg-green-500" />
                <span className="ml-3 text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
                  bash — 80×24
                </span>
              </div>
              <div className="p-5 text-sm font-mono min-h-[220px]" style={{ color: '#e2e8f0' }}>
                {terminalLines.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className="leading-6">
                    {'cmd' in line ? (
                      <span style={{ color: '#4ade80' }}>{line.cmd}</span>
                    ) : (
                      <span style={{ color: line.color ?? '#94a3b8' }}>{line.out}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>
            {tr(t.hero.scroll, lang)}
          </span>
          <ChevronDown
            size={20}
            className="animate-bounce"
            style={{ color: 'var(--primary)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}

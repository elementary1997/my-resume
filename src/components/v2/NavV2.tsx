'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Globe, Menu, X, Download } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import clsx from 'clsx'

const links = [
  { href: '#about', key: t.nav.about },
  { href: '#experience', key: t.nav.experience },
  { href: '#skills', key: t.nav.skills },
  { href: '#education', key: t.nav.education },
  { href: '#contact', key: t.nav.contact },
]

export default function NavV2() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { lang, setLang } = useApp()
  const [mounted, setMounted] = useState(false)
  const [hasPdf, setHasPdf] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    fetch('/api/resume-pdf').then(r => r.json()).then(d => setHasPdf(d.exists)).catch(() => {})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'v2-card !rounded-none border-b-0' : 'bg-transparent',
      )}
      style={scrolled ? { borderRadius: 0, borderBottom: '1px solid var(--v2-border)' } : {}}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/v2" className="font-black text-2xl tracking-tight v2-gradient-text">PE</a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: 'var(--v2-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--v2-violet)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--v2-muted)')}
            >
              {tr(l.key, lang)}
            </button>
          ))}
          <a
            href="/v2/projects"
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--v2-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--v2-cyan)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--v2-muted)')}
          >
            {tr(t.nav.projects, lang)}
          </a>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Version switcher */}
          <a
            href="/"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all border"
            style={{ borderColor: 'var(--v2-border)', color: 'var(--v2-muted)' }}
          >
            v1
          </a>
          <a
            href="/v3"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all border"
            style={{ borderColor: 'var(--v2-border)', color: 'var(--v2-muted)' }}
          >
            v3
          </a>

          {/* Download CV */}
          {hasPdf && (
            <a href="/resume.pdf" download="Pavel_Elipashev_CV.pdf"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all border hover:border-violet-500/60"
              style={{ borderColor: 'var(--v2-border)', color: 'var(--v2-violet)' }}
              title={lang === 'ru' ? 'Скачать резюме' : 'Download CV'}
            >
              <Download size={13} /> CV
            </a>
          )}

          {/* Language */}
          <button
            onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium border transition-all"
            style={{ borderColor: 'var(--v2-border)', color: 'var(--v2-muted)' }}
          >
            <Globe size={13} />{lang.toUpperCase()}
          </button>

          {/* Theme */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-full flex items-center justify-center border transition-all"
              style={{ borderColor: 'var(--v2-border)', color: 'var(--v2-muted)' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border"
            style={{ borderColor: 'var(--v2-border)', color: 'var(--v2-muted)' }}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-3"
          style={{ borderColor: 'var(--v2-border)', background: 'var(--v2-bg-glass)', backdropFilter: 'blur(16px)' }}>
          {links.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-left text-sm font-medium py-1.5"
              style={{ color: 'var(--v2-muted)' }}>
              {tr(l.key, lang)}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

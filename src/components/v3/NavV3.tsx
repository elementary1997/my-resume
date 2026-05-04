'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Globe, Menu, X, Download } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import clsx from 'clsx'

const links = [
  { href: '#about',      key: t.nav.about },
  { href: '#experience', key: t.nav.experience },
  { href: '#skills',     key: t.nav.skills },
  { href: '#education',  key: t.nav.education },
  { href: '#contact',    key: t.nav.contact },
]

export default function NavV3() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { lang, setLang } = useApp()
  const [mounted, setMounted] = useState(false)
  const [hasPdf, setHasPdf] = useState(false)

  useEffect(() => {
    setMounted(true)
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    fetch('/api/resume-pdf').then(r => r.json()).then(d => setHasPdf(d.exists)).catch(() => {})
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id: string) => {
    setOpen(false)
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const ctrlCls = "flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-widest border transition-all duration-150 hover:bg-[var(--lime)] hover:border-[var(--lime)] hover:text-black"
  const ctrlStyle = { borderColor: 'rgba(240,236,226,0.2)', color: 'var(--white)', borderRadius: 0 }

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled && 'border-b'
      )}
      style={{
        background: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
        borderColor: 'rgba(240,236,226,0.08)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/v3"
          className="font-black text-base tracking-widest uppercase transition-colors"
          style={{ color: 'var(--lime)', letterSpacing: '0.15em' }}>
          PE_
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-xs font-bold uppercase tracking-widest transition-colors duration-150 hover:text-[var(--lime)]"
              style={{ color: 'var(--gray)' }}>
              {tr(l.key, lang)}
            </button>
          ))}
          <a href="/v3/projects"
            className="text-xs font-bold uppercase tracking-widest transition-colors duration-150 hover:text-[var(--lime)]"
            style={{ color: 'var(--gray)' }}>
            {tr(t.nav.projects, lang)}
          </a>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1">
          {hasPdf && (
            <a href="/resume.pdf" download="Pavel_Elipashev_CV.pdf"
              className={ctrlCls} style={ctrlStyle}
              title={lang === 'ru' ? 'Скачать резюме' : 'Download CV'}
            >
              <Download size={11} /> CV
            </a>
          )}
          <a href="/" className={ctrlCls} style={ctrlStyle}>v1</a>
          <a href="/v2" className={ctrlCls} style={ctrlStyle}>v2</a>
          <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
            className={ctrlCls} style={ctrlStyle}>
            <Globe size={11} />{lang}
          </button>
          {mounted && (
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={ctrlCls} style={ctrlStyle}>
              {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
            </button>
          )}
          <button onClick={() => setOpen(!open)}
            className={clsx(ctrlCls, 'md:hidden')} style={ctrlStyle}>
            {open ? <X size={13} /> : <Menu size={13} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t px-6 py-5 flex flex-col gap-4"
          style={{ background: '#0d0d0d', borderColor: 'rgba(240,236,226,0.08)' }}>
          {links.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-left text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--gray)' }}>
              {tr(l.key, lang)}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { usePathname, useRouter } from 'next/navigation'
import { Moon, Sun, Globe, Menu, X, Download } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import clsx from 'clsx'

const navLinks = [
  { href: '#about', labelKey: t.nav.about },
  { href: '#experience', labelKey: t.nav.experience },
  { href: '#skills', labelKey: t.nav.skills },
  { href: '#education', labelKey: t.nav.education },
  { href: '#contact', labelKey: t.nav.contact },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { lang, setLang } = useApp()
  const [mounted, setMounted] = useState(false)
  const [hasPdf, setHasPdf] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    fetch('/api/resume-pdf').then(r => r.json()).then(d => setHasPdf(d.exists)).catch(() => {})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    if (pathname === '/') {
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/' + id)
    }
  }

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass-card shadow-lg shadow-black/10'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-mono font-bold text-xl"
          style={{ color: 'var(--primary)' }}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          {'<PE/>'}
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium transition-colors duration-200 hover:text-orange-500"
              style={{ color: 'var(--text-muted)' }}
            >
              {tr(link.labelKey, lang)}
            </button>
          ))}
          <a
            href="/projects"
            className="text-sm font-medium transition-colors duration-200 hover:text-orange-500"
            style={{ color: 'var(--text-muted)' }}
          >
            {tr(t.nav.projects, lang)}
          </a>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Version switcher */}
          <a
            href="/v2"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border hover:border-purple-500/50"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            v2
          </a>
          <a
            href="/v3"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border hover:border-lime-500/50"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            v3
          </a>

          {/* Download CV */}
          {hasPdf && (
            <a href="/resume.pdf" download="Pavel_Elipashev_CV.pdf"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border hover:border-orange-500/60 hover:text-orange-500"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              title={lang === 'ru' ? 'Скачать резюме' : 'Download CV'}
            >
              <Download size={13} /> CV
            </a>
          )}

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--text-muted)',
              background: 'transparent',
            }}
            title="Switch language"
          >
            <Globe size={13} />
            {lang.toUpperCase()}
          </button>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border hover:border-orange-500/50"
              style={{
                borderColor: 'var(--border)',
                color: 'var(--text-muted)',
                background: 'transparent',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center border"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-t" style={{ borderColor: 'var(--border)' }}>
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left text-sm font-medium py-2 transition-colors hover:text-orange-500"
                style={{ color: 'var(--text-muted)' }}
              >
                {tr(link.labelKey, lang)}
              </button>
            ))}
            <a
              href="/projects"
              className="text-sm font-medium py-2 transition-colors hover:text-orange-500"
              style={{ color: 'var(--text-muted)' }}
            >
              {tr(t.nav.projects, lang)}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

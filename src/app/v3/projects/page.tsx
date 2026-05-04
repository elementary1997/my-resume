'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Search, Plus, Star } from 'lucide-react'
import Link from 'next/link'
import NavV3 from '@/components/v3/NavV3'
import CursorV3 from '@/components/v3/CursorV3'
import ScrollProgress from '@/components/v3/ScrollProgress'
import MascotAssistant from '@/components/MascotAssistant'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'
import '../v3.css'

interface Project {
  id: number
  title: string; titleEn: string
  description: string; descriptionEn: string
  techStack: string
  githubUrl: string; demoUrl: string
  featured: boolean
}

function ProjectRowV3({ project, index, lang }: { project: Project; index: number; lang: Lang }) {
  const ref = useRef(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-40px' })
  const title = lang === 'ru' ? project.title : (project.titleEn || project.title)
  const description = lang === 'ru' ? project.description : (project.descriptionEn || project.description)
  const techs = project.techStack.split(',').map(s => s.trim()).filter(Boolean)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group border-b"
      style={{ borderColor: 'rgba(240,236,226,0.07)' }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_180px] gap-6 py-8 px-2 hover:bg-[rgba(185,255,102,0.02)] transition-colors">
        {/* Left: title + desc */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl md:text-2xl font-black leading-tight transition-colors group-hover:text-[var(--lime)]"
              style={{ color: 'var(--white)', letterSpacing: '-0.02em' }}>
              {title}
            </h3>
            {project.featured && (
              <Star size={14} fill="#b9ff66" style={{ color: '#b9ff66', flexShrink: 0 }} />
            )}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--gray)' }}>
            {description}
          </p>
        </div>

        {/* Middle: tech tags */}
        <div className="flex flex-wrap gap-1.5 content-start">
          {techs.map(tech => (
            <span key={tech} className="v3-tag text-xs">{tech}</span>
          ))}
        </div>

        {/* Right: links */}
        <div className="flex flex-col gap-2 lg:items-end justify-start">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="v3-arrow-link">
              <Github size={13} /> GitHub →
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
              className="v3-arrow-link" style={{ color: 'var(--white)' }}>
              <ExternalLink size={13} /> Demo →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function V3ProjectsPage() {
  const { lang } = useApp()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(d => { setProjects(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const allTechs = Array.from(new Set(
    projects.flatMap(p => p.techStack.split(',').map(s => s.trim()).filter(Boolean))
  )).sort()

  const filtered = projects.filter(p => {
    const title = lang === 'ru' ? p.title : (p.titleEn || p.title)
    const matchSearch = !search ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.toLowerCase().includes(search.toLowerCase())
    const matchFilter = !filter || p.techStack.toLowerCase().includes(filter.toLowerCase())
    return matchSearch && matchFilter
  })

  return (
    <div className="v3" style={{ background: 'var(--bg)', color: 'var(--white)', minHeight: '100vh' }}>
      <CursorV3 />
      <ScrollProgress />
      <NavV3 />

      {/* Hero */}
      <section className="v3-grid-bg pt-28 pb-16 border-b" style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <Link href="/v3" className="v3-arrow-link inline-flex mb-10 text-xs"
            style={{ color: 'var(--gray)' }}>
            ← {lang === 'ru' ? 'Назад' : 'Back'}
          </Link>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-xs font-mono uppercase tracking-widest block mb-4" style={{ color: 'var(--lime)' }}>
              {tr(t.projects.title, lang)}
            </span>
            <h1 className="font-black leading-none mb-4" style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', letterSpacing: '-0.04em', color: 'var(--white)' }}>
              Projects<span style={{ color: 'var(--lime)' }}>_</span>
            </h1>
            <p className="text-base max-w-xl" style={{ color: 'var(--gray)' }}>
              {tr(t.projects.subtitle, lang)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 border-b flex flex-col sm:flex-row gap-4"
        style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--gray)' }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder={lang === 'ru' ? 'Поиск...' : 'Search...'}
            className="w-full pl-9 pr-4 py-2 text-sm outline-none border transition-colors bg-transparent"
            style={{ borderColor: 'rgba(240,236,226,0.12)', color: 'var(--white)', borderRadius: 0 }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--lime)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(240,236,226,0.12)')}
          />
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilter('')}
            className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest border transition-all"
            style={{
              borderColor: !filter ? 'var(--lime)' : 'rgba(240,236,226,0.12)',
              color: !filter ? '#0d0d0d' : 'var(--gray)',
              background: !filter ? 'var(--lime)' : 'transparent',
              borderRadius: 0,
            }}>
            {tr(t.projects.all, lang)}
          </button>
          {allTechs.slice(0, 8).map(tech => (
            <button key={tech} onClick={() => setFilter(filter === tech ? '' : tech)}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest border transition-all"
              style={{
                borderColor: filter === tech ? 'var(--lime)' : 'rgba(240,236,226,0.12)',
                color: filter === tech ? 'var(--lime)' : 'var(--gray)',
                background: 'transparent',
                borderRadius: 0,
              }}>
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* Projects list */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {loading ? (
          <div className="py-20 space-y-6">
            {[1,2,3].map(i => (
              <div key={i} className="h-24 animate-pulse border-b" style={{ borderColor: 'rgba(240,236,226,0.07)', background: 'rgba(185,255,102,0.02)' }} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="border-t" style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
            {/* Table header */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px_180px] gap-6 py-3 px-2 border-b"
              style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--gray)' }}>
                {lang === 'ru' ? 'Проект' : 'Project'}
              </span>
              <span className="hidden lg:block text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--gray)' }}>
                {lang === 'ru' ? 'Технологии' : 'Technologies'}
              </span>
              <span className="hidden lg:block text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--gray)' }}>
                Links
              </span>
            </div>
            {filtered.map((p, i) => (
              <ProjectRowV3 key={p.id} project={p} index={i} lang={lang} />
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-32">
            <p className="text-4xl font-black mb-4" style={{ color: 'var(--lime)' }}>[ ]</p>
            <p className="text-base font-mono mb-8" style={{ color: 'var(--gray)' }}>
              {tr(t.projects.noProjects, lang)}
            </p>
            <Link href="/admin" className="v3-btn">
              <Plus size={14} /> {lang === 'ru' ? 'Добавить проект' : 'Add Project'}
            </Link>
          </motion.div>
        )}
      </div>

      <footer className="border-t mt-16 px-6 md:px-10 py-6 flex items-center justify-between"
        style={{ borderColor: 'rgba(240,236,226,0.07)' }}>
        <span className="text-xs font-mono" style={{ color: 'var(--gray)' }}>
          © {new Date().getFullYear()} Pavel Elipashev
        </span>
        <span className="text-xs font-mono" style={{ color: 'var(--lime)' }}>v3</span>
      </footer>
      <MascotAssistant variant="v3" />
    </div>
  )
}

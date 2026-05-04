'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, Search, Github, ExternalLink, Star, Plus } from 'lucide-react'
import Link from 'next/link'
import NavV2 from '@/components/v2/NavV2'
import AuroraBackground from '@/components/v2/AuroraBackground'
import MascotAssistant from '@/components/MascotAssistant'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'
import type { Lang } from '@/i18n/translations'
import '../v2.css'

interface Project {
  id: number
  title: string; titleEn: string
  description: string; descriptionEn: string
  techStack: string
  githubUrl: string; demoUrl: string
  featured: boolean
}

function use3DTilt(ref: React.RefObject<HTMLDivElement | null>) {
  const [style, setStyle] = useState({})
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({ transform: `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)` })
  }
  const onMouseLeave = () => setStyle({})
  return { style, onMouseMove, onMouseLeave }
}

function ProjectCardV2({ project, index, lang }: { project: Project; index: number; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' })
  const tilt = use3DTilt(ref)

  const title = lang === 'ru' ? project.title : (project.titleEn || project.title)
  const description = lang === 'ru' ? project.description : (project.descriptionEn || project.description)
  const techs = project.techStack.split(',').map(s => s.trim()).filter(Boolean)

  // Cycle through aurora colors per card
  const colors = ['#8b5cf6', '#22d3ee', '#10b981', '#f59e0b', '#ec4899', '#60a5fa']
  const color = colors[index % colors.length]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1 }}
    >
      <div
        ref={ref}
        {...tilt}
        className="v2-card h-full flex flex-col overflow-hidden group cursor-default"
        style={{
          transition: 'transform 0.15s ease, box-shadow 0.3s ease',
          ...tilt.style,
          boxShadow: project.featured ? `0 0 0 1px ${color}50, 0 0 40px ${color}15` : `0 0 0 1px ${color}20`,
        }}
      >
        {/* Top gradient bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

        {/* Glow orb */}
        <div
          className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle, ${color}20, transparent 70%)`, transform: 'translate(30%, -30%)' }}
        />

        <div className="p-6 flex flex-col flex-1 relative">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-black text-lg leading-tight" style={{ color: 'var(--v2-text)' }}>
              {title}
              {project.featured && (
                <Star size={14} className="inline ml-2 mb-1" fill={color} style={{ color }} />
              )}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: 'var(--v2-muted)' }}>
            {description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {techs.map(tech => (
              <span
                key={tech}
                className="v2-badge text-xs"
                style={{ borderColor: `${color}30`, background: `${color}10`, color: 'var(--v2-text)' }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 mt-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
                style={{ background: `${color}15`, color, border: `1px solid ${color}40` }}
              >
                <Github size={13} /> GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
                style={{ background: 'rgba(34,211,238,0.1)', color: 'var(--v2-cyan)', border: '1px solid rgba(34,211,238,0.3)' }}
              >
                <ExternalLink size={13} /> Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function V2ProjectsPage() {
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
    const desc = lang === 'ru' ? p.description : (p.descriptionEn || p.description)
    const matchSearch = !search ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      desc.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.toLowerCase().includes(search.toLowerCase())
    const matchFilter = !filter || p.techStack.toLowerCase().includes(filter.toLowerCase())
    return matchSearch && matchFilter
  })

  return (
    <div className="v2" style={{ background: 'var(--v2-bg)', color: 'var(--v2-text)', minHeight: '100vh' }}>
      <NavV2 />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <AuroraBackground />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(139,92,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <Link
            href="/v2"
            className="inline-flex items-center gap-2 text-sm mb-10 transition-all hover:gap-3"
            style={{ color: 'var(--v2-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--v2-violet)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--v2-muted)')}
          >
            <ArrowLeft size={16} />
            {lang === 'ru' ? 'Назад' : 'Back'}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              className="font-black leading-none mb-4"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: 'var(--v2-text)' }}
            >
              <span className="v2-gradient-text">{tr(t.projects.title, lang)}</span>
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: 'var(--v2-muted)' }}>
              {tr(t.projects.subtitle, lang)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Controls */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--v2-muted)' }} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={lang === 'ru' ? 'Поиск...' : 'Search...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none border transition-all"
              style={{
                background: 'rgba(139,92,246,0.06)',
                border: '1px solid var(--v2-border)',
                color: 'var(--v2-text)',
              }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(139,92,246,0.5)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'var(--v2-border)')}
            />
          </div>

          {/* Tech filter pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('')}
              className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all border"
              style={{
                background: !filter ? 'linear-gradient(135deg, #8b5cf6, #22d3ee)' : 'transparent',
                borderColor: !filter ? 'transparent' : 'var(--v2-border)',
                color: !filter ? '#fff' : 'var(--v2-muted)',
              }}
            >
              {tr(t.projects.all, lang)}
            </button>
            {allTechs.slice(0, 7).map(tech => (
              <button
                key={tech}
                onClick={() => setFilter(filter === tech ? '' : tech)}
                className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all border"
                style={{
                  background: filter === tech ? 'rgba(139,92,246,0.2)' : 'transparent',
                  borderColor: filter === tech ? 'var(--v2-violet)' : 'var(--v2-border)',
                  color: filter === tech ? 'var(--v2-violet)' : 'var(--v2-muted)',
                }}
              >
                {tech}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-72 rounded-2xl animate-pulse" style={{ background: 'rgba(139,92,246,0.05)' }} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ProjectCardV2 key={p.id} project={p} index={i} lang={lang} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
            style={{ color: 'var(--v2-muted)' }}
          >
            <div className="text-6xl mb-6">🚀</div>
            <p className="text-xl font-bold mb-2" style={{ color: 'var(--v2-text)' }}>
              {tr(t.projects.noProjects, lang)}
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all hover:scale-105"
              style={{ borderColor: 'var(--v2-border)', color: 'var(--v2-muted)' }}
            >
              <Plus size={15} />
              {lang === 'ru' ? 'Добавить проект' : 'Add Project'}
            </Link>
          </motion.div>
        )}
      </section>

      <footer className="py-8 mt-16 text-center border-t" style={{ borderColor: 'var(--v2-border)' }}>
        <p className="text-sm font-mono" style={{ color: 'var(--v2-muted)' }}>
          Pavel Elipashev · {new Date().getFullYear()} · v2
        </p>
      </footer>
      <MascotAssistant variant="v2" />
    </div>
  )
}

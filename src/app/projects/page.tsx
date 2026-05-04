'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Search } from 'lucide-react'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import MascotAssistant from '@/components/MascotAssistant'
import { ProjectCard, type Project } from '@/components/ProjectCard'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'

export default function ProjectsPage() {
  const { lang } = useApp()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  // Collect all unique techs for filter
  const allTechs = Array.from(
    new Set(
      projects.flatMap((p) =>
        p.techStack.split(',').map((s) => s.trim()).filter(Boolean)
      )
    )
  ).sort()

  const filtered = projects.filter((p) => {
    const title = lang === 'ru' ? p.title : (p.titleEn || p.title)
    const desc = lang === 'ru' ? p.description : (p.descriptionEn || p.description)
    const matchesSearch = !search ||
      title.toLowerCase().includes(search.toLowerCase()) ||
      desc.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = !filter || p.techStack.toLowerCase().includes(filter.toLowerCase())
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 pt-24 pb-16">
        {/* Header */}
        <section className="relative overflow-hidden py-16 bg-grid">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.08), transparent)',
            }}
          />
          <div className="max-w-6xl mx-auto px-4 md:px-8 relative">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-orange-500"
              style={{ color: 'var(--text-muted)' }}
            >
              <ArrowLeft size={16} />
              {lang === 'ru' ? 'Назад' : 'Back'}
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="section-title">{tr(t.projects.title, lang)}</h1>
              <div className="section-subtitle-line" />
              <p className="text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>
                {tr(t.projects.subtitle, lang)}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Controls */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 mt-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'ru' ? 'Поиск проектов...' : 'Search projects...'}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all border focus:border-orange-500/50"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                }}
              />
            </div>

            {/* Tech filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('')}
                className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border"
                style={{
                  background: !filter ? 'var(--primary)' : 'transparent',
                  borderColor: !filter ? 'var(--primary)' : 'var(--border)',
                  color: !filter ? '#fff' : 'var(--text-muted)',
                }}
              >
                {tr(t.projects.all, lang)}
              </button>
              {allTechs.slice(0, 8).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setFilter(filter === tech ? '' : tech)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border"
                  style={{
                    background: filter === tech ? 'rgba(249,115,22,0.2)' : 'transparent',
                    borderColor: filter === tech ? 'var(--primary)' : 'var(--border)',
                    color: filter === tech ? 'var(--primary)' : 'var(--text-muted)',
                  }}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Projects grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-64 rounded-2xl animate-pulse"
                  style={{ background: 'var(--bg-card)' }}
                />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} lang={lang} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
              style={{ color: 'var(--text-muted)' }}
            >
              <div className="text-5xl mb-4">🚀</div>
              <p className="text-lg font-mono">{tr(t.projects.noProjects, lang)}</p>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-xl text-sm font-medium border transition-colors hover:border-orange-500/50"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
              >
                <Plus size={16} />
                {lang === 'ru' ? 'Добавить проект' : 'Add Project'}
              </Link>
            </motion.div>
          )}
        </section>
      </main>

      <Footer />
      <MascotAssistant variant="v1" />
    </div>
  )
}

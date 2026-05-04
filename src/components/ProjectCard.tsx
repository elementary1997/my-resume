'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, Star } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import type { Lang } from '@/i18n/translations'

export interface Project {
  id: number
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  techStack: string
  githubUrl: string
  demoUrl: string
  imageUrl: string
  category: string
  featured: boolean
}

function use3DTilt(ref: React.RefObject<HTMLDivElement | null>) {
  const [style, setStyle] = useState({})

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`,
    })
  }

  const onMouseLeave = () => setStyle({})

  return { style, onMouseMove, onMouseLeave }
}

export function ProjectCard({ project, index, lang }: { project: Project; index: number; lang: Lang }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-60px' })
  const tilt = use3DTilt(ref)

  const title = lang === 'ru' ? project.title : (project.titleEn || project.title)
  const description = lang === 'ru' ? project.description : (project.descriptionEn || project.description)
  const techs = project.techStack.split(',').map((s) => s.trim()).filter(Boolean)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        ref={ref}
        {...tilt}
        className="glass-card rounded-2xl overflow-hidden h-full flex flex-col transition-shadow duration-300 hover:shadow-xl cursor-default"
        style={{
          ...tilt.style,
          transition: 'transform 0.15s ease, box-shadow 0.3s ease',
          boxShadow: project.featured ? '0 0 0 1px rgba(249,115,22,0.4), 0 0 30px rgba(249,115,22,0.1)' : undefined,
        }}
      >
        {/* Header stripe */}
        <div
          className="h-1.5 w-full"
          style={{
            background: project.featured
              ? 'linear-gradient(90deg, #f97316, #22d3ee)'
              : 'linear-gradient(90deg, rgba(249,115,22,0.4), rgba(34,211,238,0.2))',
          }}
        />

        <div className="p-6 flex flex-col flex-1">
          {/* Title row */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-bold text-base leading-snug" style={{ color: 'var(--text)' }}>
              {title}
              {project.featured && (
                <Star size={14} className="inline ml-2 mb-0.5" fill="currentColor" style={{ color: '#f97316' }} />
              )}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: 'var(--text-muted)' }}>
            {description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {techs.map((tech) => (
              <span key={tech} className="skill-badge text-xs">
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
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(249,115,22,0.1)',
                  color: 'var(--primary)',
                  border: '1px solid rgba(249,115,22,0.3)',
                }}
              >
                <Github size={13} />
                GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(34,211,238,0.1)',
                  color: 'var(--cyan)',
                  border: '1px solid rgba(34,211,238,0.3)',
                }}
              >
                <ExternalLink size={13} />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

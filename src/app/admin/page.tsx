'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Pencil, Trash2, X, Check, LogOut, ExternalLink,
  Star, StarOff, FolderOpen, FileText, ChevronDown, ChevronUp, Sparkles,
} from 'lucide-react'
import type { CharacterType } from '@/components/MascotAssistant'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { ResumeData } from '@/lib/resume'

// ── Types ────────────────────────────────────────────────
interface Project {
  id: number
  title: string; titleEn: string
  description: string; descriptionEn: string
  techStack: string
  githubUrl: string; demoUrl: string; imageUrl: string
  category: string; featured: boolean; sortOrder: number
}

const emptyProject: Omit<Project, 'id'> = {
  title: '', titleEn: '', description: '', descriptionEn: '',
  techStack: '', githubUrl: '', demoUrl: '', imageUrl: '',
  category: 'ai', featured: false, sortOrder: 0,
}

// ── Toast ─────────────────────────────────────────────────
function Toast({ message, ok }: { message: string; ok: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-6 right-6 px-4 py-3 rounded-xl text-sm font-medium shadow-xl z-50 flex items-center gap-2"
      style={{ background: ok ? '#16a34a' : '#dc2626', color: '#fff' }}
    >
      {ok ? <Check size={16} /> : <X size={16} />}
      {message}
    </motion.div>
  )
}

// ── Input helpers ─────────────────────────────────────────
const inputCls = "w-full px-3 py-2.5 rounded-xl text-sm outline-none border transition-all focus:border-orange-500/60"
const inputStyle = { background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }
const labelCls = "block text-xs font-mono font-semibold mb-1"

function Field({ label, value, onChange, textarea, placeholder }: {
  label: string; value: string
  onChange: (v: string) => void
  textarea?: boolean; placeholder?: string
}) {
  return (
    <div>
      <label className={labelCls} style={{ color: 'var(--text-muted)' }}>{label}</label>
      {textarea
        ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} className={inputCls + ' resize-y min-h-[80px]'} style={inputStyle} />
        : <input type="text" value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} className={inputCls} style={inputStyle} />}
    </div>
  )
}

// ── Collapsible section card ──────────────────────────────
function SectionCard({ title, children, defaultOpen = false }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="glass-card rounded-2xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-bold text-sm" style={{ color: 'var(--text)' }}>{title}</span>
        {open ? <ChevronUp size={16} style={{ color: 'var(--text-muted)' }} />
               : <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} />}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
          {children}
        </div>
      )}
    </div>
  )
}

function SaveBtn({ saving, disabled, onClick }: { saving: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={saving || disabled}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105 disabled:opacity-50"
      style={{ background: 'var(--primary)', color: '#fff' }}
    >
      <Check size={15} />
      {saving ? 'Сохранение...' : 'Сохранить'}
    </button>
  )
}

// ── PROJECT FORM ──────────────────────────────────────────
function ProjectForm({ initial, onSave, onCancel }: {
  initial: Partial<Project>; onSave: (d: Omit<Project, 'id'>) => Promise<void>; onCancel: () => void
}) {
  const [form, setForm] = useState({ ...emptyProject, ...initial })
  const [saving, setSaving] = useState(false)
  const set = (k: keyof typeof form, v: string | boolean | number) => setForm(f => ({ ...f, [k]: v }))

  return (
    <form onSubmit={async e => { e.preventDefault(); setSaving(true); await onSave(form); setSaving(false) }}
          className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Название (RU) *" value={form.title} onChange={v => set('title', v)} placeholder="easySTT" />
        <Field label="Title (EN)" value={form.titleEn} onChange={v => set('titleEn', v)} placeholder="easySTT" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Описание (RU) *" value={form.description} onChange={v => set('description', v)} textarea placeholder="Описание..." />
        <Field label="Description (EN)" value={form.descriptionEn} onChange={v => set('descriptionEn', v)} textarea placeholder="Description..." />
      </div>
      <Field label="Технологии (через запятую) *" value={form.techStack} onChange={v => set('techStack', v)} placeholder="Rust, TypeScript, Tauri" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="GitHub URL" value={form.githubUrl} onChange={v => set('githubUrl', v)} placeholder="https://github.com/..." />
        <Field label="Demo URL" value={form.demoUrl} onChange={v => set('demoUrl', v)} placeholder="https://..." />
      </div>
      <button type="button" onClick={() => set('featured', !form.featured)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-all"
        style={{ borderColor: form.featured ? 'var(--primary)' : 'var(--border)',
                 color: form.featured ? 'var(--primary)' : 'var(--text-muted)',
                 background: form.featured ? 'rgba(249,115,22,0.1)' : 'transparent' }}>
        {form.featured ? <Star size={14} fill="currentColor" /> : <StarOff size={14} />}
        {form.featured ? 'Рекомендуемый' : 'Обычный'}
      </button>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving || !form.title || !form.description || !form.techStack}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-105 disabled:opacity-50"
          style={{ background: 'var(--primary)', color: '#fff' }}>
          <Check size={15} /> {saving ? 'Сохранение...' : 'Сохранить'}
        </button>
        <button type="button" onClick={onCancel}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border hover:scale-105"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
          <X size={15} /> Отмена
        </button>
      </div>
    </form>
  )
}

// ── PROJECTS TAB ──────────────────────────────────────────
function ProjectsTab({ showToast }: { showToast: (m: string, ok?: boolean) => void }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [editing, setEditing] = useState<Project | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null)

  const load = useCallback(() => {
    fetch('/api/projects').then(r => r.json()).then(d => { setProjects(d); setLoading(false) })
  }, [])
  useEffect(() => { load() }, [load])

  const handleAdd = async (data: Omit<Project, 'id'>) => {
    const res = await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (res.ok) { setAdding(false); load(); showToast('Проект добавлен!') }
    else showToast('Ошибка', false)
  }
  const handleEdit = async (data: Omit<Project, 'id'>) => {
    if (!editing) return
    const res = await fetch(`/api/projects/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (res.ok) { setEditing(null); load(); showToast('Сохранено!') }
    else showToast('Ошибка', false)
  }
  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (res.ok) { setConfirmDelete(null); load(); showToast('Удалено!') }
    else showToast('Ошибка', false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{projects.length} проект(ов)</p>
        <button onClick={() => { setAdding(true); setEditing(null) }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold hover:scale-105"
          style={{ background: 'var(--primary)', color: '#fff', boxShadow: '0 0 20px rgba(249,115,22,0.3)' }}>
          <Plus size={16} /> Добавить
        </button>
      </div>

      <AnimatePresence>
        {adding && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            className="glass-card rounded-2xl p-6 mb-4" style={{ borderColor: 'rgba(249,115,22,0.3)' }}>
            <h3 className="font-bold mb-4" style={{ color: 'var(--text)' }}>Новый проект</h3>
            <ProjectForm initial={{}} onSave={handleAdd} onCancel={() => setAdding(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => (
          <div key={i} className="h-20 rounded-2xl animate-pulse" style={{ background: 'var(--bg-card)' }} />
        ))}</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16" style={{ color: 'var(--text-muted)' }}>
          <div className="text-4xl mb-3">📭</div><p>Проектов пока нет</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p.id}>
              {editing?.id === p.id ? (
                <div className="glass-card rounded-2xl p-6" style={{ borderColor: 'rgba(249,115,22,0.3)' }}>
                  <h3 className="font-bold mb-4" style={{ color: 'var(--text)' }}>Редактировать: {p.title}</h3>
                  <ProjectForm initial={editing} onSave={handleEdit} onCancel={() => setEditing(null)} />
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{p.title}</span>
                      {p.featured && <Star size={12} fill="currentColor" style={{ color: 'var(--primary)' }} />}
                    </div>
                    <p className="text-xs truncate mb-1.5" style={{ color: 'var(--text-muted)' }}>{p.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {p.techStack.split(',').slice(0, 4).map(t => (
                        <span key={t.trim()} className="text-xs px-1.5 py-0.5 rounded font-mono"
                          style={{ background: 'rgba(249,115,22,0.08)', color: 'var(--primary)' }}>{t.trim()}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {confirmDelete === p.id ? (
                      <>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Удалить?</span>
                        <button onClick={() => handleDelete(p.id)} className="text-xs px-2.5 py-1.5 rounded-lg font-medium" style={{ background: '#dc2626', color: '#fff' }}>Да</button>
                        <button onClick={() => setConfirmDelete(null)} className="text-xs px-2.5 py-1.5 rounded-lg font-medium border" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>Нет</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setEditing(p); setAdding(false) }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center border hover:border-orange-500/50"
                          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => setConfirmDelete(p.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center border hover:border-red-500/50 hover:text-red-400"
                          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── RESUME TAB ────────────────────────────────────────────
function ResumeTab({ showToast }: { showToast: (m: string, ok?: boolean) => void }) {
  const [data, setData] = useState<ResumeData | null>(null)
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/resume').then(r => r.json()).then(setData)
  }, [])

  const save = async (section: string) => {
    if (!data) return
    setSaving(section)
    const res = await fetch('/api/resume', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    setSaving(null)
    if (res.ok) showToast('Сохранено!')
    else showToast('Ошибка сохранения', false)
  }

  const setField = (path: string[], value: unknown) => {
    setData(prev => {
      if (!prev) return prev
      const next = structuredClone(prev) as Record<string, unknown>
      let cur = next
      for (let i = 0; i < path.length - 1; i++) {
        cur = cur[path[i]] as Record<string, unknown>
      }
      cur[path[path.length - 1]] = value
      return next as ResumeData
    })
  }

  if (!data) return <div className="py-16 text-center" style={{ color: 'var(--text-muted)' }}>Загрузка...</div>

  return (
    <div className="space-y-0">

      {/* ── Personal Info ── */}
      <SectionCard title="Личная информация" defaultOpen>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Field label="Имя (RU)" value={data.name} onChange={v => setField(['name'], v)} />
          <Field label="Name (EN)" value={data.nameEn} onChange={v => setField(['nameEn'], v)} />
          <Field label="Должность (RU)" value={data.title} onChange={v => setField(['title'], v)} />
          <Field label="Title (EN)" value={data.titleEn} onChange={v => setField(['titleEn'], v)} />
          <Field label="Город (RU)" value={data.location} onChange={v => setField(['location'], v)} />
          <Field label="Location (EN)" value={data.locationEn} onChange={v => setField(['locationEn'], v)} />
        </div>
        <SaveBtn saving={saving === 'personal'} onClick={() => save('personal')} />
      </SectionCard>

      {/* ── Contacts ── */}
      <SectionCard title="Контакты">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Field label="Email" value={data.contacts.email} onChange={v => setField(['contacts', 'email'], v)} />
          <Field label="Телефон" value={data.contacts.phone} onChange={v => setField(['contacts', 'phone'], v)} />
          <Field label="Telegram (ник)" value={data.contacts.telegram} onChange={v => setField(['contacts', 'telegram'], v)} />
          <Field label="Telegram URL" value={data.contacts.telegramUrl} onChange={v => setField(['contacts', 'telegramUrl'], v)} />
          <Field label="GitHub URL" value={data.contacts.github} onChange={v => setField(['contacts', 'github'], v)} />
          <Field label="LinkedIn URL" value={data.contacts.linkedin} onChange={v => setField(['contacts', 'linkedin'], v)} />
        </div>
        <SaveBtn saving={saving === 'contacts'} onClick={() => save('contacts')} />
      </SectionCard>

      {/* ── Experience ── */}
      <SectionCard title={`Опыт работы (${data.experience.length} записей)`}>
        <div className="space-y-6">
          {data.experience.map((job, i) => (
            <div key={i} className="rounded-xl p-4 relative" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold" style={{ color: 'var(--primary)' }}>#{i + 1}</span>
                <button onClick={() => {
                  const next = data.experience.filter((_, idx) => idx !== i)
                  setField(['experience'], next)
                }} className="w-7 h-7 flex items-center justify-center rounded-lg hover:text-red-400"
                  style={{ color: 'var(--text-muted)' }}>
                  <Trash2 size={13} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <Field label="Должность (RU)" value={job.title} onChange={v => {
                  const next = [...data.experience]; next[i] = { ...next[i], title: v }; setField(['experience'], next)
                }} />
                <Field label="Position (EN)" value={job.titleEn} onChange={v => {
                  const next = [...data.experience]; next[i] = { ...next[i], titleEn: v }; setField(['experience'], next)
                }} />
                <Field label="Компания (RU)" value={job.company} onChange={v => {
                  const next = [...data.experience]; next[i] = { ...next[i], company: v }; setField(['experience'], next)
                }} />
                <Field label="Company (EN)" value={job.companyEn ?? ''} onChange={v => {
                  const next = [...data.experience]; next[i] = { ...next[i], companyEn: v }; setField(['experience'], next)
                }} />
                <Field label="Период (RU)" value={job.period} onChange={v => {
                  const next = [...data.experience]; next[i] = { ...next[i], period: v }; setField(['experience'], next)
                }} placeholder="Январь 2024 — настоящее время" />
                <Field label="Period (EN)" value={job.periodEn} onChange={v => {
                  const next = [...data.experience]; next[i] = { ...next[i], periodEn: v }; setField(['experience'], next)
                }} placeholder="January 2024 — present" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <Field label="Стек (через запятую)" value={(job.stack ?? []).join(', ')} onChange={v => {
                  const next = [...data.experience]
                  next[i] = { ...next[i], stack: v.split(',').map(s => s.trim()).filter(Boolean) } as ResumeData['experience'][0]
                  setField(['experience'], next)
                }} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <Field label="Обязанности (RU, каждая с новой строки)" value={(job.duties ?? []).join('\n')} onChange={v => {
                  const next = [...data.experience]
                  next[i] = { ...next[i], duties: v.split('\n').map(s => s.trim()).filter(Boolean) }
                  setField(['experience'], next)
                }} textarea />
                <Field label="Duties (EN, one per line)" value={(job.dutiesEn ?? []).join('\n')} onChange={v => {
                  const next = [...data.experience]
                  next[i] = { ...next[i], dutiesEn: v.split('\n').map(s => s.trim()).filter(Boolean) }
                  setField(['experience'], next)
                }} textarea />
                <Field label="Достижения (RU, каждое с новой строки)" value={(job.achievements ?? []).join('\n')} onChange={v => {
                  const next = [...data.experience]
                  next[i] = { ...next[i], achievements: v.split('\n').map(s => s.trim()).filter(Boolean) }
                  setField(['experience'], next)
                }} textarea />
                <Field label="Achievements (EN, one per line)" value={(job.achievementsEn ?? []).join('\n')} onChange={v => {
                  const next = [...data.experience]
                  next[i] = { ...next[i], achievementsEn: v.split('\n').map(s => s.trim()).filter(Boolean) }
                  setField(['experience'], next)
                }} textarea />
              </div>
            </div>
          ))}

          <button onClick={() => setField(['experience'], [...data.experience, {
            title: '', titleEn: '', company: '', companyEn: '', period: '', periodEn: '',
            duties: [], dutiesEn: [], achievements: [], achievementsEn: [], stack: [],
          }])}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border w-full justify-center"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', borderStyle: 'dashed' }}>
            <Plus size={14} /> Добавить место работы
          </button>
        </div>
        <div className="mt-4">
          <SaveBtn saving={saving === 'experience'} onClick={() => save('experience')} />
        </div>
      </SectionCard>

      {/* ── Skills ── */}
      <SectionCard title="Навыки">
        <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
          Навыки EN редактируются вместе с RU (категории должны совпадать)
        </p>
        <div className="space-y-3 mb-4">
          {Object.entries(data.skills).map(([cat, skills]) => (
            <div key={cat} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls} style={{ color: 'var(--text-muted)' }}>{cat} (RU список)</label>
                <input type="text" value={skills.join(', ')}
                  onChange={e => {
                    const newSkills = { ...data.skills, [cat]: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }
                    setField(['skills'], newSkills)
                  }}
                  className={inputCls} style={inputStyle} />
              </div>
              <div>
                <label className={labelCls} style={{ color: 'var(--text-muted)' }}>
                  {Object.keys(data.skillsEn)[Object.keys(data.skills).indexOf(cat)] ?? cat} (EN список)
                </label>
                <input type="text"
                  value={(Object.values(data.skillsEn)[Object.keys(data.skills).indexOf(cat)] ?? []).join(', ')}
                  onChange={e => {
                    const idx = Object.keys(data.skills).indexOf(cat)
                    const entries = Object.entries(data.skillsEn)
                    entries[idx] = [entries[idx]?.[0] ?? cat, e.target.value.split(',').map(s => s.trim()).filter(Boolean)]
                    setField(['skillsEn'], Object.fromEntries(entries))
                  }}
                  className={inputCls} style={inputStyle} />
              </div>
            </div>
          ))}
        </div>
        <SaveBtn saving={saving === 'skills'} onClick={() => save('skills')} />
      </SectionCard>

      {/* ── Education ── */}
      <SectionCard title="Образование">
        <div className="space-y-4 mb-4">
          {data.education.map((edu, i) => (
            <div key={i} className="rounded-xl p-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Год" value={edu.year} onChange={v => {
                  const next = [...data.education]; next[i] = { ...next[i], year: v }; setField(['education'], next)
                }} />
                <Field label="Степень (RU)" value={edu.degree} onChange={v => {
                  const next = [...data.education]; next[i] = { ...next[i], degree: v }; setField(['education'], next)
                }} />
                <Field label="Вуз (RU)" value={edu.institution} onChange={v => {
                  const next = [...data.education]; next[i] = { ...next[i], institution: v }; setField(['education'], next)
                }} />
                <Field label="University (EN)" value={edu.institutionEn} onChange={v => {
                  const next = [...data.education]; next[i] = { ...next[i], institutionEn: v }; setField(['education'], next)
                }} />
                <Field label="Город" value={edu.location} onChange={v => {
                  const next = [...data.education]; next[i] = { ...next[i], location: v }; setField(['education'], next)
                }} />
                <Field label="Degree (EN)" value={edu.degreeEn} onChange={v => {
                  const next = [...data.education]; next[i] = { ...next[i], degreeEn: v }; setField(['education'], next)
                }} />
              </div>
            </div>
          ))}
        </div>
        <SaveBtn saving={saving === 'education'} onClick={() => save('education')} />
      </SectionCard>

      {/* ── Certifications ── */}
      <SectionCard title={`Сертификаты (${data.certifications.length})`}>
        <div className="space-y-3 mb-4">
          {data.certifications.map((cert, i) => (
            <div key={i} className="rounded-xl p-3 flex gap-3 items-start" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 flex-1">
                <Field label="Год" value={cert.year} onChange={v => {
                  const next = [...data.certifications]; next[i] = { ...next[i], year: v }; setField(['certifications'], next)
                }} />
                <Field label="Организация" value={cert.org} onChange={v => {
                  const next = [...data.certifications]; next[i] = { ...next[i], org: v }; setField(['certifications'], next)
                }} />
                <Field label="Название (RU)" value={cert.name} onChange={v => {
                  const next = [...data.certifications]; next[i] = { ...next[i], name: v }; setField(['certifications'], next)
                }} />
                <Field label="Name (EN)" value={cert.nameEn} onChange={v => {
                  const next = [...data.certifications]; next[i] = { ...next[i], nameEn: v }; setField(['certifications'], next)
                }} />
              </div>
              <button onClick={() => setField(['certifications'], data.certifications.filter((_, idx) => idx !== i))}
                className="mt-5 w-7 h-7 flex items-center justify-center rounded-lg hover:text-red-400 flex-shrink-0"
                style={{ color: 'var(--text-muted)' }}>
                <Trash2 size={13} />
              </button>
            </div>
          ))}
          <button onClick={() => setField(['certifications'], [...data.certifications, { year: '', org: '', name: '', nameEn: '' }])}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm border w-full justify-center"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', borderStyle: 'dashed' }}>
            <Plus size={14} /> Добавить сертификат
          </button>
        </div>
        <SaveBtn saving={saving === 'certifications'} onClick={() => save('certifications')} />
      </SectionCard>

      {/* ── Languages ── */}
      <SectionCard title="Языки">
        <div className="space-y-3 mb-4">
          {data.languages.map((lang, i) => (
            <div key={i} className="grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl p-3"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <Field label="Язык (RU)" value={lang.name} onChange={v => {
                const next = [...data.languages]; next[i] = { ...next[i], name: v }; setField(['languages'], next)
              }} />
              <Field label="Language (EN)" value={lang.nameEn} onChange={v => {
                const next = [...data.languages]; next[i] = { ...next[i], nameEn: v }; setField(['languages'], next)
              }} />
              <Field label="Уровень (RU)" value={lang.level} onChange={v => {
                const next = [...data.languages]; next[i] = { ...next[i], level: v }; setField(['languages'], next)
              }} />
              <Field label="Level (EN)" value={lang.levelEn} onChange={v => {
                const next = [...data.languages]; next[i] = { ...next[i], levelEn: v }; setField(['languages'], next)
              }} />
            </div>
          ))}
        </div>
        <SaveBtn saving={saving === 'languages'} onClick={() => save('languages')} />
      </SectionCard>

    </div>
  )
}

// ── APPEARANCE TAB ────────────────────────────────────────
const CHAR_OPTIONS: { id: CharacterType; label: string; emoji: string; desc: string }[] = [
  { id: 'robot',      label: 'Робот',     emoji: '🤖', desc: 'Технический ИИ-помощник' },
  { id: 'cat',        label: 'Котик',     emoji: '🐱', desc: 'Пушистый милый напарник' },
  { id: 'astronaut',  label: 'Астронавт', emoji: '🧑‍🚀', desc: 'Космический исследователь' },
]

function AppearanceTab({ showToast }: { showToast: (m: string, ok?: boolean) => void }) {
  const [character, setCharacter] = useState<CharacterType>('robot')
  const [hasPdf, setHasPdf] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('mascot_char') as CharacterType | null
    if (stored) setCharacter(stored)
    fetch('/api/resume-pdf').then(r => r.json()).then(d => setHasPdf(d.exists)).catch(() => {})
  }, [])

  const select = (char: CharacterType) => {
    setCharacter(char)
    localStorage.setItem('mascot_char', char)
    window.dispatchEvent(new CustomEvent('mascot-changed', { detail: char }))
  }

  const uploadPdf = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) { showToast('Нужен PDF файл', false); return }
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/resume-pdf', { method: 'POST', body: fd })
    if (res.ok) { setHasPdf(true); showToast('Резюме загружено!') }
    else showToast('Ошибка загрузки', false)
    setUploading(false)
  }

  const deletePdf = async () => {
    const res = await fetch('/api/resume-pdf', { method: 'DELETE' })
    if (res.ok) { setHasPdf(false); showToast('Файл удалён') }
    else showToast('Ошибка', false)
  }

  return (
    <div className="space-y-10">

      {/* ── Resume PDF ── */}
      <div>
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>Резюме PDF</p>
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
          Загрузите PDF — на сайте появится кнопка скачивания резюме.
        </p>

        {hasPdf ? (
          <div className="flex items-center gap-4 p-5 rounded-2xl border"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: 'rgba(249,115,22,0.1)' }}>📄</div>
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>resume.pdf</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Файл загружен и доступен для скачивания</p>
            </div>
            <div className="flex items-center gap-2">
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all hover:scale-105"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                <ExternalLink size={13} /> Открыть
              </a>
              <label className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all hover:scale-105 cursor-pointer"
                style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'rgba(249,115,22,0.06)' }}>
                ↑ Заменить
                <input type="file" accept=".pdf" className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) uploadPdf(f) }} />
              </label>
              <button onClick={deletePdf}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-all hover:border-red-500/60 hover:text-red-400"
                style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                <Trash2 size={13} /> Удалить
              </button>
            </div>
          </div>
        ) : (
          <label
            className="flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer"
            style={{
              borderColor: dragOver ? 'var(--primary)' : 'var(--border)',
              background: dragOver ? 'rgba(249,115,22,0.04)' : 'var(--bg-card)',
            }}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) uploadPdf(f) }}
          >
            <span className="text-4xl">{uploading ? '⏳' : '📎'}</span>
            <div className="text-center">
              <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
                {uploading ? 'Загружаю...' : 'Перетащите PDF или нажмите для выбора'}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Только .pdf файлы</p>
            </div>
            <input type="file" accept=".pdf" className="hidden" disabled={uploading}
              onChange={e => { const f = e.target.files?.[0]; if (f) uploadPdf(f) }} />
          </label>
        )}
      </div>

      {/* ── Mascot character ── */}
      <div>
        <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>Персонаж-ассистент</p>
        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
          Выберите кто будет следить за курсором в правом нижнем углу сайта.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CHAR_OPTIONS.map(opt => (
            <button key={opt.id} onClick={() => select(opt.id)}
              className="relative flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 hover:scale-105"
              style={{
                borderColor: character === opt.id ? 'var(--primary)' : 'var(--border)',
                background: character === opt.id ? 'rgba(249,115,22,0.07)' : 'var(--bg-card)',
                boxShadow: character === opt.id ? '0 0 20px rgba(249,115,22,0.12)' : 'none',
              }}>
              {character === opt.id && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--primary)' }}>
                  <Check size={11} color="white" strokeWidth={3} />
                </div>
              )}
              <span className="text-5xl leading-none">{opt.emoji}</span>
              <div className="text-center">
                <p className="font-bold text-sm" style={{ color: 'var(--text)' }}>{opt.label}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{opt.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <p className="text-xs mt-4 font-mono" style={{ color: 'var(--text-muted)' }}>
          Персонаж меняется мгновенно — откройте сайт в другой вкладке чтобы увидеть.
        </p>
      </div>
    </div>
  )
}

// ── MAIN ADMIN PAGE ───────────────────────────────────────
export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'projects' | 'resume' | 'appearance'>('projects')
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3000)
  }

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const tabs = [
    { id: 'projects' as const,   label: 'Проекты', icon: FolderOpen },
    { id: 'resume' as const,     label: 'Резюме',  icon: FileText },
    { id: 'appearance' as const, label: 'Вид',     icon: Sparkles },
  ]

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <AnimatePresence>{toast && <Toast message={toast.msg} ok={toast.ok} />}</AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-b px-4 md:px-8 h-16 flex items-center justify-between"
        style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="font-mono font-bold text-lg" style={{ color: 'var(--primary)' }}>{'<PE/>'}</Link>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/projects" target="_blank"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border hover:border-orange-500/40"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            <ExternalLink size={13} /> Сайт
          </Link>
          <button onClick={logout}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border hover:border-red-500/40 hover:text-red-400"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            <LogOut size={13} /> Выйти
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {/* Tab bar */}
        <div className="flex gap-1 p-1 rounded-xl mb-8 w-fit" style={{ background: 'var(--bg-card)' }}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: tab === id ? 'var(--primary)' : 'transparent',
                color: tab === id ? '#fff' : 'var(--text-muted)',
              }}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {tab === 'projects'   && <ProjectsTab showToast={showToast} />}
        {tab === 'resume'     && <ResumeTab showToast={showToast} />}
        {tab === 'appearance' && <AppearanceTab showToast={showToast} />}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useApp } from '@/context/AppContext'

type Variant = 'v1' | 'v2' | 'v3'
export type CharacterType = 'robot' | 'cat' | 'astronaut'

interface Palette {
  body: string; bodyStroke: string
  socket: string; pupil: string
  panel: string; panelStroke: string
  led1: string; led2: string; led3: string
  mouth: string; boots: string
  blinkLid: string; shadow: string
  antenna: string; antennaPing: string
  bubble: { bg: string; text: string }
  glow?: string
}

const PALETTES: Record<string, Palette> = {
  v1dark: {
    body: '#111827',     bodyStroke: '#f97316',
    socket: '#070d1a',   pupil: '#f97316',
    panel: '#070d1a',    panelStroke: '#f97316',
    led1: '#f97316',     led2: '#22d3ee',  led3: '#a78bfa',
    mouth: '#f97316',    boots: '#f97316',
    blinkLid: '#111827', shadow: 'rgba(0,0,0,0.22)',
    antenna: '#f97316',  antennaPing: '#f97316',
    bubble: { bg: '#f97316', text: '#ffffff' },
  },
  v1light: {
    body: '#f1f5f9',     bodyStroke: '#f97316',
    socket: '#e2e8f0',   pupil: '#f97316',
    panel: '#e8edf3',    panelStroke: '#f97316',
    led1: '#f97316',     led2: '#0891b2',  led3: '#7c3aed',
    mouth: '#f97316',    boots: '#f97316',
    blinkLid: '#f1f5f9', shadow: 'rgba(0,0,0,0.10)',
    antenna: '#f97316',  antennaPing: '#f97316',
    bubble: { bg: '#f97316', text: '#ffffff' },
  },
  v2: {
    body: '#0d0520',     bodyStroke: '#8b5cf6',
    socket: '#060115',   pupil: '#8b5cf6',
    panel: '#060115',    panelStroke: '#22d3ee',
    led1: '#8b5cf6',     led2: '#22d3ee',  led3: '#ec4899',
    mouth: '#8b5cf6',    boots: '#8b5cf6',
    blinkLid: '#0d0520', shadow: 'rgba(139,92,246,0.18)',
    antenna: '#8b5cf6',  antennaPing: '#22d3ee',
    bubble: { bg: '#8b5cf6', text: '#ffffff' },
    glow: 'drop-shadow(0 0 10px rgba(139,92,246,0.45))',
  },
  v3: {
    body: '#111827',     bodyStroke: '#b9ff66',
    socket: '#070d1a',   pupil: '#b9ff66',
    panel: '#070d1a',    panelStroke: '#b9ff66',
    led1: '#b9ff66',     led2: '#22d3ee',  led3: '#f472b6',
    mouth: '#b9ff66',    boots: '#b9ff66',
    blinkLid: '#111827', shadow: 'rgba(0,0,0,0.22)',
    antenna: '#b9ff66',  antennaPing: '#b9ff66',
    bubble: { bg: '#b9ff66', text: '#0d0d0d' },
  },
}

const MESSAGES_RU = ['Привет! 👋', 'Найми меня! 😄', 'DevOps инженер ⚡', 'Давай работать!', 'Свяжись со мной!']
const MESSAGES_EN = ['Hello! 👋', 'Hire me! 😄', 'DevOps Engineer ⚡', "Let's work together!", 'Get in touch!']

interface BodyProps {
  c: Palette
  pupil: { x: number; y: number }
  blink: boolean
  hovered: boolean
}

// ── Robot ─────────────────────────────────────────────────
function RobotBody({ c, pupil, blink, hovered }: BodyProps) {
  return (
    <>
      <ellipse cx="36" cy="87" rx="17" ry="3.5" fill={c.shadow} />

      <rect x="34" y="13" width="4" height="7" rx="2" fill={c.antenna} />
      <circle cx="36" cy="12" r="4.5" fill={c.antenna} />
      <motion.circle cx="36" cy="12" r="9" stroke={c.antennaPing} fill="none" strokeWidth="1.2"
        animate={{ r: [9, 14], opacity: [0.65, 0] }}
        transition={{ duration: 1.9, repeat: Infinity, ease: 'easeOut' }}
      />

      <rect x="10" y="18" width="52" height="38" rx="12" fill={c.body} />
      <rect x="10" y="18" width="52" height="38" rx="12" stroke={c.bodyStroke} strokeWidth="1.5" />

      <circle cx="25" cy="35" r="9" fill={c.socket} />
      <circle cx="25" cy="35" r="9" stroke={c.bodyStroke} strokeWidth="1" />
      <circle cx={25 + pupil.x} cy={35 + pupil.y} r="5" fill={c.pupil} />
      <circle cx={25 + pupil.x + 1.5} cy={35 + pupil.y - 1.5} r="1.5" fill="white" opacity="0.75" />
      {blink && <rect x="16" y="30.5" width="18" height="9" rx="4" fill={c.blinkLid} />}

      <circle cx="47" cy="35" r="9" fill={c.socket} />
      <circle cx="47" cy="35" r="9" stroke={c.bodyStroke} strokeWidth="1" />
      <circle cx={47 + pupil.x} cy={35 + pupil.y} r="5" fill={c.pupil} />
      <circle cx={47 + pupil.x + 1.5} cy={35 + pupil.y - 1.5} r="1.5" fill="white" opacity="0.75" />
      {blink && <rect x="38" y="30.5" width="18" height="9" rx="4" fill={c.blinkLid} />}

      <motion.path
        d={hovered ? 'M 21 48 Q 36 58 51 48' : 'M 24 48 Q 36 54 48 48'}
        stroke={c.mouth} strokeWidth="2" strokeLinecap="round" fill="none"
        transition={{ duration: 0.25 }}
      />

      <rect x="14" y="56" width="44" height="26" rx="8" fill={c.body} />
      <rect x="14" y="56" width="44" height="26" rx="8" stroke={c.bodyStroke} strokeWidth="1.5" />

      <rect x="22" y="63" width="28" height="12" rx="4" fill={c.panel} />
      <rect x="22" y="63" width="28" height="12" rx="4" stroke={c.panelStroke} strokeWidth="0.8" />
      <motion.circle cx="30" cy="69" r="2.8" fill={c.led1}
        animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.3, repeat: Infinity }}
      />
      <circle cx="36" cy="69" r="2.8" fill={c.led2} />
      <circle cx="42" cy="69" r="2.8" fill={c.led3} />

      <motion.g
        animate={hovered ? { y: [-5, 1, -5, 1, -5] } : { y: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
      >
        <rect x="1" y="57" width="14" height="9" rx="4.5" fill={c.body} />
        <rect x="1" y="57" width="14" height="9" rx="4.5" stroke={c.bodyStroke} strokeWidth="1.2" />
      </motion.g>
      <rect x="57" y="57" width="14" height="9" rx="4.5" fill={c.body} />
      <rect x="57" y="57" width="14" height="9" rx="4.5" stroke={c.bodyStroke} strokeWidth="1.2" />

      <rect x="17" y="80" width="14" height="7" rx="3.5" fill={c.boots} />
      <rect x="41" y="80" width="14" height="7" rx="3.5" fill={c.boots} />
    </>
  )
}

// ── Cat ───────────────────────────────────────────────────
function CatBody({ c, pupil, blink, hovered }: BodyProps) {
  return (
    <>
      <ellipse cx="36" cy="87" rx="16" ry="3" fill={c.shadow} />

      {/* Floating heart above head */}
      <motion.path
        d="M 36,12 C 36,12 28,7 28,4 C 28,1.5 31.5,1 36,4 C 40.5,1 44,1.5 44,4 C 44,7 36,12 36,12"
        fill={c.antenna}
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ears */}
      <polygon points="13,27 18,5 30,21" fill={c.body} stroke={c.bodyStroke} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="16,26 18,10 28,21" fill="#f9a8d4" opacity="0.65" />
      <polygon points="59,27 54,5 42,21" fill={c.body} stroke={c.bodyStroke} strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="56,26 54,10 44,21" fill="#f9a8d4" opacity="0.65" />

      {/* Head */}
      <ellipse cx="36" cy="34" rx="22" ry="19" fill={c.body} />
      <ellipse cx="36" cy="34" rx="22" ry="19" stroke={c.bodyStroke} strokeWidth="1.5" fill="none" />

      {/* Left eye */}
      <circle cx="25" cy="32" r="9" fill={c.socket} />
      <circle cx="25" cy="32" r="9" stroke={c.bodyStroke} strokeWidth="1" fill="none" />
      <circle cx={25 + pupil.x} cy={32 + pupil.y} r="5" fill={c.pupil} />
      <circle cx={25 + pupil.x + 1.5} cy={32 + pupil.y - 1.5} r="1.5" fill="white" opacity="0.75" />
      {blink && <rect x="16" y="27" width="18" height="10" rx="5" fill={c.blinkLid} />}

      {/* Right eye */}
      <circle cx="47" cy="32" r="9" fill={c.socket} />
      <circle cx="47" cy="32" r="9" stroke={c.bodyStroke} strokeWidth="1" fill="none" />
      <circle cx={47 + pupil.x} cy={32 + pupil.y} r="5" fill={c.pupil} />
      <circle cx={47 + pupil.x + 1.5} cy={32 + pupil.y - 1.5} r="1.5" fill="white" opacity="0.75" />
      {blink && <rect x="38" y="27" width="18" height="10" rx="5" fill={c.blinkLid} />}

      {/* Nose */}
      <polygon points="33.5,43 38.5,43 36,46.5" fill="#f9a8d4" />

      {/* Mouth */}
      <motion.path
        d={hovered ? 'M 29,48 Q 33,54 36,51 Q 39,54 43,48' : 'M 31,48 Q 34,52 36,50 Q 38,52 41,48'}
        stroke={c.mouth} strokeWidth="1.5" strokeLinecap="round" fill="none"
        transition={{ duration: 0.25 }}
      />

      {/* Whiskers left */}
      <line x1="3" y1="37" x2="21" y2="39" stroke={c.bodyStroke} strokeWidth="0.9" opacity="0.4" strokeLinecap="round" />
      <line x1="3" y1="41" x2="21" y2="41" stroke={c.bodyStroke} strokeWidth="0.9" opacity="0.4" strokeLinecap="round" />
      <line x1="3" y1="45" x2="21" y2="43" stroke={c.bodyStroke} strokeWidth="0.9" opacity="0.4" strokeLinecap="round" />
      {/* Whiskers right */}
      <line x1="69" y1="37" x2="51" y2="39" stroke={c.bodyStroke} strokeWidth="0.9" opacity="0.4" strokeLinecap="round" />
      <line x1="69" y1="41" x2="51" y2="41" stroke={c.bodyStroke} strokeWidth="0.9" opacity="0.4" strokeLinecap="round" />
      <line x1="69" y1="45" x2="51" y2="43" stroke={c.bodyStroke} strokeWidth="0.9" opacity="0.4" strokeLinecap="round" />

      {/* Body */}
      <ellipse cx="36" cy="68" rx="18" ry="14" fill={c.body} />
      <ellipse cx="36" cy="68" rx="18" ry="14" stroke={c.bodyStroke} strokeWidth="1.5" fill="none" />
      {/* Belly */}
      <ellipse cx="36" cy="67" rx="10" ry="8" fill={c.socket} opacity="0.45" />

      {/* Left paw */}
      <circle cx="22" cy="80" r="7" fill={c.body} />
      <circle cx="22" cy="80" r="7" stroke={c.bodyStroke} strokeWidth="1.2" fill="none" />
      <line x1="18" y1="84" x2="19" y2="86" stroke={c.bodyStroke} strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />
      <line x1="22" y1="85" x2="22" y2="87" stroke={c.bodyStroke} strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />
      <line x1="26" y1="84" x2="25" y2="86" stroke={c.bodyStroke} strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />

      {/* Right paw */}
      <circle cx="50" cy="80" r="7" fill={c.body} />
      <circle cx="50" cy="80" r="7" stroke={c.bodyStroke} strokeWidth="1.2" fill="none" />
      <line x1="46" y1="84" x2="47" y2="86" stroke={c.bodyStroke} strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />
      <line x1="50" y1="85" x2="50" y2="87" stroke={c.bodyStroke} strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />
      <line x1="54" y1="84" x2="53" y2="86" stroke={c.bodyStroke} strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />

      {/* Tail */}
      <path d="M 52,66 C 66,61 70,73 63,82" stroke={c.bodyStroke} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </>
  )
}

// ── Astronaut ──────────────────────────────────────────────
const VISOR = 'rgba(2,5,22,0.93)'

function AstronautBody({ c, pupil, blink, hovered }: BodyProps) {
  return (
    <>
      <ellipse cx="36" cy="87" rx="17" ry="3.5" fill={c.shadow} />

      {/* Antenna on helmet */}
      <line x1="52" y1="12" x2="61" y2="5" stroke={c.antenna} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="61" cy="4" r="3" fill={c.antenna} />
      <motion.circle cx="61" cy="4" r="5" stroke={c.antennaPing} fill="none" strokeWidth="1"
        animate={{ r: [5, 9], opacity: [0.6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />

      {/* Helmet */}
      <circle cx="36" cy="27" r="22" fill={c.body} />
      <circle cx="36" cy="27" r="22" stroke={c.bodyStroke} strokeWidth="1.5" fill="none" />

      {/* Visor */}
      <ellipse cx="36" cy="29" rx="15" ry="13" fill={VISOR} />
      <ellipse cx="36" cy="29" rx="15" ry="13" stroke={c.bodyStroke} strokeWidth="0.8" fill="none" opacity="0.4" />

      {/* Stars inside visor */}
      <circle cx="25" cy="21" r="1" fill="white" opacity="0.45" />
      <circle cx="45" cy="22" r="1.4" fill="white" opacity="0.35" />
      <circle cx="39" cy="18" r="0.8" fill="white" opacity="0.5" />
      <circle cx="28" cy="26" r="0.7" fill="white" opacity="0.3" />

      {/* Eyes through visor */}
      <circle cx="27" cy="31" r="6" fill={c.socket} />
      <circle cx={27 + pupil.x * 0.55} cy={31 + pupil.y * 0.55} r="3.5" fill={c.pupil} />
      <circle cx={27 + pupil.x * 0.55 + 1} cy={31 + pupil.y * 0.55 - 1} r="1.2" fill="white" opacity="0.7" />
      {blink && <rect x="20" y="27" width="14" height="8" rx="4" fill={VISOR} />}

      <circle cx="45" cy="31" r="6" fill={c.socket} />
      <circle cx={45 + pupil.x * 0.55} cy={31 + pupil.y * 0.55} r="3.5" fill={c.pupil} />
      <circle cx={45 + pupil.x * 0.55 + 1} cy={31 + pupil.y * 0.55 - 1} r="1.2" fill="white" opacity="0.7" />
      {blink && <rect x="38" y="27" width="14" height="8" rx="4" fill={VISOR} />}

      {/* Visor glass sheen */}
      <ellipse cx="29" cy="20" rx="5" ry="3.5" fill="white" opacity="0.07" />

      {/* Mouth inside visor */}
      <motion.path
        d={hovered ? 'M 24,40 Q 36,47 48,40' : 'M 26,40 Q 36,45 46,40'}
        stroke={c.mouth} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.75"
        transition={{ duration: 0.25 }}
      />

      {/* Collar ring */}
      <rect x="14" y="46" width="44" height="7" rx="4" fill={c.body} />
      <rect x="14" y="46" width="44" height="7" rx="4" stroke={c.bodyStroke} strokeWidth="1.2" fill="none" />

      {/* Suit */}
      <rect x="11" y="52" width="50" height="27" rx="8" fill={c.body} />
      <rect x="11" y="52" width="50" height="27" rx="8" stroke={c.bodyStroke} strokeWidth="1.5" fill="none" />

      {/* Mission patch */}
      <circle cx="21" cy="64" r="7" fill={c.panel} />
      <circle cx="21" cy="64" r="7" stroke={c.bodyStroke} strokeWidth="0.8" fill="none" />
      <circle cx="21" cy="64" r="3.5" fill={c.led1} opacity="0.7" />

      {/* Status panel */}
      <rect x="33" y="58" width="22" height="13" rx="3" fill={c.panel} />
      <rect x="33" y="58" width="22" height="13" rx="3" stroke={c.panelStroke} strokeWidth="0.7" fill="none" />
      <motion.circle cx="39" cy="64.5" r="2.5" fill={c.led1}
        animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.3, repeat: Infinity }}
      />
      <circle cx="46" cy="64.5" r="2.5" fill={c.led2} />
      <circle cx="52" cy="64.5" r="2.5" fill={c.led3} />

      {/* Left arm (waves on hover) */}
      <motion.g
        animate={hovered ? { y: [-5, 1, -5, 1, -5] } : { y: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
      >
        <rect x="0" y="54" width="12" height="9" rx="4.5" fill={c.body} />
        <rect x="0" y="54" width="12" height="9" rx="4.5" stroke={c.bodyStroke} strokeWidth="1.2" fill="none" />
      </motion.g>

      {/* Right arm */}
      <rect x="60" y="54" width="12" height="9" rx="4.5" fill={c.body} />
      <rect x="60" y="54" width="12" height="9" rx="4.5" stroke={c.bodyStroke} strokeWidth="1.2" fill="none" />

      {/* Boots */}
      <rect x="16" y="78" width="14" height="8" rx="4" fill={c.boots} />
      <rect x="42" y="78" width="14" height="8" rx="4" fill={c.boots} />
    </>
  )
}

// ── Main component ─────────────────────────────────────────
export default function MascotAssistant({ variant = 'v1' }: { variant?: Variant }) {
  const { lang } = useApp()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [character, setCharacter] = useState<CharacterType>('robot')
  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [blink, setBlink] = useState(false)
  const [msgIdx, setMsgIdx] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('mascot_char') as CharacterType | null
    if (stored) setCharacter(stored)

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'mascot_char' && e.newValue) setCharacter(e.newValue as CharacterType)
    }
    const onCustom = (e: Event) => {
      const char = (e as CustomEvent<CharacterType>).detail
      if (char) setCharacter(char)
    }
    window.addEventListener('storage', onStorage)
    window.addEventListener('mascot-changed', onCustom)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('mascot-changed', onCustom)
    }
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    const loop = () => {
      if (ref.current) {
        const r = ref.current.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = mouseRef.current.x - cx
        const dy = mouseRef.current.y - cy
        const dist = Math.sqrt(dx * dx + dy * dy) || 1
        const maxP = 3.5
        setPupil({
          x: (dx / dist) * Math.min(maxP, dist * 0.06),
          y: (dy / dist) * Math.min(maxP, dist * 0.06),
        })
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const doBlink = () => {
      setBlink(true)
      setTimeout(() => setBlink(false), 130)
      t = setTimeout(doBlink, 2200 + Math.random() * 3800)
    }
    t = setTimeout(doBlink, 1600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!hovered) return
    const t = setInterval(() => setMsgIdx(i => (i + 1) % MESSAGES_RU.length), 2600)
    return () => clearInterval(t)
  }, [hovered])

  const c: Palette =
    variant === 'v2' ? PALETTES.v2 :
    variant === 'v3' ? PALETTES.v3 :
    (mounted && resolvedTheme === 'light') ? PALETTES.v1light : PALETTES.v1dark

  const msgs = lang === 'ru' ? MESSAGES_RU : MESSAGES_EN
  const Body = character === 'cat' ? CatBody : character === 'astronaut' ? AstronautBody : RobotBody

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-50 select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMsgIdx(0) }}
      aria-hidden="true"
    >
      <AnimatePresence mode="wait">
        {hovered && (
          <motion.div
            key={msgIdx}
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-[calc(100%+8px)] right-0 px-3 py-1.5 text-xs font-mono font-bold whitespace-nowrap pointer-events-none"
            style={{
              background: c.bubble.bg,
              color: c.bubble.text,
              borderRadius: '8px 8px 2px 8px',
              boxShadow: '3px 3px 0 rgba(0,0,0,0.25)',
            }}
          >
            {msgs[msgIdx]}
            <span
              className="absolute -bottom-2 right-2 border-8 border-transparent"
              style={{ borderTopColor: c.bubble.bg }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ cursor: 'pointer' }}
      >
        {/* Increased from 90×110 to 115×140 */}
        <svg width="115" height="140" viewBox="0 0 72 88" fill="none" style={{ filter: c.glow }}>
          <Body c={c} pupil={pupil} blink={blink} hovered={hovered} />
        </svg>
      </motion.div>
    </div>
  )
}

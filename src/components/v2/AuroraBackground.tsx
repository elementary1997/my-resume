'use client'

import { useTheme } from 'next-themes'

export default function AuroraBackground() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme !== 'light'
  const op = isDark ? 0.18 : 0.10

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Violet blob — top left */}
      <div
        className="aurora-blob blob-animate-1"
        style={{
          width: '55vw', height: '55vw',
          top: '-15%', left: '-10%',
          background: `radial-gradient(circle, rgba(139,92,246,${op * 1.2}), transparent 70%)`,
        }}
      />
      {/* Cyan blob — top right */}
      <div
        className="aurora-blob blob-animate-2"
        style={{
          width: '40vw', height: '40vw',
          top: '5%', right: '-5%',
          background: `radial-gradient(circle, rgba(34,211,238,${op}), transparent 70%)`,
        }}
      />
      {/* Emerald blob — bottom center */}
      <div
        className="aurora-blob blob-animate-3"
        style={{
          width: '45vw', height: '45vw',
          bottom: '-10%', left: '30%',
          background: `radial-gradient(circle, rgba(16,185,129,${op * 0.8}), transparent 70%)`,
        }}
      />
      {/* Pink accent — mid right */}
      <div
        className="aurora-blob blob-animate-1"
        style={{
          width: '25vw', height: '25vw',
          top: '40%', right: '10%',
          background: `radial-gradient(circle, rgba(236,72,153,${op * 0.6}), transparent 70%)`,
          animationDelay: '3s',
        }}
      />

      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
          opacity: isDark ? 0.4 : 0.2,
        }}
      />
    </div>
  )
}

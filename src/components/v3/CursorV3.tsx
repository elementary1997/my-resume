'use client'

import { useEffect, useRef } from 'react'

export default function CursorV3() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
    }

    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.transform = 'scale(3)'
    }
    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.transform = 'scale(1)'
    }

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12

      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x - 5 + 'px'
        dotRef.current.style.top = pos.current.y - 5 + 'px'
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x - 18 + 'px'
        ringRef.current.style.top = ring.current.y - 18 + 'px'
      }
      raf.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    raf.current = requestAnimationFrame(animate)
    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="v3-cursor"
        style={{ width: 10, height: 10, marginLeft: 0, marginTop: 0 }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="v3-cursor"
        style={{
          width: 36, height: 36,
          background: 'transparent',
          border: '1.5px solid #b9ff66',
          opacity: 0.6,
        }}
      />
    </>
  )
}

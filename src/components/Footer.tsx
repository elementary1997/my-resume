'use client'

import { Heart } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { t, tr } from '@/i18n/translations'

export default function Footer() {
  const { lang } = useApp()

  return (
    <footer
      className="py-8 text-center border-t"
      style={{ borderColor: 'var(--border)' }}
    >
      <p className="text-sm font-mono flex items-center justify-center gap-2" style={{ color: 'var(--text-muted)' }}>
        {tr(t.footer.made, lang)}
        <Heart size={14} className="animate-pulse" style={{ color: 'var(--primary)' }} />
        by Елипашев Павел · {new Date().getFullYear()}
      </p>
    </footer>
  )
}

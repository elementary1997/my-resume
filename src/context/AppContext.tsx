'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Lang } from '@/i18n/translations'

interface AppContextType {
  lang: Lang
  setLang: (lang: Lang) => void
}

const AppContext = createContext<AppContextType>({ lang: 'ru', setLang: () => {} })

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ru')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'ru' || stored === 'en') setLangState(stored)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  return (
    <AppContext.Provider value={{ lang, setLang }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)

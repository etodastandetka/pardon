'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'ru'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [translations, setTranslations] = useState<any>(null)

  useEffect(() => {
    // Load saved language from localStorage
    const savedLang = localStorage.getItem('pardon-language') as Language
    if (savedLang && (savedLang === 'en' || savedLang === 'ru')) {
      setLanguageState(savedLang)
    }
  }, [])

  useEffect(() => {
    // Load translations
    import(`@/app/i18n/${language}.json`).then((mod) => {
      setTranslations(mod.default)
    })
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('pardon-language', lang)
  }

  const t = (key: string): string => {
    if (!translations) return key
    const keys = key.split('.')
    let value: any = translations
    for (const k of keys) {
      value = value?.[k]
    }
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}


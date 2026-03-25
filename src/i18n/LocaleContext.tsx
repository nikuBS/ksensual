import { useMemo, useState, type ReactNode } from 'react'
import type { Locale } from './locales'
import { LocaleContext } from './locale-context'

const STORAGE_KEY = 'ksensual-locale'

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'en' || saved === 'ko' || saved === 'es') {
    return saved
  }

  return 'en'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale())

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }

  const value = useMemo(() => ({ locale, setLocale }), [locale])

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

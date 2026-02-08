"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type Lang = "ru" | "en"

interface LanguageContextValue {
  lang: Lang
  toggleLang: () => void
  t: (ru: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru")

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "ru" ? "en" : "ru"))
  }, [])

  const t = useCallback(
    (ru: string, en: string) => (lang === "ru" ? ru : en),
    [lang]
  )

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLang must be used within LanguageProvider")
  }
  return context
}

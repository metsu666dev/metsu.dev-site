"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type Lang = "ru" | "en"

interface LanguageContextType {
  lang: Lang
  toggleLang: () => void
  t: (ru: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

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
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLang must be used within LanguageProvider")
  return ctx
}

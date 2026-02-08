"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

export type AccentMode = "violet" | "pink" | "green"

interface AccentContextValue {
  accent: AccentMode
  setAccent: (mode: AccentMode) => void
}

const AccentContext = createContext<AccentContextValue | null>(null)

const ACCENT_CONFIG: Record<AccentMode, { h: number; s: string; l: string; hex: string; fgDark: boolean }> = {
  violet: { h: 251, s: "100%", l: "68%", hex: "#7A5CFF", fgDark: false },
  pink: { h: 340, s: "100%", l: "65%", hex: "#FF4D8D", fgDark: false },
  green: { h: 150, s: "80%", l: "50%", hex: "#1AE066", fgDark: true },
}

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<AccentMode>("violet")

  useEffect(() => {
    const stored = localStorage.getItem("metsu-accent") as AccentMode | null
    if (stored && ACCENT_CONFIG[stored]) {
      setAccentState(stored)
    }
  }, [])

  useEffect(() => {
    const config = ACCENT_CONFIG[accent]
    const root = document.documentElement
    root.style.setProperty("--primary", `${config.h} ${config.s} ${config.l}`)
    root.style.setProperty("--ring", `${config.h} ${config.s} ${config.l}`)
    root.style.setProperty("--accent-h", String(config.h))
    root.style.setProperty("--accent-s", config.s)
    root.style.setProperty("--accent-l", config.l)
    root.style.setProperty("--accent-hex", config.hex)

    if (config.fgDark) {
      root.style.setProperty("--primary-foreground", "240 12% 5%")
    } else {
      root.style.setProperty("--primary-foreground", "0 0% 100%")
    }
  }, [accent])

  const setAccent = useCallback((mode: AccentMode) => {
    setAccentState(mode)
    localStorage.setItem("metsu-accent", mode)
  }, [])

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  )
}

export function useAccent() {
  const context = useContext(AccentContext)
  if (!context) {
    throw new Error("useAccent must be used within AccentProvider")
  }
  return context
}

"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"

export type AccentMode = "violet" | "pink" | "green"

interface AccentContextType {
  accent: AccentMode
  setAccent: (mode: AccentMode) => void
}

const AccentContext = createContext<AccentContextType | null>(null)

const ACCENT_MAP: Record<AccentMode, { h: number; s: number; l: number; hex: string }> = {
  violet: { h: 251, s: 100, l: 68, hex: "#7A5CFF" },
  pink:   { h: 340, s: 100, l: 65, hex: "#FF4D8D" },
  green:  { h: 150, s: 80, l: 50, hex: "#1AE066" },
}

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<AccentMode>("violet")

  // Read from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("metsu-accent") as AccentMode | null
    if (stored && ACCENT_MAP[stored]) {
      setAccentState(stored)
    }
  }, [])

  // Apply CSS custom properties whenever accent changes
  useEffect(() => {
    const { h, s, l, hex } = ACCENT_MAP[accent]
    const root = document.documentElement

    // Update primary color (used by hsl(var(--primary)))
    root.style.setProperty("--primary", `${h} ${s}% ${l}%`)
    root.style.setProperty("--ring", `${h} ${s}% ${l}%`)

    // Green needs dark text on primary buttons for contrast
    if (accent === "green") {
      root.style.setProperty("--primary-foreground", "240 12% 5%")
    } else {
      root.style.setProperty("--primary-foreground", "0 0% 100%")
    }

    // Expose raw values for glow effects in CSS
    root.style.setProperty("--accent-hex", hex)
    root.style.setProperty("--accent-h", String(h))
    root.style.setProperty("--accent-s", `${s}%`)
    root.style.setProperty("--accent-l", `${l}%`)

    // Update grid-bg tint
    root.style.setProperty(
      "--grid-color",
      `rgba(${hexToRgb(hex)}, 0.03)`
    )
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
  const ctx = useContext(AccentContext)
  if (!ctx) throw new Error("useAccent must be used within AccentProvider")
  return ctx
}

function hexToRgb(hex: string): string {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

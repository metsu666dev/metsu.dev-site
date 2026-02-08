"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLang } from "@/components/language-provider"
import { useAccent, type AccentMode } from "@/components/accent-provider"

const ACCENT_OPTIONS: { mode: AccentMode; label: string; dot: string }[] = [
  { mode: "violet", label: "V", dot: "bg-[#7A5CFF]" },
  { mode: "pink", label: "P", dot: "bg-[#FF4D8D]" },
  { mode: "green", label: "G", dot: "bg-[#4DFF88]" },
]

export function Header() {
  const { lang, toggleLang, t } = useLang()
  const { accent, setAccent } = useAccent()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: "#services", label: t("Услуги", "Services") },
    { href: "#projects", label: t("Проекты", "Projects") },
    { href: "#cta", label: t("Контакт", "Contact") },
  ]

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Brand */}
        <a href="/" className="text-lg font-bold tracking-tight text-foreground">
          metsu<span className="text-primary">.dev</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}

          {/* Divider */}
          <div className="h-5 w-px bg-border" />

          {/* Metsu mode switcher */}
          <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary p-1">
            {ACCENT_OPTIONS.map((opt) => (
              <button
                key={opt.mode}
                type="button"
                onClick={() => setAccent(opt.mode)}
                className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold transition-all ${
                  accent === opt.mode
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label={`${opt.mode} accent`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${opt.dot}`} />
              </button>
            ))}
          </div>

          {/* Language switcher */}
          <button
            type="button"
            onClick={toggleLang}
            className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg border border-border bg-secondary px-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            aria-label={t("Переключить на английский", "Switch to Russian")}
          >
            {lang === "ru" ? "EN" : "RU"}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Metsu mode switcher - compact */}
          <div className="flex items-center gap-0.5 rounded-lg border border-border bg-secondary p-0.5">
            {ACCENT_OPTIONS.map((opt) => (
              <button
                key={opt.mode}
                type="button"
                onClick={() => setAccent(opt.mode)}
                className={`flex h-7 w-7 items-center justify-center rounded-md transition-all ${
                  accent === opt.mode
                    ? "bg-card shadow-sm"
                    : ""
                }`}
                aria-label={`${opt.mode} accent`}
              >
                <span className={`h-2 w-2 rounded-full ${opt.dot}`} />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={toggleLang}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-secondary text-sm font-semibold text-foreground"
          >
            {lang === "ru" ? "EN" : "RU"}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-border bg-secondary text-foreground"
            aria-label={mobileOpen ? t("Закрыть меню", "Close menu") : t("Открыть меню", "Open menu")}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <nav className="animate-slide-in border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex min-h-[48px] items-center border-b border-border/30 text-base text-muted-foreground transition-colors last:border-0 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

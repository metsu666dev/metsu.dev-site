"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useLang } from "@/components/language-provider"
import { useAccent, type AccentMode } from "@/components/accent-provider"

const ACCENT_OPTIONS: { mode: AccentMode; dot: string }[] = [
  { mode: "violet", dot: "bg-[#7A5CFF]" },
  { mode: "pink", dot: "bg-[#FF4D8D]" },
  { mode: "green", dot: "bg-[#1AE066]" },
]

export function Header() {
  const { lang, toggleLang, t } = useLang()
  const { accent, setAccent } = useAccent()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { href: "#services", label: t("Услуги", "Services") },
    { href: "#skills", label: t("Навыки", "Skills") },
    { href: "#work", label: t("В разработке", "In progress") },
    { href: "#cta", label: t("Контакт", "Contact") },
  ]

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/[0.06] bg-background/40 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="/" className="text-lg font-bold tracking-tight text-foreground">
          metsu<span className="text-primary brand-cursor">.dev</span>
        </a>

        <nav className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
          <div className="h-5 w-px bg-white/[0.06]" />
          <div className="flex items-center gap-1 rounded-full border border-white/[0.06] bg-card/30 p-1 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
            {ACCENT_OPTIONS.map((opt) => (
              <button key={opt.mode} type="button" onClick={() => setAccent(opt.mode)} className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${accent === opt.mode ? "ring-2 ring-foreground/30 ring-offset-1 ring-offset-background" : ""}`} aria-label={`${opt.mode} accent`}>
                <span className={`h-3 w-3 rounded-full ${opt.dot}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={toggleLang} className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center rounded-lg border border-white/[0.06] bg-card/30 px-2.5 text-sm font-semibold text-foreground backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-colors hover:border-primary/50 hover:text-primary" aria-label={t("Переключить на английский", "Switch to Russian")}>
            {lang === "ru" ? "EN" : "RU"}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <div className="flex items-center gap-0.5 rounded-full border border-white/[0.06] bg-card/30 p-0.5 backdrop-blur-xl">
            {ACCENT_OPTIONS.map((opt) => (
              <button key={opt.mode} type="button" onClick={() => setAccent(opt.mode)} className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${accent === opt.mode ? "ring-2 ring-foreground/30" : ""}`} aria-label={`${opt.mode} accent`}>
                <span className={`h-2.5 w-2.5 rounded-full ${opt.dot}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={toggleLang} className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/[0.06] bg-card/30 text-sm font-semibold text-foreground backdrop-blur-xl">
            {lang === "ru" ? "EN" : "RU"}
          </button>
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-white/[0.06] bg-card/30 text-foreground backdrop-blur-xl" aria-label={mobileOpen ? t("Закрыть меню", "Close menu") : t("Открыть меню", "Open menu")}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="animate-slide-in border-t border-white/[0.06] bg-background/40 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="flex min-h-[48px] items-center border-b border-white/[0.06] text-base text-muted-foreground transition-colors last:border-0 hover:text-foreground">
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

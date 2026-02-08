"use client"

import { useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { useLang } from "@/components/language-provider"

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLang()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const entry of entries) { if (entry.isIntersecting) entry.target.classList.add("animate-fade-in-up") } },
      { threshold: 0.1 },
    )
    const elements = sectionRef.current?.querySelectorAll("[data-animate]")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="cta" className="relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div data-animate className="rounded-2xl border border-white/[0.06] bg-card/30 px-8 py-16 text-center opacity-0 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]" style={{ animationDelay: "0s" }}>
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">{t("Есть проект?", "Got a project?")}</h2>
          <p className="mb-8 text-lg text-muted-foreground">{t("Напиши — задам пару вопросов и предложу лучший вариант.", "Write to me — I'll ask a few questions and suggest the best option.")}</p>
          <a href="https://t.me/metsu_dev" target="_blank" rel="noopener noreferrer" className="glow-accent glow-accent-hover inline-flex min-h-[48px] items-center gap-2.5 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            <Send className="h-4 w-4" />
            {t("Написать в Telegram", "Message on Telegram")}
          </a>
          <p className="mt-4 text-sm text-muted-foreground">{t("Отвечаю быстро.", "I respond quickly.")}</p>
        </div>
      </div>
    </section>
  )
}

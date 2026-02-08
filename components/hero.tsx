"use client"

import { useEffect, useRef } from "react"
import { Send, ArrowRight, ChevronDown } from "lucide-react"
import { useLang } from "@/components/language-provider"

const STACK_LINE = "Next.js / React / TypeScript / Python / Telegram Bot API / Prisma / VPS"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLang()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("animate-fade-in-up")
        }
      },
      { threshold: 0.1 },
    )
    const elements = sectionRef.current?.querySelectorAll("[data-animate]")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-24 pb-16 lg:px-8">
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1 data-animate className="select-none text-[clamp(3.5rem,13vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-foreground opacity-0" style={{ animationDelay: "0s" }}>
          metsu<span className="text-primary brand-cursor">.dev</span>
        </h1>

        <div
          data-animate
          className="mx-auto mt-10 max-w-2xl rounded-2xl border border-white/[0.08] bg-white/[0.03] px-8 py-10 opacity-0 backdrop-blur-xl md:px-12 md:py-12"
          style={{ animationDelay: "0.15s" }}
        >
          <p className="text-balance text-lg leading-relaxed text-foreground/80 md:text-xl">
            {t("Телеграм-боты, сайты и мини-аппы для бизнеса, которому нужны результаты.", "Telegram bots, websites & mini apps for businesses that need results.")}
          </p>
          <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
            {t("Без менеджеров. Напрямую.", "No managers. Direct.")}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a href="https://t.me/metsu_dev" target="_blank" rel="noopener noreferrer" className="glow-accent glow-accent-hover inline-flex min-h-[48px] items-center gap-2.5 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
              <Send className="h-4 w-4" />
              {t("Написать в Telegram", "Message on Telegram")}
            </a>
            <a href="#services" className="group inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-border bg-transparent px-8 py-3 text-base font-semibold text-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary active:scale-[0.98]">
              <span className="relative">{t("Подробнее", "Learn more")}<span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" /></span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="rounded-lg border border-border/40 bg-card/50 px-4 py-2.5 text-left backdrop-blur-sm">
              <span className="font-mono text-xs">
                <span className="text-primary">bash&gt;</span>
                <span className="text-muted-foreground"> stack: {STACK_LINE}</span>
                <span className="animate-blink text-primary/50">|</span>
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#services"
          className="mt-8 mb-4 flex flex-col items-center gap-1"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/50">scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce text-muted-foreground/40" />
        </a>
      </div>
    </section>
  )
}

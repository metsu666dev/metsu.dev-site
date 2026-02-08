"use client"

import { useEffect, useRef, useState } from "react"
import { Send, ArrowRight } from "lucide-react"
import { useLang } from "@/components/language-provider"

const STACK_LINE = "Next.js / TypeScript / Telegram Bot API / Prisma / VPS"

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLang()

  /* Typing animation: types ".dev" then shows blinking "_" */
  const [typed, setTyped] = useState("")
  const [doneTyping, setDoneTyping] = useState(false)
  const devText = ".dev"

  useEffect(() => {
    let cancelled = false
    let i = 0
    const delay = setTimeout(() => {
      const interval = setInterval(() => {
        if (cancelled) return
        i++
        setTyped(devText.slice(0, i))
        if (i >= devText.length) {
          clearInterval(interval)
          setDoneTyping(true)
        }
      }, 150)
    }, 800)
    return () => {
      cancelled = true
      clearTimeout(delay)
    }
  }, [])

  /* Scroll reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        }
      },
      { threshold: 0.1 },
    )
    const elements = sectionRef.current?.querySelectorAll("[data-animate]")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pt-24 pb-16 lg:px-8"
    >
      {/* Strong dark overlay behind hero text — 75% opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 42%, rgba(11,11,14,0.75) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* ── Brand name: metsu.dev_ ── */}
        <h1
          data-animate
          className="select-none text-[clamp(3.5rem,13vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-foreground opacity-0"
          style={{ animationDelay: "0s" }}
        >
          metsu
          <span className={`text-primary ${doneTyping ? "animate-dev-glow" : ""}`}>
            {typed}
          </span>
          {/* Underscore cursor — accent colored, blinks at 1.2s */}
          <span
            className={`inline-block text-primary ${doneTyping ? "animate-typing-cursor" : ""}`}
            style={{
              fontSize: "0.55em",
              fontWeight: 400,
              verticalAlign: "baseline",
              marginLeft: "-0.02em",
            }}
          >
            _
          </span>
        </h1>

        {/* ── Tagline ── */}
        <p
          data-animate
          className="mx-auto mt-8 max-w-lg text-balance text-lg leading-relaxed text-foreground/80 opacity-0 md:text-xl"
          style={{ animationDelay: "0.2s" }}
        >
          {t(
            "\u0422\u0435\u043b\u0435\u0433\u0440\u0430\u043c-\u0431\u043e\u0442\u044b, \u0441\u0430\u0439\u0442\u044b \u0438 \u043c\u0438\u043d\u0438-\u0430\u043f\u043f\u044b \u0434\u043b\u044f \u0431\u0438\u0437\u043d\u0435\u0441\u0430, \u043a\u043e\u0442\u043e\u0440\u043e\u043c\u0443 \u043d\u0443\u0436\u043d\u044b \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b.",
            "Telegram bots, websites & mini apps for businesses that need results.",
          )}
        </p>

        <p
          data-animate
          className="mx-auto mt-3 max-w-md text-pretty text-base leading-relaxed text-muted-foreground opacity-0"
          style={{ animationDelay: "0.3s" }}
        >
          {t(
            "\u0411\u0435\u0437 \u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440\u043e\u0432. \u041d\u0430\u043f\u0440\u044f\u043c\u0443\u044e.",
            "No managers. Direct.",
          )}
        </p>

        {/* ── CTA buttons ── */}
        <div
          data-animate
          className="mt-10 flex flex-col items-center gap-4 opacity-0 sm:flex-row sm:justify-center"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="https://t.me/metsu_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-accent glow-accent-hover inline-flex min-h-[48px] items-center gap-2.5 rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send className="h-4 w-4" />
            {t("\u041d\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0432 Telegram", "Message on Telegram")}
          </a>
          <a
            href="#services"
            className="group inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-border bg-transparent px-8 py-3 text-base font-semibold text-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary active:scale-[0.98]"
          >
            <span className="relative">
              {t("\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435", "Learn more")}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* ── Terminal stack line ── */}
        <div
          data-animate
          className="mx-auto mt-12 max-w-xl opacity-0"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="inline-flex items-center gap-2 rounded-lg border border-border/40 bg-card/50 px-4 py-2.5 backdrop-blur-sm">
            <span className="font-mono text-xs text-primary/50">{">"}</span>
            <span className="font-mono text-xs text-muted-foreground">
              <span className="text-foreground/60">stack:</span>{" "}{STACK_LINE}
            </span>
            <span className="animate-blink font-mono text-xs text-primary/50">|</span>
          </div>
        </div>
      </div>
    </section>
  )
}

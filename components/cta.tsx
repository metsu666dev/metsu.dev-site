"use client"

import { useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { useLang } from "@/components/language-provider"

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLang()

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
    <section ref={sectionRef} id="cta" className="relative px-6 py-32 lg:px-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[400px] w-[600px] rounded-full opacity-[0.04] blur-[120px]"
          style={{ background: "hsl(var(--primary))" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2
          data-animate
          className="text-balance text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-5xl lg:text-6xl"
          style={{ animationDelay: "0s" }}
        >
          {t("Есть проект?", "Got a project?")}
        </h2>
        <p
          data-animate
          className="mt-4 text-lg text-muted-foreground opacity-0 md:text-xl"
          style={{ animationDelay: "0.15s" }}
        >
          {t(
            "Напиши — задам пару вопросов и предложу лучший вариант.",
            "Write me \u2014 I\u2019ll ask a few questions and suggest the best option.",
          )}
        </p>

        <div
          data-animate
          className="mt-10 opacity-0"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="https://t.me/metsu_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-accent glow-accent-hover inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-primary px-10 py-4 text-base font-semibold text-primary-foreground transition-all duration-300 hover:scale-[1.02] md:text-lg"
          >
            <Send className="h-5 w-5" />
            {t("Написать в Telegram", "Message on Telegram")}
          </a>
        </div>

        {/* Small note */}
        <p
          data-animate
          className="mt-4 text-sm text-muted-foreground/60 opacity-0"
          style={{ animationDelay: "0.4s" }}
        >
          {t("Отвечаю быстро.", "I reply fast.")}
        </p>
      </div>
    </section>
  )
}

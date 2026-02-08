"use client"

import { useEffect, useRef } from "react"
import { useLang } from "@/components/language-provider"

const WORK_ITEMS = [
  "Mini App для ювелирного магазина — в разработке",
  "Telegram-бот для парсинга данных из приватных каналов — в разработке",
  "Кастомный Telegram-клиент — в разработке",
  "Telegram-бот для грузинского ресторана — в разработке",
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLang()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("animate-fade-in-up")
        }
      },
      { threshold: 0.12 },
    )
    const elements = sectionRef.current?.querySelectorAll("[data-animate]")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <p
            data-animate
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary opacity-0"
            style={{ animationDelay: "0s" }}
          >
            {t("Статус", "Status")}
          </p>
          <h2
            data-animate
            className="text-balance text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-4xl"
            style={{ animationDelay: "0.1s" }}
          >
            {t("В разработке", "In progress")}
          </h2>
        </div>

        <div className="grid gap-3">
          {WORK_ITEMS.map((text, i) => (
            <div
              key={text}
              data-animate
              className="relative overflow-hidden rounded-xl border border-border bg-card/60 px-5 py-4 opacity-0 backdrop-blur-sm transition-colors hover:border-primary/25"
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary/80" />
                <p className="text-base leading-relaxed text-foreground/90">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { useLang } from "@/components/language-provider"

export function About() {
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
    <section ref={sectionRef} className="relative px-6 py-24 lg:px-8">
      <div className="scan-line relative mx-auto max-w-3xl text-center">
        <p
          data-animate
          className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary opacity-0"
          style={{ animationDelay: "0s" }}
        >
          {t("Подход", "Approach")}
        </p>
        <h2
          data-animate
          className="mb-12 text-balance text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-5xl"
          style={{ animationDelay: "0.1s" }}
        >
          {t("Как я работаю", "How I work")}
        </h2>

        <div data-animate className="opacity-0" style={{ animationDelay: "0.2s" }}>
          <div className="flex flex-col gap-3">
            <p className="text-xl leading-relaxed text-foreground/90 md:text-2xl">
              {t("Работаю напрямую.", "I work directly.")}
            </p>
            <p className="text-xl leading-relaxed text-foreground/90 md:text-2xl">
              {t("Без менеджеров.", "No managers.")}
            </p>
            <p className="text-xl leading-relaxed text-foreground/90 md:text-2xl">
              {t("Без лишних созвонов.", "No unnecessary calls.")}
            </p>

            <div className="my-4">
              <p className="text-2xl font-bold text-foreground md:text-3xl">
                <span className="text-primary">{t("Скорость", "Speed")}</span>
                {". "}
                <span className="text-primary">{t("Ясность", "Clarity")}</span>
                {". "}
                <span className="text-primary">{t("Результат", "Result")}</span>
                {"."}
              </p>
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              {t(
                "Если что-то не приносит ценность — я это не делаю.",
                "If something doesn\u2019t bring value \u2014 I don\u2019t build it.",
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

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
          className="mb-10 text-balance text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-5xl"
          style={{ animationDelay: "0.1s" }}
        >
          {t("Как я работаю", "How I work")}
        </h2>

        <div data-animate className="opacity-0" style={{ animationDelay: "0.2s" }}>
          <div className="mx-auto flex max-w-2xl flex-col gap-4 text-left">
            <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
              Работаю напрямую с клиентом — это ускоряет процесс и убирает искажения.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
              Фокусируюсь на задаче и результате, а не на формальностях.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
              Без менеджеров и лишней бюрократии.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
              Без созвонов — только простое и понятное общение в чате.
            </p>
            <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
              Решения — практичные и применимые.
            </p>

            <div className="mt-2 inline-flex items-center justify-center">
              <span className="rounded-full border border-primary/25 bg-primary/10 px-5 py-2 text-base font-semibold tracking-tight text-foreground md:text-lg">
                <span className="text-primary">ТЗ</span>
                <span className="text-foreground/70"> → </span>
                <span className="text-primary">Процесс</span>
                <span className="text-foreground/70"> → </span>
                <span className="text-primary">Результат</span>
              </span>
            </div>

            <div className="mt-2">
              <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
                Запускаю продукты, которые приносят пользу бизнесу.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

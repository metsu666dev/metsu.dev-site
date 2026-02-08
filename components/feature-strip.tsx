"use client"

import { useLang } from "@/components/language-provider"

export function FeatureStrip() {
  const { t } = useLang()

  const tags = [
    t("Быстрый отклик", "Fast response"),
    t("Без менеджеров", "No managers"),
    t("Напрямую", "Direct work"),
    t("Чистый UX", "Clean UX"),
    t("Реальные результаты", "Real results"),
    t("Mobile-first", "Mobile-first"),
    t("Тёмный дизайн", "Dark mode native"),
    t("Фокус на бизнес", "Business focused"),
  ]

  const allTags = [...tags, ...tags]

  return (
    <section className="relative overflow-hidden border-y border-border py-6">
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />

      <div className="animate-marquee flex w-max gap-4">
        {allTags.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-secondary px-5 py-2 text-sm font-medium text-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}

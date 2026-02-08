"use client"

import { useEffect, useRef } from "react"
import { MessageSquare, Lightbulb, Code, Rocket } from "lucide-react"
import { useLang } from "@/components/language-provider"

const STEPS = [
  {
    icon: MessageSquare,
    dayRu: "День 1",
    dayEn: "Day 1",
    titleRu: "Обсуждение",
    titleEn: "Discussion",
    descRu: "Созваниваемся или переписываемся. Выясняю задачу, цели, бюджет.",
    descEn: "We talk or chat. I clarify the task, goals, budget.",
    outputRu: "Бриф",
    outputEn: "Brief",
    tagsRu: ["Анализ требований", "Оценка сроков"],
    tagsEn: ["Requirements analysis", "Timeline estimation"],
  },
  {
    icon: Lightbulb,
    dayRu: "День 2-3",
    dayEn: "Day 2-3",
    titleRu: "Планирование",
    titleEn: "Planning",
    descRu: "Продумываю архитектуру, согласовываю план до старта разработки.",
    descEn: "I design the architecture, agree on the plan before development.",
    outputRu: "ТЗ",
    outputEn: "Spec",
    tagsRu: ["Структура", "Выбор стека"],
    tagsEn: ["Structure", "Stack selection"],
  },
  {
    icon: Code,
    dayRu: "3-14 дней",
    dayEn: "3-14 days",
    titleRu: "Разработка",
    titleEn: "Development",
    descRu: "Пишу код, показываю промежуточные результаты. Ты в курсе всегда.",
    descEn: "I write code, show progress. You're always in the loop.",
    outputRu: "Рабочий код",
    outputEn: "Working code",
    tagsRu: ["Ежедневные апдейты", "Тестирование"],
    tagsEn: ["Daily updates", "Testing"],
  },
  {
    icon: Rocket,
    dayRu: "Финал",
    dayEn: "Final",
    titleRu: "Запуск",
    titleEn: "Launch",
    descRu: "Деплой, настройка, документация. 14 дней бесплатной поддержки.",
    descEn: "Deploy, setup, documentation. 14 days of free support.",
    outputRu: "Готовый продукт",
    outputEn: "Ready product",
    tagsRu: ["Деплой на сервер", "Поддержка"],
    tagsEn: ["Server deploy", "Support"],
  },
]

export function About() {
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
    <section ref={sectionRef} className="relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <span data-animate className="mb-4 inline-block rounded-full border border-white/[0.08] bg-white/[0.05] px-4 py-1 text-sm text-muted-foreground opacity-0" style={{ animationDelay: "0s" }}>
            {t("Как я работаю", "How I work")}
          </span>
          <h2 data-animate className="text-balance text-3xl font-bold tracking-tight text-primary opacity-0 md:text-4xl" style={{ animationDelay: "0.1s" }}>
            {t("Процесс работы", "Work Process")}
          </h2>
          <p data-animate className="mt-4 text-lg text-muted-foreground opacity-0" style={{ animationDelay: "0.15s" }}>
            {t("От идеи до запуска — прозрачно и без сюрпризов", "From idea to launch — transparent and no surprises")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            const isLast = i === STEPS.length - 1
            return (
              <div key={step.titleRu} data-animate className="opacity-0" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
                <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-8">
                  {/* Icon circle */}
                  <div className="relative flex flex-col items-center">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-white/[0.03] backdrop-blur-xl">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    {/* Connecting line */}
                    {!isLast && (
                      <div className="hidden h-full w-px bg-primary/20 md:block" style={{ minHeight: "calc(100% + 2rem)" }} />
                    )}
                  </div>

                  {/* Card */}
                  <div className="mb-8 flex-1 rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                        {t(step.dayRu, step.dayEn)}
                      </span>
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {t("На выходе:", "Output:")} {t(step.outputRu, step.outputEn)}
                      </span>
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-foreground">
                      {t(step.titleRu, step.titleEn)}
                    </h3>

                    <p className="mb-4 text-sm text-muted-foreground">
                      {t(step.descRu, step.descEn)}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {(t(step.tagsRu.join("|"), step.tagsEn.join("|"))).split("|").map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground">
                          <span className="h-1 w-1 rounded-full bg-primary/60" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile connecting line */}
                {!isLast && (
                  <div className="mx-auto mb-4 h-8 w-px bg-primary/20 md:hidden" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

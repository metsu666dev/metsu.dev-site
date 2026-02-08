"use client"

import { useEffect, useRef } from "react"
import { MessageSquare, CalendarCheck, MousePointerClick, Zap } from "lucide-react"
import { useLang } from "@/components/language-provider"

interface ServiceItem {
  icon: typeof MessageSquare
  problem: { ru: string; en: string }
  solution: { ru: string; en: string }
}

const services: ServiceItem[] = [
  {
    icon: MessageSquare,
    problem: { ru: "Бизнес теряет заказы", en: "Business is losing orders" },
    solution: { ru: "Автоматизирую через Telegram", en: "I automate via Telegram" },
  },
  {
    icon: CalendarCheck,
    problem: { ru: "Запись и заявки в хаосе", en: "Bookings and leads are a mess" },
    solution: { ru: "Навожу порядок", en: "I bring order" },
  },
  {
    icon: MousePointerClick,
    problem: { ru: "Сайт есть — заявок нет", en: "Website exists, no leads" },
    solution: { ru: "Делаю понятный UX", en: "I build clear UX" },
  },
  {
    icon: Zap,
    problem: { ru: "Ручная работа жрёт время", en: "Manual work eats time" },
    solution: { ru: "Автоматизирую процессы", en: "I automate processes" },
  },
]

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const { lang, t } = useLang()

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
    <section ref={sectionRef} id="services" className="relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <div className="mb-16 text-center">
          <p
            data-animate
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary opacity-0"
            style={{ animationDelay: "0s" }}
          >
            {t("Польза", "Value")}
          </p>
          <h2
            data-animate
            className="text-balance text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-5xl"
            style={{ animationDelay: "0.1s" }}
          >
            {t("Чем я могу быть полезен", "How I can help")}
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <div
              key={service.problem.ru}
              data-animate
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card/80 p-6 opacity-0 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 glow-border-accent lg:p-8"
              style={{ animationDelay: `${0.15 + i * 0.1}s` }}
            >
              {/* Subtle inner gradient */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.05), transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary/10">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {lang === "ru" ? service.problem.ru : service.problem.en}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-primary">
                  {"→ "}
                  {lang === "ru" ? service.solution.ru : service.solution.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

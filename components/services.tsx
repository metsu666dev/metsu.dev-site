"use client"

import { useEffect, useRef } from "react"
import { MessageSquare, Globe, Layout, Plug, Zap } from "lucide-react"
import { useLang } from "@/components/language-provider"

const SERVICES = [
  {
    icon: MessageSquare,
    titleRu: "Telegram Боты",
    titleEn: "Telegram Bots",
    descRu: "Кастомные боты для бизнеса: автоматизация, платежи, CRM интеграция",
    descEn: "Custom bots for business: automation, payments, CRM integration",
    benefitRu: "снижает нагрузку на менеджеров и повышает конверсию в заявки",
    benefitEn: "reduces workload on managers and increases lead conversion",
    price: "от 25 000 ₽",
  },
  {
    icon: Globe,
    titleRu: "Сайты-визитки",
    titleEn: "Business Cards",
    descRu: "Быстрые и понятные лендинги и визитки для бизнеса и личного бренда",
    descEn: "Fast and clear landing pages for business and personal brand",
    benefitRu: "даёт присутствие в интернете и точку входа для клиентов",
    benefitEn: "provides internet presence and entry point for clients",
    price: "от 5 000 ₽",
  },
  {
    icon: Layout,
    titleRu: "Масштабные сайты",
    titleEn: "Large-scale Websites",
    descRu: "Полноценные веб-приложения, дашборды и админ-панели на React/Next.js",
    descEn: "Full-fledged web apps, dashboards and admin panels on React/Next.js",
    benefitRu: "даёт контроль — админка, статистика, управление данными",
    benefitEn: "gives control — admin panel, statistics, data management",
    price: "от 40 000 ₽",
  },
  {
    icon: Plug,
    titleRu: "API Интеграции",
    titleEn: "API Integrations",
    descRu: "Подключение любых сервисов, платёжных систем, баз данных",
    descEn: "Connecting any services, payment systems, databases",
    benefitRu: "связывает сервисы и убирает ручные действия",
    benefitEn: "links services and removes manual actions",
    price: "от 15 000 ₽",
  },
  {
    icon: Zap,
    titleRu: "Автоматизация",
    titleEn: "Automation",
    descRu: "Автоматизация бизнес-процессов, уведомления, отчёты",
    descEn: "Business process automation, notifications, reports",
    benefitRu: "экономит время и уменьшает ошибки в процессах",
    benefitEn: "saves time and reduces errors in processes",
    price: "от 25 000 ₽",
  },
]

export function Services() {
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
    <section ref={sectionRef} id="services" className="relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 data-animate className="text-balance text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-4xl" style={{ animationDelay: "0s" }}>
            {t("Мои услуги", "My Services")}
          </h2>
          <p data-animate className="mt-4 text-lg text-muted-foreground opacity-0" style={{ animationDelay: "0.1s" }}>
            {t("Создаю решения, которые работают на вас 24/7", "Building solutions that work for you 24/7")}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon
            const isLastTwo = i >= 3
            return (
              <div
                key={service.titleRu}
                data-animate
                className={`flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 opacity-0 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-primary/25 ${isLastTwo ? "lg:col-span-1 lg:last:col-start-2 lg:[&:nth-child(4)]:col-start-1 lg:[&:nth-child(4)]:justify-self-end lg:[&:nth-child(5)]:justify-self-start" : ""}`}
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                <div className="mb-4 w-fit rounded-lg border border-primary/30 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <h3 className="mb-2 text-lg font-bold text-foreground">
                  {t(service.titleRu, service.titleEn)}
                </h3>

                <p className="mb-4 text-sm text-muted-foreground">
                  {t(service.descRu, service.descEn)}
                </p>

                <div className="mb-4 rounded-lg border border-primary/15 bg-primary/5 p-3">
                  <p className="text-sm">
                    <span className="font-bold text-primary">{t("Польза:", "Benefit:")}</span>{" "}
                    <span className="text-foreground/80">{t(service.benefitRu, service.benefitEn)}</span>
                  </p>
                </div>

                <div className="mt-auto">
                  <span className="inline-block rounded-full border border-primary/30 px-4 py-1.5 text-sm font-medium text-primary">
                    {service.price}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

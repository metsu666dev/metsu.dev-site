"use client"

import { useEffect, useRef } from "react"
import { Code, MessageSquare, Palette, Plug, Database, Server } from "lucide-react"
import { useLang } from "@/components/language-provider"

const SKILLS = [
  { icon: Code, titleRu: "Frontend & Backend", titleEn: "Frontend & Backend", descRu: "Полный цикл разработки: от интерфейса до сервера. React, Next.js, Node.js, Python", descEn: "Full development cycle: from interface to server. React, Next.js, Node.js, Python" },
  { icon: MessageSquare, titleRu: "Telegram Боты", titleEn: "Telegram Bots", descRu: "Кастомные боты на aiogram: платежи, CRM, автоматизация. Webhook и Polling", descEn: "Custom bots on aiogram: payments, CRM, automation. Webhook and Polling" },
  { icon: Palette, titleRu: "Web Design", titleEn: "Web Design", descRu: "Современные сайты с анимациями, адаптивом и вниманием к деталям", descEn: "Modern websites with animations, responsiveness and attention to detail" },
  { icon: Plug, titleRu: "API & Интеграции", titleEn: "API & Integrations", descRu: "Подключение любых сервисов: платёжки, базы данных, внешние API", descEn: "Connecting any services: payments, databases, external APIs" },
  { icon: Database, titleRu: "Базы данных", titleEn: "Databases", descRu: "PostgreSQL, MongoDB, Redis. Проектирование схем и оптимизация запросов", descEn: "PostgreSQL, MongoDB, Redis. Schema design and query optimization" },
  { icon: Server, titleRu: "DevOps основы", titleEn: "DevOps Basics", descRu: "Git, Docker, деплой на VPS. Настройка серверов и CI/CD", descEn: "Git, Docker, VPS deploy. Server setup and CI/CD" },
]

const STACK_TAGS = ["Next.js", "React", "TypeScript", "Python", "Frontend", "Backend", "Telegram Bot API", "Mini Apps", "Prisma", "PostgreSQL", "Redis", "VPS / Cloudflare"]

export function Stack() {
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
    <section ref={sectionRef} id="skills" className="relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <span data-animate className="mb-4 inline-block rounded-full border border-white/[0.08] bg-white/[0.05] px-4 py-1 text-sm uppercase tracking-widest text-primary opacity-0" style={{ animationDelay: "0s" }}>
            {t("Навыки", "Skills")}
          </span>
          <h2 data-animate className="text-balance text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-4xl" style={{ animationDelay: "0.05s" }}>
            {t("Навыки и стек", "Skills & Stack")}
          </h2>
          <p data-animate className="mt-4 text-lg text-muted-foreground opacity-0" style={{ animationDelay: "0.1s" }}>
            {t("Не просто знаю инструменты — решаю задачи", "Not just knowing tools — solving problems")}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon
            return (
              <div key={skill.titleRu} data-animate className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 opacity-0 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]" style={{ animationDelay: `${0.15 + i * 0.05}s` }}>
                <div className="mb-3 w-fit rounded-lg border border-primary/30 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-base font-bold text-foreground">{t(skill.titleRu, skill.titleEn)}</h3>
                <p className="text-sm text-muted-foreground">{t(skill.descRu, skill.descEn)}</p>
              </div>
            )
          })}
        </div>

        {/* Terminal Block */}
        <div data-animate className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] opacity-0 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]" style={{ animationDelay: "0.5s" }}>
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">{t("Стек", "Stack")}</span>
          </div>
          <div className="p-6">
            <div className="mb-6 flex flex-wrap gap-2">
              {STACK_TAGS.map((tag) => (
                <span key={tag} className="rounded-md border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-sm text-primary transition-all hover:border-primary/40 hover:bg-primary/10">
                  {tag}
                </span>
              ))}
            </div>
            <div className="font-mono text-sm text-muted-foreground">
              <span className="text-primary">$ </span>{t("Подбираю стек под задачу, а не по моде.", "I choose the stack for the task, not the trend.")}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { useLang } from "@/components/language-provider"

const WORK_ITEMS = [
  { titleRu: "Mini App для ювелирного магазина", titleEn: "Mini App for jewelry store", descRu: "Каталог с фильтрами, корзина, оплата внутри Telegram.", descEn: "Catalog with filters, cart, payment inside Telegram.", tags: ["Telegram Mini App", "Next.js", "Prisma"] },
  { titleRu: "Бот для парсинга инфо из приватных каналов", titleEn: "Bot for parsing info from private channels", descRu: "Автоматический сбор, фильтрация и пересылка контента.", descEn: "Automatic collection, filtering and forwarding of content.", tags: ["Telegram Bot API", "TypeScript", "Redis"] },
  { titleRu: "Кастомный Telegram-клиент", titleEn: "Custom Telegram client", descRu: "Альтернативный интерфейс с расширенными функциями и встроенным AI-ассистентом.", descEn: "Alternative interface with extended features and built-in AI assistant.", tags: ["TDLib", "React", "TypeScript"] },
  { titleRu: "Бот / Mini App для грузинского ресторана", titleEn: "Bot / Mini App for Georgian restaurant", descRu: "Меню, бронь, уведомления — всё через Telegram.", descEn: "Menu, booking, notifications — all via Telegram.", tags: ["Telegram Mini App", "Next.js", "PostgreSQL"] },
]

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLang()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const entry of entries) { if (entry.isIntersecting) entry.target.classList.add("animate-fade-in-up") } },
      { threshold: 0.1 },
    )
    const elements = sectionRef.current?.querySelectorAll("[data-animate]")
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p data-animate className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary opacity-0" style={{ animationDelay: "0s" }}>{t("Статус", "Status")}</p>
          <h2 data-animate className="text-balance text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-4xl" style={{ animationDelay: "0.1s" }}>{t("Сейчас в работе", "Currently in progress")}</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {WORK_ITEMS.map((item, i) => (
            <div key={item.titleRu} data-animate className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-card/30 p-6 opacity-0 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-colors hover:border-primary/25" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-foreground">{t(item.titleRu, item.titleEn)}</h3>
                <span className="shrink-0 rounded-full border border-primary/25 bg-primary/15 px-2.5 py-0.5 text-xs text-primary">{t("в разработке", "in progress")}</span>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{t(item.descRu, item.descEn)}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (<span key={tag} className="rounded-md border border-white/[0.06] px-2 py-1 font-mono text-xs text-foreground/70">{tag}</span>))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

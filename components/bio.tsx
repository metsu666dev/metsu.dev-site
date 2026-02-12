"use client"

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import { Code, Rocket, Lightbulb, MessageSquare, Zap, Heart } from "lucide-react"
import { useLang } from "@/components/language-provider"

const EnergySphere = dynamic(
    () => import("@/components/energy-sphere").then((m) => m.EnergySphere),
    { ssr: false }
)

const STATS = [
    { icon: Code, valueRu: "6+", valueEn: "6+", labelRu: "проектов", labelEn: "projects" },
    { icon: Rocket, valueRu: "1+", valueEn: "1+", labelRu: "год кодинга", labelEn: "year coding" },
    { icon: Lightbulb, valueRu: "∞", valueEn: "∞", labelRu: "идей", labelEn: "ideas" },
]

const FEATURES = [
    { icon: MessageSquare, titleRu: "Telegram Боты", titleEn: "Telegram Bots", textRu: "Создаю умных ботов, которые решают реальные задачи бизнеса", textEn: "Building smart bots that solve real business tasks" },
    { icon: Zap, titleRu: "Быстрая разработка", titleEn: "Fast Development", textRu: "От идеи до рабочего продукта за минимальное время", textEn: "From idea to working product in minimal time" },
    { icon: Heart, titleRu: "Честный подход", titleEn: "Honest Approach", textRu: "Работаю на результат, а не на количество строк кода", textEn: "Working for results, not lines of code" },
]

export function Bio() {
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
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 data-animate className="text-balance text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-4xl" style={{ animationDelay: "0s" }}>
                        {t("Обо ", "About ")}<span className="text-primary">{t("мне", "me")}</span>
                    </h2>
                    <p data-animate className="mt-4 text-lg text-foreground/80 opacity-0" style={{ animationDelay: "0.1s" }}>
                        {t("Меня зовут Михаил, мне 23 года", "My name is Mikhail, I'm 23 years old")}
                    </p>
                    <p data-animate className="mx-auto mt-3 max-w-2xl text-muted-foreground opacity-0" style={{ animationDelay: "0.15s" }}>
                        {t(
                            "Создаю Telegram-боты и веб-сервисы, которые автоматизируют бизнес и решают реальные задачи. Фокусируюсь на результате, а не на чистоте кода.",
                            "Building Telegram bots and web services that automate business and solve real problems. Focused on results, not code purity."
                        )}
                    </p>
                </div>

                {/* Avatar + Stats Row */}
                <div data-animate className="mb-8 flex flex-col items-center gap-8 opacity-0 md:flex-row md:justify-center md:gap-12" style={{ animationDelay: "0.2s" }}>
                    {/* Avatar with WebGL energy sphere */}
                    <div className="relative flex shrink-0 items-center justify-center">
                        <EnergySphere size={260} />
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4">
                        {STATS.map((stat) => {
                            const Icon = stat.icon
                            return (
                                <div key={stat.labelRu} className="flex flex-col items-center rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 text-center backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                                    <Icon className="mb-2 h-5 w-5 text-primary" />
                                    <span className="text-4xl font-bold text-foreground">{t(stat.valueRu, stat.valueEn)}</span>
                                    <span className="text-sm text-muted-foreground">{t(stat.labelRu, stat.labelEn)}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    {FEATURES.map((feature, i) => {
                        const Icon = feature.icon
                        return (
                            <div key={feature.titleRu} data-animate className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 opacity-0 backdrop-blur-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]" style={{ animationDelay: `${0.3 + i * 0.08}s` }}>
                                <div className="mb-3 w-fit rounded-lg border border-primary/30 p-3">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-foreground">{t(feature.titleRu, feature.titleEn)}</h3>
                                <p className="text-sm text-muted-foreground">{t(feature.textRu, feature.textEn)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

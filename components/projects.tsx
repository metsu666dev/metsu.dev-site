"use client"

import { useEffect, useRef } from "react"
import { useLang } from "@/components/language-provider"

interface ProjectItem {
  title: { ru: string; en: string }
  description: { ru: string; en: string }
  tags: string[]
}

const projects: ProjectItem[] = [
  {
    title: {
      ru: "Mini App \u0434\u043b\u044f \u044e\u0432\u0435\u043b\u0438\u0440\u043d\u043e\u0433\u043e \u043c\u0430\u0433\u0430\u0437\u0438\u043d\u0430",
      en: "Mini App for a jewelry store",
    },
    description: {
      ru: "\u041a\u0430\u0442\u0430\u043b\u043e\u0433 \u0441 \u0444\u0438\u043b\u044c\u0442\u0440\u0430\u043c\u0438, \u043a\u043e\u0440\u0437\u0438\u043d\u0430, \u043e\u043f\u043b\u0430\u0442\u0430 \u0432\u043d\u0443\u0442\u0440\u0438 Telegram.",
      en: "Catalog with filters, cart, payment inside Telegram.",
    },
    tags: ["Telegram Mini App", "Next.js", "Prisma"],
  },
  {
    title: {
      ru: "\u0411\u043e\u0442 \u0434\u043b\u044f \u043f\u0430\u0440\u0441\u0438\u043d\u0433\u0430 \u0438\u043d\u0444\u043e \u0438\u0437 \u043f\u0440\u0438\u0432\u0430\u0442\u043d\u044b\u0445 \u043a\u0430\u043d\u0430\u043b\u043e\u0432",
      en: "Bot for parsing data from private channels",
    },
    description: {
      ru: "\u0410\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0441\u0431\u043e\u0440, \u0444\u0438\u043b\u044c\u0442\u0440\u0430\u0446\u0438\u044f \u0438 \u043f\u0435\u0440\u0435\u0441\u044b\u043b\u043a\u0430 \u043a\u043e\u043d\u0442\u0435\u043d\u0442\u0430.",
      en: "Automatic collection, filtering and forwarding of content.",
    },
    tags: ["Telegram Bot API", "TypeScript", "Redis"],
  },
  {
    title: {
      ru: "\u041a\u0430\u0441\u0442\u043e\u043c\u043d\u044b\u0439 Telegram-\u043a\u043b\u0438\u0435\u043d\u0442",
      en: "Custom Telegram client",
    },
    description: {
      ru: "\u0410\u043b\u044c\u0442\u0435\u0440\u043d\u0430\u0442\u0438\u0432\u043d\u044b\u0439 \u0438\u043d\u0442\u0435\u0440\u0444\u0435\u0439\u0441 \u0441 \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043d\u043d\u044b\u043c\u0438 \u0444\u0443\u043d\u043a\u0446\u0438\u044f\u043c\u0438.",
      en: "Alternative interface with extended functionality.",
    },
    tags: ["TDLib", "React", "TypeScript"],
  },
  {
    title: {
      ru: "\u0411\u043e\u0442 / Mini App \u0434\u043b\u044f \u0433\u0440\u0443\u0437\u0438\u043d\u0441\u043a\u043e\u0433\u043e \u0440\u0435\u0441\u0442\u043e\u0440\u0430\u043d\u0430",
      en: "Georgian restaurant bot / mini app",
    },
    description: {
      ru: "\u041c\u0435\u043d\u044e, \u0431\u0440\u043e\u043d\u044c, \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u044f \u2014 \u0432\u0441\u0451 \u0447\u0435\u0440\u0435\u0437 Telegram.",
      en: "Menu, reservations, notifications \u2014 all through Telegram.",
    },
    tags: ["Telegram Mini App", "Next.js", "PostgreSQL"],
  },
]

export function Projects() {
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
    <section ref={sectionRef} id="projects" className="relative px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <p
            data-animate
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary opacity-0"
            style={{ animationDelay: "0s" }}
          >
            {t("\u0421\u0442\u0430\u0442\u0443\u0441", "Status")}
          </p>
          <h2
            data-animate
            className="text-balance text-3xl font-bold tracking-tight text-foreground opacity-0 md:text-4xl"
            style={{ animationDelay: "0.1s" }}
          >
            {t("\u0421\u0435\u0439\u0447\u0430\u0441 \u0432 \u0440\u0430\u0431\u043e\u0442\u0435", "Current projects")}
          </h2>
        </div>

        {/* Project cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.title.ru}
              data-animate
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card/70 p-6 opacity-0 backdrop-blur-sm transition-all duration-300 hover:border-primary/25 glow-border-accent"
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              {/* Title + status */}
              <div>
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold leading-tight text-foreground">
                    {lang === "ru" ? project.title.ru : project.title.en}
                  </h3>
                  <span className="shrink-0 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[11px] text-primary/70">
                    {t("\u0432 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435", "in development")}
                  </span>
                </div>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {lang === "ru" ? project.description.ru : project.description.en}
                </p>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

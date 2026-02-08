"use client"

import { useEffect, useRef } from "react"
import { useLang } from "@/components/language-provider"

const STACK_TAGS = [
  "Next.js",
  "React",
  "TypeScript",
  "Telegram Bot API",
  "Mini Apps",
  "Prisma",
  "PostgreSQL",
  "Redis",
  "VPS / Cloudflare",
]

export function Stack() {
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
    <section ref={sectionRef} className="relative px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Terminal container */}
        <div
          data-animate
          className="rounded-xl border border-border bg-card/80 p-6 opacity-0 backdrop-blur-sm lg:p-8"
          style={{ animationDelay: "0s" }}
        >
          {/* Terminal header dots */}
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              {t("Стек", "Stack")}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {STACK_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-primary/20 bg-primary/5 px-3 py-1.5 font-mono text-sm text-primary transition-all duration-200 hover:border-primary/40 hover:bg-primary/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Subline */}
          <p className="mt-5 font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span>{" "}
            {t(
              "Подбираю стек под задачу, а не по моде.",
              "I pick the stack for the task, not the trend.",
            )}
          </p>
        </div>
      </div>
    </section>
  )
}

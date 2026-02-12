"use client"

const FEATURES = [
  "Быстрый отклик",
  "Без менеджеров",
  "Напрямую",
  "Чистый UX",
  "Реальные результаты",
  "Mobile-first",
  "Тёмный дизайн",
  "Фокус на бизнес",
]

export function FeatureStrip() {
  const items = [...FEATURES, ...FEATURES]

  return (
    <section className="relative overflow-hidden border-y border-border/50 bg-secondary/30 py-4">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />

      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

      {/* Marquee */}
      <div className="animate-marquee flex whitespace-nowrap" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        {items.map((feature, i) => (
          <span
            key={`${feature}-${i}`}
            className="mx-6 text-sm font-medium text-muted-foreground"
          >
            {feature}
            <span className="ml-6 text-primary/40">•</span>
          </span>
        ))}
      </div>
    </section>
  )
}

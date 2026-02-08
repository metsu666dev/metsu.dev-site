"use client"

import { Send } from "lucide-react"
import { useLang } from "@/components/language-provider"

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="border-t border-border px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        {/* Brand */}
        <a
          href="/"
          className="text-lg font-bold tracking-tight text-foreground"
        >
          metsu<span className="text-primary">.dev</span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://t.me/metsu_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            aria-label="Telegram"
          >
            <Send className="h-4 w-4" />
            <span>Telegram</span>
          </a>
        </div>

        {/* Tagline */}
        <p className="text-sm text-muted-foreground/60">
          {t("Сделано с фокусом, а не шумом.", "Built with focus, not noise.")}
        </p>
      </div>
    </footer>
  )
}

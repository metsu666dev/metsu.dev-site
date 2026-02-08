"use client"

import { Send } from "lucide-react"
import { useLang } from "@/components/language-provider"

export function Footer() {
  const { t } = useLang()

  return (
    <footer className="border-t border-border/50 px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <a href="/" className="text-xl font-bold tracking-tight text-foreground">
          metsu<span className="text-primary">.dev</span>
        </a>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://t.me/metsu_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <Send className="h-4 w-4" />
            @metsu_dev
          </a>
          <span className="text-muted-foreground/50">|</span>
          <p className="text-sm text-muted-foreground">
            {t("Сделано с фокусом, а не шумом.", "Made with focus, not noise.")}
          </p>
        </div>
        <p className="mt-4 border-t border-border/50 pt-4 text-xs text-muted-foreground">
          © 2025 <span className="text-primary">metsu.dev</span>. {t("Все права защищены.", "All rights reserved.")}
        </p>
      </div>
    </footer>
  )
}

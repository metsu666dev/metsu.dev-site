import React from "react"
import type { Metadata, Viewport } from "next"
import { Manrope, JetBrains_Mono } from "next/font/google"

import "./globals.css"

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "metsu.dev — Telegram-боты, сайты и мини-аппы",
  description:
    "Проектирую и разрабатываю быстрые, тёмные и понятные цифровые продукты для бизнеса. Telegram-боты, мини-аппы, сайты и автоматизация.",
  generator: "metsu.dev",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0B0B0E",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${jetbrainsMono.variable} bg-background scroll-smooth`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

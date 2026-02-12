"use client"

import { useAccent, type AccentMode } from "@/components/accent-provider"

const BG_IMAGES: Record<AccentMode, string> = {
  violet: "/backgrounds/violet.png",
  pink: "/backgrounds/pink.png",
  green: "/backgrounds/green.png",
}

const HUE: Record<AccentMode, number> = { violet: 260, pink: 340, green: 150 }

export function NeonBackground() {
  const { accent } = useAccent()
  const h = HUE[accent]
  const bgImage = BG_IMAGES[accent]

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      style={{ background: "#08080C" }}
    >
      {/* Layer 1: Theme background image (blurred) */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          backgroundImage: `url("${bgImage}")`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          filter: "blur(12px) saturate(1.2)",
          opacity: 0.4,
          transform: "scale(1.05)",
          willChange: "opacity, filter",
        }}
      />

      {/* Layer 2: Base radial gradient */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 50% 100%, hsla(${h}, 25%, 8%, 0.3) 0%, transparent 55%), 
                       radial-gradient(ellipse 80% 50% at 50% 50%, hsla(${h}, 18%, 5%, 0.25) 0%, transparent 65%)`,
        }}
      />

      {/* Layer 3: Faint grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(hsla(${h}, 25%, 45%, 0.012) 1px, transparent 1px), linear-gradient(90deg, hsla(${h}, 25%, 45%, 0.012) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Layer 4: Grain noise */}
      <div
        className="animate-grain absolute -inset-[50%]"
        style={{
          opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
          willChange: "transform",
        }}
      />

      {/* Layer 5: Content overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(8, 8, 12, 0.50)" }} />

      {/* Layer 6: Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 15%, rgba(8,8,12,0.75) 100%)",
        }}
      />

      {/* Layer 7: Top gradient for header */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "15%",
          background: "linear-gradient(to bottom, rgba(8,8,12,0.5) 0%, transparent 100%)",
        }}
      />
    </div>
  )
}

"use client"

import { useAccent, type AccentMode } from "@/components/accent-provider"

const HUE: Record<AccentMode, number> = { violet: 260, pink: 340, green: 150 }

/**
 * Cyberpunk background: CSS/SVG city silhouettes + blurred neon bleeds + grain.
 * No external images. No DOM manipulation. Pure render.
 */
export function NeonBackground() {
  const { accent } = useAccent()
  const h = HUE[accent]

  // City skyline as an inline SVG data-uri (silhouette of buildings)
  const skylineSvg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 400" preserveAspectRatio="none">
      <rect x="0" y="0" width="1440" height="400" fill="transparent"/>
      <!-- Left cluster -->
      <rect x="40" y="180" width="50" height="220" fill="white"/>
      <rect x="95" y="140" width="35" height="260" fill="white"/>
      <rect x="135" y="200" width="60" height="200" fill="white"/>
      <rect x="200" y="100" width="30" height="300" fill="white"/>
      <rect x="235" y="160" width="55" height="240" fill="white"/>
      <rect x="295" y="220" width="40" height="180" fill="white"/>
      <!-- Center-left -->
      <rect x="380" y="120" width="25" height="280" fill="white"/>
      <rect x="410" y="180" width="70" height="220" fill="white"/>
      <rect x="485" y="80" width="35" height="320" fill="white"/>
      <rect x="525" y="200" width="45" height="200" fill="white"/>
      <!-- Center (tallest) -->
      <rect x="620" y="60" width="40" height="340" fill="white"/>
      <rect x="665" y="150" width="55" height="250" fill="white"/>
      <rect x="725" y="40" width="30" height="360" fill="white"/>
      <rect x="760" y="130" width="50" height="270" fill="white"/>
      <!-- Center-right -->
      <rect x="850" y="170" width="60" height="230" fill="white"/>
      <rect x="915" y="90" width="35" height="310" fill="white"/>
      <rect x="955" y="210" width="45" height="190" fill="white"/>
      <rect x="1005" y="150" width="30" height="250" fill="white"/>
      <!-- Right cluster -->
      <rect x="1080" y="190" width="55" height="210" fill="white"/>
      <rect x="1140" y="110" width="30" height="290" fill="white"/>
      <rect x="1175" y="220" width="65" height="180" fill="white"/>
      <rect x="1245" y="160" width="40" height="240" fill="white"/>
      <rect x="1290" y="200" width="50" height="200" fill="white"/>
      <rect x="1345" y="240" width="55" height="160" fill="white"/>
      <!-- Antenna details -->
      <rect x="203" y="80" width="4" height="20" fill="white"/>
      <rect x="487" y="55" width="3" height="25" fill="white"/>
      <rect x="727" y="15" width="3" height="25" fill="white"/>
      <rect x="622" y="35" width="4" height="25" fill="white"/>
      <rect x="917" y="65" width="3" height="25" fill="white"/>
      <rect x="1142" y="85" width="3" height="25" fill="white"/>
    </svg>`,
  )

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      style={{ background: "#08080C" }}
    >
      {/* ── Layer 1: Deep base gradient ── */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 50% 100%, hsla(${h}, 30%, 8%, 0.6) 0%, transparent 60%), 
                       radial-gradient(ellipse 80% 50% at 50% 50%, hsla(${h}, 20%, 5%, 0.4) 0%, transparent 70%)`,
        }}
      />

      {/* ── Layer 2: City silhouette (blurred, very low opacity) ── */}
      <div
        className="absolute inset-x-0 bottom-0 transition-all duration-700"
        style={{
          height: "55%",
          backgroundImage: `url("data:image/svg+xml,${skylineSvg}")`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          opacity: 0.06,
          filter: "blur(3px)",
        }}
      />

      {/* ── Layer 3: Reflected silhouette (wet floor effect) ── */}
      <div
        className="absolute inset-x-0 bottom-0 transition-all duration-700"
        style={{
          height: "20%",
          backgroundImage: `url("data:image/svg+xml,${skylineSvg}")`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          opacity: 0.02,
          filter: "blur(8px)",
          transform: "scaleY(-1)",
          maskImage: "linear-gradient(to top, transparent 0%, black 100%)",
          WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 100%)",
        }}
      />

      {/* ── Layer 4: Neon color bleeds (radial, low opacity) ── */}
      {/* Bottom center bleed */}
      <div
        className="absolute transition-all duration-700"
        style={{
          bottom: "5%",
          left: "20%",
          right: "20%",
          height: "40%",
          background: `radial-gradient(ellipse at 50% 100%, hsla(${h}, 70%, 50%, 0.12) 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      {/* Left bleed */}
      <div
        className="absolute transition-all duration-700"
        style={{
          bottom: "15%",
          left: "5%",
          width: "25%",
          height: "30%",
          background: `radial-gradient(ellipse at 30% 80%, hsla(${h}, 60%, 45%, 0.08) 0%, transparent 70%)`,
          filter: "blur(50px)",
        }}
      />
      {/* Right bleed */}
      <div
        className="absolute transition-all duration-700"
        style={{
          bottom: "10%",
          right: "8%",
          width: "20%",
          height: "25%",
          background: `radial-gradient(ellipse at 70% 80%, hsla(${h + 15}, 50%, 40%, 0.07) 0%, transparent 70%)`,
          filter: "blur(45px)",
        }}
      />

      {/* ── Layer 5: Horizon neon line ── */}
      <div
        className="absolute transition-all duration-700"
        style={{
          left: "5%",
          right: "5%",
          bottom: "22%",
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, hsla(${h}, 60%, 55%, 0.12) 20%, hsla(${h}, 70%, 60%, 0.18) 50%, hsla(${h}, 60%, 55%, 0.12) 80%, transparent 100%)`,
          filter: "blur(1px)",
        }}
      />

      {/* ── Layer 6: Faint grid ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(hsla(${h}, 30%, 50%, 0.018) 1px, transparent 1px), linear-gradient(90deg, hsla(${h}, 30%, 50%, 0.018) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Layer 7: Grain noise ── */}
      <div
        className="animate-grain absolute -inset-[50%]"
        style={{
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── Layer 8: Heavy dark overlay for readability (75%) ── */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(8, 8, 12, 0.75)" }}
      />

      {/* ── Layer 9: Vignette (strong edges) ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 40%, transparent 10%, rgba(8,8,12,0.85) 100%)",
        }}
      />

      {/* ── Layer 10: Top gradient for header readability ── */}
      <div
        className="absolute inset-x-0 top-0"
        style={{
          height: "20%",
          background:
            "linear-gradient(to bottom, rgba(8,8,12,0.7) 0%, transparent 100%)",
        }}
      />
    </div>
  )
}

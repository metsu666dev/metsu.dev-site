"use client"

import { useAccent, type AccentMode } from "@/components/accent-provider"

const THEME_CONFIG: Record<AccentMode, { h: number; bleeds: React.CSSProperties[] }> = {
  violet: {
    h: 260,
    bleeds: [
      // Bottom center
      {
        position: "absolute",
        bottom: "5%",
        left: "25%",
        right: "25%",
        height: "35%",
        background: "radial-gradient(ellipse at 50% 100%, hsla(260, 70%, 50%, 0.18) 0%, transparent 70%)",
        filter: "blur(60px)",
      },
      // Horizon line
      {
        position: "absolute",
        left: "10%",
        right: "10%",
        bottom: "20%",
        height: "2px",
        background: "linear-gradient(90deg, transparent 0%, hsla(260, 60%, 55%, 0.12) 30%, hsla(260, 70%, 60%, 0.16) 50%, hsla(260, 60%, 55%, 0.12) 70%, transparent 100%)",
        filter: "blur(1px)",
      },
    ],
  },
  pink: {
    h: 340,
    bleeds: [
      // Left diagonal
      {
        position: "absolute",
        bottom: "20%",
        left: "0%",
        width: "40%",
        height: "50%",
        background: "radial-gradient(ellipse at 20% 70%, hsla(340, 70%, 50%, 0.16) 0%, transparent 60%)",
        filter: "blur(70px)",
        transform: "rotate(-15deg)",
      },
      // Top-right haze
      {
        position: "absolute",
        top: "5%",
        right: "5%",
        width: "35%",
        height: "30%",
        background: "radial-gradient(ellipse at 70% 30%, hsla(340, 60%, 45%, 0.14) 0%, transparent 65%)",
        filter: "blur(55px)",
      },
    ],
  },
  green: {
    h: 150,
    bleeds: [
      // Top center
      {
        position: "absolute",
        top: "10%",
        left: "20%",
        right: "20%",
        height: "40%",
        background: "radial-gradient(ellipse at 50% 20%, hsla(150, 65%, 45%, 0.15) 0%, transparent 65%)",
        filter: "blur(65px)",
      },
      // Horizontal soft glow
      {
        position: "absolute",
        top: "40%",
        left: "5%",
        right: "5%",
        height: "20%",
        background: "linear-gradient(90deg, transparent 0%, hsla(150, 55%, 40%, 0.10) 20%, hsla(150, 60%, 45%, 0.14) 50%, hsla(150, 55%, 40%, 0.10) 80%, transparent 100%)",
        filter: "blur(40px)",
      },
    ],
  },
}

const skylineSvg = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 400" preserveAspectRatio="none">
    <rect x="0" y="0" width="1440" height="400" fill="transparent"/>
    <rect x="40" y="180" width="50" height="220" fill="white"/>
    <rect x="95" y="140" width="35" height="260" fill="white"/>
    <rect x="135" y="200" width="60" height="200" fill="white"/>
    <rect x="200" y="100" width="30" height="300" fill="white"/>
    <rect x="235" y="160" width="55" height="240" fill="white"/>
    <rect x="295" y="220" width="40" height="180" fill="white"/>
    <rect x="380" y="120" width="25" height="280" fill="white"/>
    <rect x="410" y="180" width="70" height="220" fill="white"/>
    <rect x="485" y="80" width="35" height="320" fill="white"/>
    <rect x="525" y="200" width="45" height="200" fill="white"/>
    <rect x="620" y="60" width="40" height="340" fill="white"/>
    <rect x="665" y="150" width="55" height="250" fill="white"/>
    <rect x="725" y="40" width="30" height="360" fill="white"/>
    <rect x="760" y="130" width="50" height="270" fill="white"/>
    <rect x="850" y="170" width="60" height="230" fill="white"/>
    <rect x="915" y="90" width="35" height="310" fill="white"/>
    <rect x="955" y="210" width="45" height="190" fill="white"/>
    <rect x="1005" y="150" width="30" height="250" fill="white"/>
    <rect x="1080" y="190" width="55" height="210" fill="white"/>
    <rect x="1140" y="110" width="30" height="290" fill="white"/>
    <rect x="1175" y="220" width="65" height="180" fill="white"/>
    <rect x="1245" y="160" width="40" height="240" fill="white"/>
    <rect x="1290" y="200" width="50" height="200" fill="white"/>
    <rect x="1345" y="240" width="55" height="160" fill="white"/>
    <rect x="203" y="80" width="4" height="20" fill="white"/>
    <rect x="487" y="55" width="3" height="25" fill="white"/>
    <rect x="727" y="15" width="3" height="25" fill="white"/>
    <rect x="622" y="35" width="4" height="25" fill="white"/>
    <rect x="917" y="65" width="3" height="25" fill="white"/>
    <rect x="1142" y="85" width="3" height="25" fill="white"/>
  </svg>`,
)

export function NeonBackground() {
  const { accent } = useAccent()
  const config = THEME_CONFIG[accent]
  const h = config.h

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      style={{ background: "#08080C" }}
    >
      {/* Layer 1: Base gradient per theme */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 120% 80% at 50% 100%, hsla(${h}, 25%, 8%, 0.5) 0%, transparent 55%), 
                       radial-gradient(ellipse 80% 50% at 50% 50%, hsla(${h}, 18%, 5%, 0.35) 0%, transparent 65%)`,
        }}
      />

      {/* Layer 2: City silhouette */}
      <div
        className="absolute inset-x-0 bottom-0 transition-all duration-700"
        style={{
          height: "50%",
          backgroundImage: `url("data:image/svg+xml,${skylineSvg}")`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          opacity: 0.15,
          filter: "blur(5px)",
        }}
      />

      {/* Layer 3: Theme-specific color bleeds */}
      {config.bleeds.map((style, i) => (
        <div key={i} className="transition-all duration-700" style={style as React.CSSProperties} />
      ))}

      {/* Layer 4: Faint grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(hsla(${h}, 25%, 45%, 0.012) 1px, transparent 1px), linear-gradient(90deg, hsla(${h}, 25%, 45%, 0.012) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Layer 5: Very subtle grain */}
      <div
        className="animate-grain absolute -inset-[50%]"
        style={{
          opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />

      {/* Layer 6: Content overlay (0.62 opacity) */}
      <div className="absolute inset-0" style={{ background: "rgba(8, 8, 12, 0.62)" }} />

      {/* Layer 7: Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 15%, rgba(8,8,12,0.75) 100%)",
        }}
      />

      {/* Layer 8: Top gradient for header */}
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

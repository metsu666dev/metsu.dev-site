"use client"

import { useEffect, useRef, useCallback } from "react"

/**
 * Soft neon trailing glow ring cursor.
 * - Default arrow/pointer cursor is preserved (no crosshair).
 * - The ring is decorative only (pointer-events: none).
 * - Scales up on hover over interactive elements.
 * - StrictMode safe: cleans up properly.
 * - Only active on pointer:fine devices (desktop).
 */
export function CursorGlow() {
  const ringRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: -100, y: -100 })
  const hoverRef = useRef(false)
  const rafRef = useRef<number>(0)

  const onMove = useCallback((e: MouseEvent) => {
    posRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-grow]")
    hoverRef.current = !!interactive
  }, [])

  useEffect(() => {
    // Check for fine pointer (desktop)
    const mq = window.matchMedia("(pointer: fine)")
    if (!mq.matches) return

    const ring = ringRef.current
    if (!ring) return

    ring.style.display = "block"

    const animate = () => {
      const { x, y } = posRef.current
      const size = hoverRef.current ? 24 : 16
      const opacity = hoverRef.current ? 0.6 : 0.35
      ring.style.transform = `translate(${x - size / 2}px, ${y - size / 2}px)`
      ring.style.width = `${size}px`
      ring.style.height = `${size}px`
      ring.style.opacity = String(opacity)
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover", onOver, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseover", onOver)
      cancelAnimationFrame(rafRef.current)
      if (ring) ring.style.display = "none"
    }
  }, [onMove, onOver])

  return (
    <div
      ref={ringRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden rounded-full border border-[hsla(var(--accent-h),var(--accent-s),var(--accent-l),0.5)]"
      style={{
        boxShadow: "0 0 8px hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.2)",
        transition: "width 0.15s ease, height 0.15s ease, opacity 0.15s ease",
        willChange: "transform",
      }}
    />
  )
}

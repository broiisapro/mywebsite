'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const interactivesRef = useRef<HTMLElement[]>([])
  const snappedRef = useRef<HTMLElement | null>(null)
  const initializedRef = useRef(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    if (!dot) return
    document.documentElement.classList.add('custom-cursor-active')
    dot.style.opacity = '1'

    const INTERACTIVE_SELECTOR =
      'a, button, [role="button"], input, textarea, select, summary, label[for]'
    const SNAP_DISTANCE = 16

    const clamp = (value: number, min: number, max: number) =>
      Math.max(min, Math.min(max, value))

    const collectInteractives = () => {
      interactivesRef.current = Array.from(
        document.querySelectorAll<HTMLElement>(INTERACTIVE_SELECTOR)
      ).filter((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.width <= 0 || rect.height <= 0) return false
        const styles = window.getComputedStyle(el)
        return (
          styles.visibility !== 'hidden' &&
          styles.display !== 'none' &&
          styles.pointerEvents !== 'none'
        )
      })
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const updateTarget = () => {
      const pointer = posRef.current
      let bestEl: HTMLElement | null = null
      let bestDistance = Number.POSITIVE_INFINITY
      let bestX = pointer.x
      let bestY = pointer.y

      for (const el of interactivesRef.current) {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < 0 || rect.right < 0) continue
        if (rect.top > window.innerHeight || rect.left > window.innerWidth) continue

        const nearestX = clamp(pointer.x, rect.left, rect.right)
        const nearestY = clamp(pointer.y, rect.top, rect.bottom)
        const dx = pointer.x - nearestX
        const dy = pointer.y - nearestY
        const distance = Math.hypot(dx, dy)

        if (distance < bestDistance) {
          bestDistance = distance
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          bestEl = el
          bestX = nearestX + (centerX - nearestX) * 0.35
          bestY = nearestY + (centerY - nearestY) * 0.35
        }
      }

      if (bestEl && bestDistance <= SNAP_DISTANCE) {
        targetRef.current = { x: bestX, y: bestY }
        if (snappedRef.current !== bestEl) {
          snappedRef.current = bestEl
          dot.classList.add('hovered')
        }
      } else {
        targetRef.current = { x: pointer.x, y: pointer.y }
        if (snappedRef.current) {
          snappedRef.current = null
          dot.classList.remove('hovered')
        }
      }
    }

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!initializedRef.current) {
        initializedRef.current = true
        currentRef.current = { x: e.clientX, y: e.clientY }
      }
      updateTarget()
    }

    const animate = () => {
      const dx = targetRef.current.x - currentRef.current.x
      const dy = targetRef.current.y - currentRef.current.y
      const distance = Math.hypot(dx, dy)
      const ease = Math.min(0.5, 0.25 + distance / 140)

      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, ease)
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, ease)
      dot.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate(-50%, -50%)`
      rafRef.current = requestAnimationFrame(animate)
    }

    const onViewportChange = () => {
      collectInteractives()
      updateTarget()
    }

    collectInteractives()
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onViewportChange, { passive: true })
    window.addEventListener('resize', onViewportChange, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    // Keep the interactive map updated for dynamic DOM content.
    const observer = new MutationObserver(() => {
      collectInteractives()
      updateTarget()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onViewportChange)
      window.removeEventListener('resize', onViewportChange)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="cursor-dot"
      style={{ opacity: 0 }}
      aria-hidden="true"
    />
  )
}

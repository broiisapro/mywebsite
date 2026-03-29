'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    if (!dot) return
    dot.style.opacity = '1'

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      currentRef.current.x = lerp(currentRef.current.x, posRef.current.x, 0.15)
      currentRef.current.y = lerp(currentRef.current.y, posRef.current.y, 0.15)
      if (dot) {
        dot.style.left = `${currentRef.current.x}px`
        dot.style.top = `${currentRef.current.y}px`
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnterLink = () => dot?.classList.add('hovered')
    const onLeaveLink = () => dot?.classList.remove('hovered')

    const attachListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }

    window.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)
    attachListeners()

    // Re-attach on DOM changes
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
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

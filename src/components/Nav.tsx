'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null
      if (target && !navRef.current?.contains(target)) setMobileOpen(false)
    }
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown, { passive: true })
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onEscape)
    }
  }, [mobileOpen])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(245,240,232,0.92)' : 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 48px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: 13,
            color: 'var(--ink)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Moksh Siruvani
        </Link>

        {/* Center links — desktop */}
        <div
          className="hidden md:flex"
          style={{ gap: 32, alignItems: 'center' }}
        >
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>

        {/* Right: open to work pill */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 8 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              fontSize: 10,
              padding: '4px 12px',
              background: 'var(--acc-bg)',
              color: 'var(--acc)',
              border: '0.5px solid rgba(45,122,82,0.35)',
              borderRadius: 20,
              fontFamily: 'var(--font-instrument)',
              letterSpacing: '0.06em',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--acc)',
                flexShrink: 0,
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            Open to work
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
          aria-label="Toggle navigation menu"
          className="md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          style={{
            width: 40,
            height: 40,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 5,
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 20,
                height: 1.5,
                background: 'var(--ink)',
                borderRadius: 1,
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                opacity: mobileOpen && i === 1 ? 0 : 1,
                transform:
                  mobileOpen && i === 0
                    ? 'translateY(6.5px) rotate(45deg)'
                    : mobileOpen && i === 2
                      ? 'translateY(-6.5px) rotate(-45deg)'
                      : 'none',
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
            className="md:hidden"
          >
            <div
              style={{
                background: 'var(--bg)',
                borderBottom: '1px solid var(--border)',
                padding: '12px 24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: 'var(--font-instrument)',
                    fontWeight: 500,
                    fontSize: 14,
                    color: 'var(--ink2)',
                    textDecoration: 'none',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--border)',
                    display: 'block',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          nav > div:first-child {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </nav>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-instrument)',
        fontWeight: 500,
        fontSize: 12,
        letterSpacing: '0.04em',
        color: 'var(--ink2)',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        textUnderlineOffset: '4px',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.color = 'var(--acc)'
        el.style.textDecoration = 'underline'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.color = 'var(--ink2)'
        el.style.textDecoration = 'none'
      }}
    >
      {label}
    </Link>
  )
}

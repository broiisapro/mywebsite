'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { identity } from '@/data/portfolio'

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

type MobileLink = {
  label: string
  href: string
  download?: boolean
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (!navRef.current?.contains(target)) {
        setMobileOpen(false)
      }
    }

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
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

  const mobileLinks: MobileLink[] = [
    ...navLinks,
    { label: 'Resume', href: `${basePath}/resume.pdf`, download: true },
  ]

  return (
    <nav
      ref={navRef}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        backgroundColor: scrolled ? 'rgba(12,12,12,0.85)' : 'transparent',
        transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 48px',
          height: 64,
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
            fontSize: 15,
            color: '#ffffff',
            letterSpacing: '-0.01em',
            textDecoration: 'none',
          }}
        >
          {identity.name}
        </Link>

        {/* Center links — hidden on mobile */}
        <div
          className="hidden md:flex"
          style={{ gap: 32, alignItems: 'center' }}
        >
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          {/* Resume pill */}
          <a
            href={`${basePath}/resume.pdf`}
            download="Moksh_Siruvani_Resume.pdf"
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 10,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.1em',
              color: '#e8a44a',
              border: '1px solid rgba(232,164,74,0.4)',
              borderRadius: 20,
              padding: '6px 16px',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = '#e8a44a'
              el.style.color = '#0c0c0c'
              el.style.borderColor = '#e8a44a'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.backgroundColor = 'transparent'
              el.style.color = '#e8a44a'
              el.style.borderColor = 'rgba(232,164,74,0.4)'
            }}
          >
            Resume
          </a>
        </div>

        {/* Status dot */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          className="hidden md:flex"
        >
          <span
            style={{
              display: 'inline-block',
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: '#4ade80',
              animation: 'pulse-green 2s ease-in-out infinite',
            }}
          />
          <style>{`
            @keyframes pulse-green {
              0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
              50% { box-shadow: 0 0 0 4px rgba(74,222,128,0); }
            }
          `}</style>
          <span
            style={{
              fontFamily: 'var(--font-instrument)',
              fontSize: 11,
              color: 'rgba(212,208,200,0.4)',
              letterSpacing: '0.04em',
            }}
          >
            Open to opportunities
          </span>
        </div>

        <div className="md:hidden">
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((open) => !open)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 4,
              border: mobileOpen ? '1px solid #e8a44a' : '1px solid rgba(255,255,255,0.12)',
              backgroundColor: mobileOpen ? 'rgba(232,164,74,0.14)' : 'transparent',
              color: mobileOpen ? '#e8a44a' : 'rgba(212,208,200,0.8)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 16,
                lineHeight: 1,
              }}
            >
              {mobileOpen ? '×' : '☰'}
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              overflow: 'hidden',
            }}
            className="md:hidden"
          >
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                backgroundColor: 'rgba(12,12,12,0.96)',
                padding: '14px 24px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              {mobileLinks.map((link) => {
                if (link.download) {
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      download="Moksh_Siruvani_Resume.pdf"
                      onClick={() => setMobileOpen(false)}
                      style={{
                        fontFamily: 'var(--font-syne)',
                        fontSize: 12,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: '#e8a44a',
                        textDecoration: 'none',
                        padding: '10px 0',
                      }}
                    >
                      {link.label}
                    </a>
                  )
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      fontFamily: 'var(--font-syne)',
                      fontSize: 12,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(212,208,200,0.75)',
                      textDecoration: 'none',
                      padding: '10px 0',
                    }}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: 'var(--font-syne)',
        fontSize: 12,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.12em',
        color: 'rgba(212,208,200,0.4)',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = '#e8a44a')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(212,208,200,0.4)')
      }
    >
      {label}
    </Link>
  )
}

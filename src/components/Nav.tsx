'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { identity } from '@/data/portfolio'

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
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
          className="hidden sm:flex"
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
      </div>
    </nav>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  if (href.startsWith('/')) {
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

  return (
    <a
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
    </a>
  )
}

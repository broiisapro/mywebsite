'use client'

import { identity } from '@/data/portfolio'

const footerLinks = [
  { label: 'GitHub', href: identity.github },
  { label: 'LinkedIn', href: identity.linkedin },
  { label: 'Blog', href: '/blog' },
  { label: 'Resume', href: '/resume.pdf' },
]

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 72,
        padding: '22px 48px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-instrument)',
          fontSize: 11,
          color: 'var(--ink3)',
        }}
      >
        © 2025 Moksh Siruvani · Whitby, Ontario
      </span>

      <div style={{ display: 'flex', gap: 18 }}>
        {footerLinks.map((link) => (
          <FooterLink key={link.label} href={link.href} label={link.label} />
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          footer { padding: 18px 24px !important; }
        }
      `}</style>
    </footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith('http')
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      style={{
        fontFamily: 'var(--font-instrument)',
        fontSize: 11,
        color: 'var(--ink3)',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--acc)')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink3)')
      }
    >
      {label}
    </a>
  )
}

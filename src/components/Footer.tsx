'use client'

import { identity } from '@/data/portfolio'

const footerLinks = [
  { label: 'GitHub', href: identity.github },
  { label: 'LinkedIn', href: identity.linkedin },
  { label: 'Email', href: identity.email },
]

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '36px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: 16,
        maxWidth: 1200,
        margin: '0 auto',
      }}
      className="site-footer"
    >
      <span
        style={{
          fontFamily: 'var(--font-instrument)',
          fontSize: 11,
          color: 'rgba(212,208,200,0.3)',
          letterSpacing: '0.06em',
        }}
      >
        © 2025 Moksh Siruvani
      </span>

      <div style={{ display: 'flex', gap: 32 }}>
        {footerLinks.map((link) => (
          <FooterLink key={link.label} href={link.href} label={link.label} />
        ))}
      </div>

      <style>{`
        @media (max-width: 480px) {
          .site-footer {
            padding: 28px 24px !important;
          }
        }
      `}</style>
    </footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      style={{
        fontFamily: 'var(--font-syne)',
        fontSize: 11,
        textTransform: 'uppercase' as const,
        letterSpacing: '0.1em',
        color: 'rgba(212,208,200,0.3)',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = '#e8a44a')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(212,208,200,0.3)')
      }
    >
      {label}
    </a>
  )
}

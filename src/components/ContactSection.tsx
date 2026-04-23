'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { identity } from '@/data/portfolio'

const leftRows = [
  {
    label: 'Email',
    value: 'moksh.siruvani@gmail.com',
    href: 'mailto:moksh.siruvani@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/moksh-siruvani',
    href: identity.linkedin,
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/broiisapro',
    href: identity.github,
    external: true,
  },
]

const rightRows = [
  { label: 'Location', value: 'Whitby, Ontario', href: null },
  { label: 'Status', value: 'Open to work', href: null, accent: true },
  { label: 'Phone', value: 'On request', href: null },
]

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '72px 48px 0',
        scrollMarginTop: 80,
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink3)',
          borderBottom: '1px solid var(--border)',
          paddingBottom: 10,
          marginBottom: 24,
        }}
      >
        Contact
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}
        className="contact-grid"
      >
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            borderRight: '1px solid var(--border)',
            paddingRight: 48,
          }}
          className="contact-left"
        >
          {leftRows.map((row, i) => (
            <ContactRow
              key={row.label}
              row={row}
              index={i}
              inView={inView}
            />
          ))}
        </motion.div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ paddingLeft: 48 }}
          className="contact-right"
        >
          {rightRows.map((row, i) => (
            <ContactRow
              key={row.label}
              row={row}
              index={i}
              inView={inView}
            />
          ))}
        </motion.div>
      </div>

      {/* Resume download button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ marginTop: 28 }}
      >
        <a
          href={`${basePath}/resume.pdf`}
          download="Moksh_Siruvani_Resume.pdf"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '13px 28px',
            background: 'var(--ink)',
            color: 'var(--bg)',
            fontFamily: 'var(--font-instrument)',
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            borderRadius: 4,
            textDecoration: 'none',
            transition: 'background 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = 'var(--acc)'
            el.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = 'var(--ink)'
            el.style.transform = 'none'
          }}
        >
          Download Resume
        </a>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-left {
            border-right: none !important;
            padding-right: 0 !important;
          }
          .contact-right {
            padding-left: 0 !important;
          }
        }
        @media (max-width: 640px) {
          #contact { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </section>
  )
}

function ContactRow({
  row,
  index,
  inView,
}: {
  row: { label: string; value: string; href?: string | null; external?: boolean; accent?: boolean }
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.07 }}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 0',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--ink3)',
        }}
      >
        {row.label}
      </span>
      {row.href ? (
        <a
          href={row.href}
          target={row.external ? '_blank' : undefined}
          rel={row.external ? 'noopener noreferrer' : undefined}
          style={{
            fontFamily: 'var(--font-instrument)',
            fontWeight: 500,
            fontSize: 13,
            color: 'var(--acc)',
            textDecoration: 'none',
            transition: 'text-decoration 0.2s ease',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'
          }}
        >
          {row.value}
        </a>
      ) : (
        <span
          style={{
            fontFamily: 'var(--font-instrument)',
            fontWeight: 500,
            fontSize: 13,
            color: row.accent ? 'var(--acc)' : 'var(--ink)',
          }}
        >
          {row.value}
        </span>
      )}
    </motion.div>
  )
}

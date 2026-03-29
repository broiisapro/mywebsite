'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { identity } from '@/data/portfolio'

const contactRows = [
  {
    label: 'Email',
    value: 'moksh.siruvani@gmail.com',
    href: 'mailto:moksh.siruvani@gmail.com',
    external: false,
  },
  {
    label: 'Phone',
    value: '+1-437-265-4886',
    href: null,
    external: false,
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
  {
    label: 'Location',
    value: identity.location,
    href: null,
    external: false,
  },
]

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '72px 48px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'start',
        }}
        className="contact-grid"
      >
        {/* Left — display text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div style={{ marginBottom: 24 }}>
            <span
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(36px, 4vw, 52px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: '#ffffff',
                display: 'block',
              }}
            >
              Let&apos;s build
            </span>
            <span
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(36px, 4vw, 52px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                color: '#e8a44a',
                display: 'block',
              }}
            >
              something.
            </span>
          </div>
          <p
            style={{
              fontFamily: 'var(--font-instrument)',
              fontSize: 15,
              lineHeight: 1.7,
              color: 'rgba(212,208,200,0.45)',
              maxWidth: 320,
            }}
          >
            I&apos;m open to internships, fellowships, and interesting projects.
            Reach out.
          </p>
        </motion.div>

        {/* Right — contact details */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          {contactRows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: 10,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.14em',
                  color: 'rgba(212,208,200,0.25)',
                  display: 'block',
                  marginBottom: 4,
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
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.75)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color = '#e8a44a')
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.color =
                      'rgba(255,255,255,0.75)')
                  }
                >
                  {row.value}
                </a>
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--font-instrument)',
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  {row.value}
                </span>
              )}
            </motion.div>
          ))}

          {/* Resume download row */}
          {/* Replace /public/resume.pdf with your actual resume file */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 + contactRows.length * 0.06 }}
          >
            <span
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 10,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.14em',
                color: 'rgba(212,208,200,0.25)',
                display: 'block',
                marginBottom: 8,
              }}
            >
              Resume
            </span>
            <a
              href="/resume.pdf"
              download="Moksh_Siruvani_Resume.pdf"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: 11,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
                color: '#0c0c0c',
                backgroundColor: '#e8a44a',
                padding: '9px 20px',
                borderRadius: 2,
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')
              }
            >
              Download PDF
            </a>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        @media (max-width: 640px) {
          #contact {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}

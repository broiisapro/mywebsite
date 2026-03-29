'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '@/data/portfolio'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={ref}
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '72px 48px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        scrollMarginTop: 120,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
        }}
        className="about-grid"
      >
        {/* Left: bio */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-instrument)',
              fontSize: 16,
              fontWeight: 400,
              lineHeight: 1.9,
              color: 'rgba(212,208,200,0.55)',
            }}
          >
            I&apos;m{' '}
            <strong style={{ color: 'rgba(212,208,200,0.85)', fontWeight: 400 }}>
              16, graduating a year early,
            </strong>{' '}
            and building things that actually ship. Founded my school&apos;s Coding Club.
            DECA ICDC Provincial Champion. FRC Blue Banner first year in. Ranked{' '}
            <strong style={{ color: 'rgba(212,208,200,0.85)', fontWeight: 400 }}>
              5th globally
            </strong>{' '}
            in Hack Club High Seas.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-instrument)',
              fontSize: 16,
              fontWeight: 400,
              lineHeight: 1.9,
              color: 'rgba(212,208,200,0.55)',
              marginTop: 24,
            }}
          >
            I like making robots, scraping the web, and automating things that
            shouldn&apos;t be manual.
          </p>
        </div>

        {/* Right: skills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {Object.entries(skills).map(([group, items], gi) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + gi * 0.08 }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: 10,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'rgba(212,208,200,0.25)',
                  display: 'block',
                  marginBottom: 12,
                }}
              >
                {group}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {items.map((skill) => (
                  <SkillPill key={skill} label={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}

function SkillPill({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-instrument)',
        fontSize: 12,
        color: 'rgba(212,208,200,0.5)',
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderRadius: 2,
        padding: '5px 14px',
        transition: 'color 0.2s ease, background-color 0.2s ease',
        cursor: 'default',
        display: 'inline-block',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.color = '#e8a44a'
        el.style.backgroundColor = 'rgba(232,164,74,0.07)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.color = 'rgba(212,208,200,0.5)'
        el.style.backgroundColor = 'rgba(255,255,255,0.04)'
      }}
    >
      {label}
    </span>
  )
}

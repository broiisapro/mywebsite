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
        About
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
        }}
        className="about-grid"
      >
        {/* Left: bio */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p
            style={{
              fontFamily: 'var(--font-instrument)',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.75,
              color: 'var(--ink2)',
              marginBottom: 16,
            }}
          >
            I&apos;m{' '}
            <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>
              Moksh Siruvani
            </strong>{' '}
            — 16 years old, graduating a year early, and based in Whitby, Ontario.
            I&apos;ve been building things since I was 11 and haven&apos;t really stopped.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-instrument)',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.75,
              color: 'var(--ink2)',
              marginBottom: 16,
            }}
          >
            My work spans{' '}
            <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>
              autonomous AI platforms, computer vision, FRC robotics,
            </strong>{' '}
            and developer tooling. I care about shipping real things — not just demos.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-instrument)',
              fontSize: 14,
              fontWeight: 400,
              lineHeight: 1.75,
              color: 'var(--ink2)',
            }}
          >
            Ranked{' '}
            <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>#5 globally</strong>{' '}
            in Hack Club High Seas. Always working on something new.
          </p>
        </motion.div>

        {/* Right: skills */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
        >
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 9,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--ink3)',
                  display: 'block',
                  marginBottom: 10,
                }}
              >
                {group}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {items.map((skill) => (
                  <SkillPill key={skill} label={skill} />
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 640px) {
          #about { padding-left: 24px !important; padding-right: 24px !important; }
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
        fontWeight: 500,
        fontSize: 11,
        padding: '5px 10px',
        background: 'var(--bg2)',
        color: 'var(--ink2)',
        border: '0.5px solid var(--border)',
        borderRadius: 4,
        transition: 'background 0.2s ease, border-color 0.2s ease',
        cursor: 'default',
        display: 'inline-block',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'var(--bg3)'
        el.style.borderColor = 'var(--border2)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.background = 'var(--bg2)'
        el.style.borderColor = 'var(--border)'
      }}
    >
      {label}
    </span>
  )
}

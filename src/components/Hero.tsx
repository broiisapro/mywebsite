'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '52px 48px 0',
      }}
    >
      {/* Top label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.1em',
          color: 'var(--ink3)',
          marginBottom: 16,
          textTransform: 'uppercase',
        }}
      >
        001 — Engineer &amp; Builder · Est. 2009 · Whitby, Ontario
      </motion.p>

      {/* Giant name */}
      <h1 style={{ margin: 0, lineHeight: 0.88 }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ display: 'block' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 900,
              fontSize: 'clamp(56px, 12vw, 110px)',
              letterSpacing: '-0.05em',
              lineHeight: 0.88,
              textTransform: 'uppercase',
              color: 'var(--ink)',
              display: 'block',
            }}
          >
            MOKSH
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.12 }}
          style={{ display: 'block' }}
        >
          <span
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 900,
              fontSize: 'clamp(56px, 12vw, 110px)',
              letterSpacing: '-0.05em',
              lineHeight: 0.88,
              textTransform: 'uppercase',
              color: 'var(--bg)',
              WebkitTextStroke: '2px var(--ink)',
              display: 'block',
            }}
          >
            SIRUVANI
          </span>
        </motion.div>
      </h1>

      {/* Rule row: tagline + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: 20,
          paddingTop: 16,
          borderTop: '1.5px solid var(--ink)',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-instrument)',
            fontWeight: 400,
            fontSize: 13,
            lineHeight: 1.65,
            color: 'var(--ink2)',
            maxWidth: 320,
            margin: 0,
          }}
        >
          16 years old. Graduating a year early. Building autonomous platforms,
          wildfire AI, and FRC robots.
        </p>

        <motion.a
          href="#work"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-instrument)',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            textDecoration: 'none',
            borderBottom: '2px solid var(--acc)',
            paddingBottom: 1,
            transition: 'color 0.2s ease',
            whiteSpace: 'nowrap',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--acc)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)'
          }}
        >
          View work →
        </motion.a>
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </section>
  )
}

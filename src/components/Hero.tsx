'use client'

import { motion } from 'framer-motion'
import { identity, stats } from '@/data/portfolio'

export default function Hero() {
  return (
    <section
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '100px 48px 72px',
      }}
    >
      {/* Top row: tag + location */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 40,
        }}
      >
        <span className="label">Engineer &amp; Builder</span>
        <span className="label" style={{ letterSpacing: '0.08em' }}>
          {identity.est} · {identity.location}
        </span>
      </motion.div>

      {/* Giant name */}
      <div style={{ marginBottom: 48 }}>
        {['Moksh', 'Siruvani'].map((word, i) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'block', lineHeight: 0.92 }}
          >
            <span
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 800,
                fontSize: 'clamp(44px, 9vw, 96px)',
                letterSpacing: '-0.04em',
                color: '#e8a44a',
                display: 'block',
              }}
            >
              {word}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom: bio + stats + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap' as const,
          gap: 40,
        }}
        className="hero-bottom"
      >
        {/* Left: bio + CTAs */}
        <div style={{ maxWidth: 420 }}>
          <p
            style={{
              fontFamily: 'var(--font-instrument)',
              fontSize: 15,
              lineHeight: 1.7,
              color: 'rgba(212,208,200,0.5)',
              marginBottom: 32,
            }}
          >
            {identity.bio}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const }}>
            <a
              href="#work"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: 12,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
                color: '#0c0c0c',
                backgroundColor: '#e8a44a',
                padding: '11px 24px',
                borderRadius: 2,
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')}
            >
              View Projects
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: 12,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.08em',
                color: '#e8a44a',
                backgroundColor: 'transparent',
                padding: '10px 24px',
                border: '1px solid rgba(232,164,74,0.3)',
                borderRadius: 2,
                textDecoration: 'none',
                transition: 'border-color 0.2s ease, background-color 0.2s ease',
                display: 'inline-block',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'rgba(232,164,74,0.7)'
                el.style.backgroundColor = 'rgba(232,164,74,0.06)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = 'rgba(232,164,74,0.3)'
                el.style.backgroundColor = 'transparent'
              }}
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Right: stats */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'flex-end',
            gap: 8,
          }}
          className="hero-stats"
        >
          {stats.map((stat) => (
            <span
              key={stat}
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 11,
                color: 'rgba(212,208,200,0.35)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase' as const,
              }}
            >
              {stat}
            </span>
          ))}
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          .hero-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .hero-stats {
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  )
}

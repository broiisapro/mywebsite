'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const statsData = [
  { value: 60, suffix: '+', label: 'Projects shipped' },
  { value: 5, prefix: '#', label: 'Globally · Hack Club' },
  { value: 4.0, suffix: '', label: 'GPA · Early grad', decimal: true },
  { value: 5, suffix: 'yr+', label: 'Coding' },
]

function CountUp({
  target,
  suffix = '',
  prefix = '',
  decimal = false,
  active,
}: {
  target: number
  suffix?: string
  prefix?: string
  decimal?: boolean
  active: boolean
}) {
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!active || startedRef.current) return
    startedRef.current = true
    const duration = 900
    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(parseFloat((eased * target).toFixed(decimal ? 1 : 0)))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [active, target, decimal])

  const display = decimal ? count.toFixed(1) : Math.round(count).toString()
  return (
    <span>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div
      ref={ref}
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
        className="stats-grid"
      >
        {statsData.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              padding: '22px 48px',
              borderRight: i < statsData.length - 1 ? '1px solid var(--border)' : 'none',
            }}
            className="stat-cell"
          >
            <div
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 900,
                fontSize: 'clamp(28px, 4vw, 40px)',
                letterSpacing: '-0.03em',
                color: 'var(--ink)',
                lineHeight: 1,
              }}
            >
              <CountUp
                target={stat.value}
                suffix={stat.suffix}
                prefix={stat.prefix ?? ''}
                decimal={stat.decimal}
                active={inView}
              />
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontWeight: 400,
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink3)',
                marginTop: 4,
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stat-cell { padding: 18px 24px !important; }
          .stat-cell:nth-child(2) { border-right: none !important; }
          .stat-cell:nth-child(3) { border-right: 1px solid var(--border) !important; }
        }
      `}</style>
    </div>
  )
}

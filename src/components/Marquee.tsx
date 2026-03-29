import { marqueeItems } from '@/data/portfolio'

export default function Marquee() {
  // Duplicate for seamless loop
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div
      style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        padding: '14px 0',
      }}
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(212,208,200,0.18)',
                paddingLeft: 40,
                paddingRight: 40,
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: '#e8a44a',
                opacity: 0.5,
                fontSize: 10,
              }}
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

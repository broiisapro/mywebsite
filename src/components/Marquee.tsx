import { marqueeItems } from '@/data/portfolio'

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div
      className="marquee-wrap"
      style={{
        background: 'var(--ink)',
        padding: '10px 0',
        overflow: 'hidden',
      }}
    >
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'rgba(245,240,232,0.65)',
                paddingLeft: 32,
                paddingRight: 32,
              }}
            >
              {item}
            </span>
            <span style={{ color: 'var(--acc2)', fontSize: 10, lineHeight: 1 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

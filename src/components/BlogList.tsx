'use client'

import type { BlogPost } from '@/data/blog'

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  return (
    <div>
      {posts.map((post) => (
        <a
          key={post.slug}
          href={`/blog/${post.slug}`}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 24,
            borderTop: '1px solid rgba(255,255,255,0.05)',
            padding: '28px 0',
            textDecoration: 'none',
            transition: 'all 0.25s ease',
          }}
          className="blog-row"
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.paddingLeft = '12px'
            el.style.marginLeft = '-12px'
            el.style.backgroundColor = 'rgba(232,164,74,0.03)'
            const arrow = el.querySelector('.blog-arrow') as HTMLElement
            if (arrow) arrow.style.color = '#e8a44a'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.paddingLeft = '0'
            el.style.marginLeft = '0'
            el.style.backgroundColor = 'transparent'
            const arrow = el.querySelector('.blog-arrow') as HTMLElement
            if (arrow) arrow.style.color = 'rgba(212,208,200,0.2)'
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 8,
                flexWrap: 'wrap' as const,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  fontSize: 17,
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.3,
                }}
              >
                {post.title}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: 'rgba(232,164,74,0.6)',
                  border: '1px solid rgba(232,164,74,0.15)',
                  borderRadius: 20,
                  padding: '2px 10px',
                  fontFamily: 'var(--font-instrument)',
                  whiteSpace: 'nowrap' as const,
                }}
              >
                {post.tag}
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-instrument)',
                fontSize: 13,
                color: 'rgba(212,208,200,0.4)',
                lineHeight: 1.5,
                margin: 0,
              }}
            >
              {post.excerpt}
            </p>
            <span
              style={{
                fontFamily: 'var(--font-syne)',
                fontSize: 10,
                color: 'rgba(212,208,200,0.2)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                display: 'block',
                marginTop: 10,
              }}
            >
              {post.date}
            </span>
          </div>
          <span
            className="blog-arrow"
            style={{
              fontSize: 18,
              color: 'rgba(212,208,200,0.2)',
              transition: 'color 0.25s ease',
              paddingLeft: 8,
              flexShrink: 0,
            }}
          >
            ↗
          </span>
        </a>
      ))}
      {/* Bottom border on last item */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />
    </div>
  )
}

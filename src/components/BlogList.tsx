import Link from 'next/link'
import type { BlogPost } from '@/data/blog'

type BlogListItem = Pick<BlogPost, 'slug' | 'title' | 'tag' | 'excerpt' | 'date'>

export default function BlogList({ posts }: { posts: BlogListItem[] }) {
  return (
    <div>
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: 24,
            borderTop: '1px solid var(--border)',
            padding: '20px 0',
            textDecoration: 'none',
            paddingLeft: 0,
            marginLeft: 0,
          }}
          className="blog-row"
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 6,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontWeight: 700,
                  fontSize: 15,
                  color: 'var(--ink)',
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                }}
              >
                {post.title}
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: 'var(--acc)',
                  background: 'var(--acc-bg)',
                  borderRadius: 3,
                  padding: '2px 7px',
                  fontFamily: 'var(--font-instrument)',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {post.tag}
              </span>
            </div>
            <p
              style={{
                fontFamily: 'var(--font-instrument)',
                fontSize: 13,
                color: 'var(--ink2)',
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {post.excerpt}
            </p>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--ink3)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                marginTop: 8,
              }}
            >
              {post.date}
            </span>
          </div>
          <span
            className="blog-arrow"
            style={{
              fontSize: 16,
              color: 'var(--border2)',
              transition: 'color 0.15s ease',
              paddingLeft: 8,
              flexShrink: 0,
              fontFamily: 'var(--font-instrument)',
            }}
          >
            ↗
          </span>
        </Link>
      ))}
      <div style={{ borderTop: '1px solid var(--border)' }} />
    </div>
  )
}

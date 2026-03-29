'use client'

import Link from 'next/link'
import type { BlogPost, BlogSection } from '@/data/blog'

export default function BlogPostContent({
  post,
  githubUrl,
}: {
  post: BlogPost
  githubUrl: string | null
}) {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '56px 48px 96px',
      }}
    >
      {/* Back link */}
      <Link
        href="/blog"
        style={{
          fontFamily: 'var(--font-syne)',
          fontSize: 12,
          textTransform: 'uppercase' as const,
          letterSpacing: '0.1em',
          color: 'rgba(232,164,74,0.6)',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: 48,
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = '#e8a44a')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(232,164,74,0.6)')
        }
      >
        ← Back to blog
      </Link>

      {/* Post header */}
      <h1
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 'clamp(28px, 3.5vw, 40px)',
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
          color: '#ffffff',
          marginBottom: 20,
        }}
      >
        {post.title}
      </h1>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 56,
          flexWrap: 'wrap' as const,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 11,
            color: 'rgba(212,208,200,0.3)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
          }}
        >
          {post.date}
        </span>
        <span
          style={{
            fontSize: 10,
            color: 'rgba(232,164,74,0.6)',
            border: '1px solid rgba(232,164,74,0.15)',
            borderRadius: 20,
            padding: '3px 10px',
            fontFamily: 'var(--font-instrument)',
          }}
        >
          {post.tag}
        </span>
      </div>

      {/* Post content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {post.content.map((section, i) => (
          <ContentBlock key={i} section={section} />
        ))}
      </div>

      {/* Footer: view project + github */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          marginTop: 64,
          paddingTop: 40,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap' as const,
        }}
      >
        <Link
          href="/#work"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: 12,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.08em',
            color: '#0c0c0c',
            backgroundColor: '#e8a44a',
            padding: '10px 20px',
            borderRadius: 2,
            textDecoration: 'none',
            transition: 'opacity 0.2s ease',
            display: 'inline-block',
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = '0.85')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.opacity = '1')
          }
        >
          View All Projects
        </Link>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: 12,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.08em',
              color: '#e8a44a',
              border: '1px solid rgba(232,164,74,0.3)',
              padding: '9px 20px',
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
            View on GitHub ↗
          </a>
        )}
      </div>
    </main>
  )
}

function ContentBlock({ section }: { section: BlogSection }) {
  if (section.type === 'h2') {
    return (
      <h2
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 600,
          fontSize: 20,
          color: '#ffffff',
          borderLeft: '3px solid #e8a44a',
          paddingLeft: 16,
          marginTop: 48,
          marginBottom: 20,
          lineHeight: 1.3,
        }}
      >
        {section.text}
      </h2>
    )
  }

  if (section.type === 'p') {
    return (
      <p
        style={{
          fontFamily: 'var(--font-instrument)',
          fontSize: 17,
          fontWeight: 400,
          lineHeight: 1.9,
          color: 'rgba(212,208,200,0.75)',
          marginTop: 0,
          marginBottom: 20,
        }}
      >
        {section.text}
      </p>
    )
  }

  if (section.type === 'ul' && section.items) {
    return (
      <ul
        style={{
          paddingLeft: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginBottom: 20,
        }}
      >
        {section.items.map((item, i) => (
          <li
            key={i}
            style={{
              fontFamily: 'var(--font-instrument)',
              fontSize: 17,
              lineHeight: 1.8,
              color: 'rgba(212,208,200,0.75)',
              paddingLeft: 20,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: '0.55em',
                width: 5,
                height: 5,
                borderRadius: '50%',
                backgroundColor: '#e8a44a',
                opacity: 0.6,
                display: 'inline-block',
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    )
  }

  if (section.type === 'code') {
    return (
      <code
        style={{
          fontFamily: 'monospace',
          fontSize: 14,
          backgroundColor: 'rgba(255,255,255,0.04)',
          padding: '4px 10px',
          borderRadius: 3,
          color: 'rgba(212,208,200,0.8)',
          display: 'inline-block',
          marginBottom: 20,
        }}
      >
        {section.text}
      </code>
    )
  }

  return null
}

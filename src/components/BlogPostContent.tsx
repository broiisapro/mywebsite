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
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--ink3)',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: 40,
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--acc)')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink3)')
        }
      >
        ← All posts
      </Link>

      {/* Post header */}
      <h1
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 900,
          fontSize: 'clamp(32px, 5vw, 56px)',
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          textTransform: 'uppercase',
          color: 'var(--ink)',
          marginBottom: 18,
        }}
      >
        {post.title}
      </h1>

      {/* Meta row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 48,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: 'var(--ink3)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {post.date}
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
          }}
        >
          {post.tag}
        </span>
      </div>

      {/* Post content */}
      {post.placeholder ? (
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--acc)',
            }}
          >
            Case study
          </span>
          <p
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: 22,
              color: 'var(--ink)',
              margin: 0,
            }}
          >
            Coming soon
          </p>
          <p
            style={{
              fontFamily: 'var(--font-instrument)',
              fontSize: 15,
              lineHeight: 1.8,
              color: 'var(--ink3)',
              margin: 0,
            }}
          >
            The full write-up for this project is being written. Check back soon.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {post.content.map((section, i) => (
            <ContentBlock key={i} section={section} />
          ))}
        </div>
      )}

      {/* Footer CTAs */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          marginTop: 64,
          paddingTop: 36,
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        <Link
          href="/#work"
          style={{
            fontFamily: 'var(--font-instrument)',
            fontWeight: 700,
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--ink)',
            textDecoration: 'none',
            borderBottom: '2px solid var(--acc)',
            paddingBottom: 1,
            transition: 'color 0.2s ease',
            display: 'inline-block',
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--acc)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)')
          }
        >
          View all projects →
        </Link>
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-instrument)',
              fontWeight: 700,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--ink)',
              textDecoration: 'none',
              borderBottom: '2px solid var(--acc)',
              paddingBottom: 1,
              transition: 'color 0.2s ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--acc)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)')
            }
          >
            View on GitHub ↗
          </a>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          main { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </main>
  )
}

function ContentBlock({ section }: { section: BlogSection }) {
  if (section.type === 'h2') {
    return (
      <h2
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 700,
          fontSize: 22,
          color: 'var(--ink)',
          marginTop: 48,
          marginBottom: 16,
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
          fontSize: 15,
          fontWeight: 400,
          lineHeight: 1.8,
          color: 'var(--ink2)',
          marginTop: 0,
          marginBottom: 18,
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
          gap: 10,
          marginBottom: 18,
        }}
      >
        {section.items.map((item, i) => (
          <li
            key={i}
            style={{
              fontFamily: 'var(--font-instrument)',
              fontSize: 15,
              lineHeight: 1.8,
              color: 'var(--ink2)',
              paddingLeft: 20,
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: '0.6em',
                width: 5,
                height: 5,
                borderRadius: '50%',
                backgroundColor: 'var(--acc)',
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
    const isBlock = section.text && section.text.includes('\n')
    if (isBlock) {
      return (
        <pre
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 4,
            padding: '20px 24px',
            color: 'var(--ink2)',
            overflowX: 'auto',
            marginBottom: 18,
            lineHeight: 1.6,
          }}
        >
          <code>{section.text}</code>
        </pre>
      )
    }
    return (
      <code
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          background: 'var(--bg2)',
          border: '1px solid var(--border)',
          borderRadius: 4,
          padding: '2px 6px',
          color: 'var(--ink2)',
          display: 'inline-block',
          marginBottom: 18,
        }}
      >
        {section.text}
      </code>
    )
  }

  return null
}

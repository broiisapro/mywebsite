import { blogPosts } from '@/data/blog'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import BlogList from '@/components/BlogList'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — Moksh Siruvani',
  description: 'Writing about projects, engineering decisions, and things I built.',
}

export default function BlogIndex() {
  const realPosts = blogPosts.filter((p) => !p.placeholder)
  const postSummaries = realPosts.map(({ slug, title, tag, excerpt, date }) => ({
    slug,
    title,
    tag,
    excerpt,
    date,
  }))

  return (
    <>
      <CustomCursor />
      <Nav />
      <main
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '72px 48px',
          minHeight: '80vh',
        }}
      >
        {/* Header */}
        <div style={{ paddingBottom: 32, marginBottom: 0 }}>
          <h1
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 900,
              fontSize: 'clamp(40px, 7vw, 72px)',
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            Writing
          </h1>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--ink3)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {realPosts.length} posts
          </span>
        </div>

        <div
          style={{
            borderBottom: '2px solid var(--ink)',
            marginBottom: 0,
            marginTop: 16,
          }}
        />

        <BlogList posts={postSummaries} />
      </main>
      <Footer />

      <style>{`
        @media (max-width: 640px) {
          main { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  )
}

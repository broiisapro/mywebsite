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
  const postSummaries = blogPosts.map(({ slug, title, tag, excerpt, date }) => ({
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 56,
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            paddingBottom: 32,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            Writing
          </span>
          <span
            style={{
              fontFamily: 'var(--font-syne)',
              fontSize: 11,
              color: 'rgba(212,208,200,0.2)',
              letterSpacing: '0.06em',
            }}
          >
            {blogPosts.length.toString().padStart(2, '0')} Posts
          </span>
        </div>

        <BlogList posts={postSummaries} />
      </main>
      <Footer />
    </>
  )
}

import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost } from '@/data/blog'
import { projects } from '@/data/portfolio'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import BlogPostContent from '@/components/BlogPostContent'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — Moksh Siruvani`,
    description: post.excerpt,
    alternates: {
      canonical: `https://broiisapro.github.io/mywebsite/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} — Moksh Siruvani`,
      description: post.excerpt,
      url: `https://broiisapro.github.io/mywebsite/blog/${post.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary',
      title: `${post.title} — Moksh Siruvani`,
      description: post.excerpt,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const relatedProject = projects.find((p) => p.blogSlug === post.projectSlug)
  const githubUrl = post.githubUrl ?? relatedProject?.github ?? null

  return (
    <>
      <CustomCursor />
      <Nav />
      <BlogPostContent post={post} githubUrl={githubUrl} />
      <Footer />
    </>
  )
}

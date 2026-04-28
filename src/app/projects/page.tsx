'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { projects, type Tag } from '@/data/portfolio'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

// ── Constants ────────────────────────────────────────────────────

const LANGUAGE_TAGS: Tag[] = ['Python', 'TypeScript', 'Java', 'Swift', 'C++', 'C#']

const FILTER_PILLS = [
  'All', 'AI', 'LLM', 'SaaS', 'Web', 'CLI', 'CV', 'Voice',
  'Robotics', 'Hardware', 'Arduino', 'Swift', 'Python', 'TypeScript',
  'Java', 'C#', 'Unity', 'Game', 'Tool', 'Hackathon', 'School',
]

const AI_TAG_RE = /^(ai|llm|cv|hackathon|competition)$/i

// ── Derived stats ────────────────────────────────────────────────

const total = projects.length

const languages = new Set(
  projects.flatMap(p => p.tags.filter(t => LANGUAGE_TAGS.includes(t as Tag)))
).size

const hackathons = projects.filter(p => {
  const ctx = p.context?.toLowerCase() ?? ''
  return (
    ctx.includes('hacks') ||
    ctx.includes('hackathon') ||
    ctx.includes('genesis') ||
    ctx.includes('canada') ||
    p.tags.includes('Hackathon' as Tag) ||
    p.tags.includes('Competition' as Tag)
  )
}).length

// ── Icons ────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function BlogIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5zM4.5 8a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zm0 2.5a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zm0 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
    </svg>
  )
}

// ── Tooltip ──────────────────────────────────────────────────────

const tooltipStyle: React.CSSProperties = {
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: '50%',
  transform: 'translateX(-50%)',
  fontFamily: 'var(--font-mono)',
  fontSize: 9,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--ink3)',
  whiteSpace: 'nowrap',
  background: 'var(--bg)',
  border: '0.5px solid var(--border)',
  borderRadius: 3,
  padding: '2px 6px',
  pointerEvents: 'none',
  zIndex: 10,
}

// ── Tag pill ─────────────────────────────────────────────────────

function TagPill({ tag, size = 'sm' }: { tag: string; size?: 'sm' | 'xs' }) {
  const isHighlight = AI_TAG_RE.test(tag)
  return (
    <span
      style={{
        fontSize: size === 'xs' ? 8 : 8,
        padding: size === 'xs' ? '3px 7px' : '3px 7px',
        background: isHighlight ? 'var(--acc-bg)' : 'var(--bg3)',
        color: isHighlight ? 'var(--acc)' : 'var(--ink2)',
        borderRadius: 3,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-instrument)',
        fontWeight: 500,
        flexShrink: 0,
      }}
    >
      {tag}
    </span>
  )
}

// ── Icon pair (card variant — always-visible labels) ─────────────

function CardIconPair({ project }: { project: (typeof projects)[number] }) {
  const [ghHovered, setGhHovered] = useState(false)
  const [blogHovered, setBlogHovered] = useState(false)
  const [lockHovered, setLockHovered] = useState(false)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {project.private ? (
        <div
          style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
          onMouseEnter={() => setLockHovered(true)}
          onMouseLeave={() => setLockHovered(false)}
        >
          <span style={{ color: lockHovered ? 'var(--ink2)' : 'var(--ink3)', transition: 'color 0.2s ease' }}>
            <LockIcon />
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink3)' }}>
            Private
          </span>
        </div>
      ) : project.github ? (
        <div
          style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
          onMouseEnter={() => setGhHovered(true)}
          onMouseLeave={() => setGhHovered(false)}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} on GitHub`}
            style={{ color: ghHovered ? 'var(--ink)' : 'var(--ink3)', textDecoration: 'none', transition: 'color 0.2s ease' }}
          >
            <GitHubIcon />
          </a>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink3)' }}>
            GitHub
          </span>
        </div>
      ) : null}

      {project.blogPost && (
        <div
          style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
          onMouseEnter={() => setBlogHovered(true)}
          onMouseLeave={() => setBlogHovered(false)}
        >
          <Link
            href={`/blog/${project.blogSlug ?? project.slug}`}
            aria-label={`${project.name} case study`}
            style={{ color: blogHovered ? 'var(--acc)' : 'var(--ink3)', textDecoration: 'none', transition: 'color 0.2s ease' }}
          >
            <BlogIcon />
          </Link>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink3)' }}>
            Case study
          </span>
        </div>
      )}
    </div>
  )
}

// ── Icon pair (row variant — tooltip on hover) ───────────────────

function RowIconPair({ project }: { project: (typeof projects)[number] }) {
  const [ghHovered, setGhHovered] = useState(false)
  const [blogHovered, setBlogHovered] = useState(false)
  const [lockHovered, setLockHovered] = useState(false)

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8 }}>
      {project.private ? (
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setLockHovered(true)}
          onMouseLeave={() => setLockHovered(false)}
        >
          <span
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: 7, color: lockHovered ? 'var(--ink2)' : 'var(--ink3)', transition: 'color 0.2s ease',
            }}
          >
            <LockIcon />
          </span>
          <AnimatePresence>
            {lockHovered && (
              <motion.span initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -2 }} transition={{ duration: 0.15 }} style={tooltipStyle}>
                Private
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      ) : project.github ? (
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setGhHovered(true)}
          onMouseLeave={() => setGhHovered(false)}
        >
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} on GitHub`}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: 7, color: ghHovered ? 'var(--ink)' : 'var(--ink3)', textDecoration: 'none', transition: 'color 0.2s ease',
            }}
          >
            <GitHubIcon />
          </a>
          <AnimatePresence>
            {ghHovered && (
              <motion.span initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -2 }} transition={{ duration: 0.15 }} style={tooltipStyle}>
                GitHub
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      ) : null}

      {project.blogPost && (
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setBlogHovered(true)}
          onMouseLeave={() => setBlogHovered(false)}
        >
          <Link
            href={`/blog/${project.blogSlug ?? project.slug}`}
            aria-label={`${project.name} case study`}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: 7, color: blogHovered ? 'var(--acc)' : 'var(--ink3)', textDecoration: 'none', transition: 'color 0.2s ease',
            }}
          >
            <BlogIcon />
          </Link>
          <AnimatePresence>
            {blogHovered && (
              <motion.span initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -2 }} transition={{ duration: 0.15 }} style={tooltipStyle}>
                Case study
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

// ── Section label ────────────────────────────────────────────────

function SectionLabel({ children, marginTop = 56 }: { children: React.ReactNode; marginTop?: number }) {
  return (
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--ink3)',
        borderBottom: '1px solid var(--border)',
        paddingBottom: 10,
        marginBottom: 24,
        marginTop,
      }}
    >
      {children}
    </div>
  )
}

// ── Tier 1 Card ──────────────────────────────────────────────────

function Tier1Card({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--bg3)' : 'var(--bg2)',
        border: `1px solid ${hovered ? 'var(--border2)' : 'var(--border)'}`,
        borderRadius: 6,
        padding: 24,
        transition: 'background 0.2s ease, border-color 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {project.context && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--acc)', marginBottom: 10 }}>
          {project.context}
        </div>
      )}
      <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: 6 }}>
        {project.name}
      </div>
      <div style={{ fontFamily: 'var(--font-instrument)', fontSize: 13, lineHeight: 1.65, color: 'var(--ink2)', marginBottom: 14, flex: 1 }}>
        {project.description}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 0 }}>
        {project.tags.map(tag => <TagPill key={tag} tag={tag} />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)' }}>{project.year}</span>
        <CardIconPair project={project} />
      </div>
    </motion.div>
  )
}

// ── Tier 2 Card ──────────────────────────────────────────────────

function Tier2Card({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--bg2)' : 'var(--bg)',
        border: `1px solid ${hovered ? 'var(--border2)' : 'var(--border)'}`,
        borderRadius: 6,
        padding: 16,
        transition: 'background 0.2s ease, border-color 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {project.context && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--acc)', marginBottom: 6 }}>
          {project.context}
        </div>
      )}
      <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em', color: 'var(--ink)', marginBottom: 4 }}>
        {project.name}
      </div>
      <div style={{ fontFamily: 'var(--font-instrument)', fontSize: 12, lineHeight: 1.6, color: 'var(--ink2)', marginBottom: 10, flex: 1 }}>
        {project.description}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {project.tags.map(tag => <TagPill key={tag} tag={tag} size="xs" />)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--ink3)' }}>{project.year}</span>
        <CardIconPair project={project} />
      </div>
    </motion.div>
  )
}

// ── Tier 3 Row ───────────────────────────────────────────────────

function ArchiveRow({ project }: { project: (typeof projects)[number] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 3fr 120px 80px',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid var(--border)',
        background: hovered ? 'var(--bg2)' : 'transparent',
        marginLeft: hovered ? -8 : 0,
        paddingLeft: hovered ? 8 : 0,
        marginRight: hovered ? -8 : 0,
        paddingRight: hovered ? 8 : 0,
        transition: 'background 0.15s ease, margin 0.15s ease, padding 0.15s ease',
      }}
    >
      <span style={{ fontFamily: 'var(--font-instrument)', fontWeight: 500, fontSize: 13, color: 'var(--ink)' }}>
        {project.name}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-instrument)', fontSize: 12, color: 'var(--ink3)',
          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          paddingRight: 12,
        }}
        className="archive-desc"
      >
        {project.description}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }} className="archive-stack">
        {project.tags.slice(0, 2).map(tag => <TagPill key={tag} tag={tag} size="xs" />)}
      </div>
      <RowIconPair project={project} />
    </div>
  )
}

// ── Flat row (filtered view) ─────────────────────────────────────

function FlatRow({ project }: { project: (typeof projects)[number] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 3fr 120px 80px',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid var(--border)',
        background: hovered ? 'var(--bg2)' : 'transparent',
        marginLeft: hovered ? -8 : 0,
        paddingLeft: hovered ? 8 : 0,
        marginRight: hovered ? -8 : 0,
        paddingRight: hovered ? 8 : 0,
        transition: 'background 0.15s ease, margin 0.15s ease, padding 0.15s ease',
      }}
    >
      <span style={{ fontFamily: 'var(--font-instrument)', fontWeight: 500, fontSize: 13, color: 'var(--ink)' }}>
        {project.name}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-instrument)', fontSize: 12, color: 'var(--ink3)',
          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          paddingRight: 12,
        }}
        className="archive-desc"
      >
        {project.description}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }} className="archive-stack">
        {project.tags.slice(0, 2).map(tag => <TagPill key={tag} tag={tag} size="xs" />)}
      </div>
      <RowIconPair project={project} />
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const isFiltering = activeTag !== 'All' || searchQuery.trim() !== ''

  const filteredProjects = isFiltering
    ? projects.filter(p => {
        const matchesTag = activeTag === 'All' || p.tags.includes(activeTag as Tag)
        const q = searchQuery.toLowerCase().trim()
        const matchesSearch =
          q === '' ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q)) ||
          (p.context?.toLowerCase().includes(q) ?? false)
        return matchesTag && matchesSearch
      })
    : projects

  const tier1 = projects.filter(p => p.tier === 1)
  const tier2 = projects.filter(p => p.tier === 2)
  const tier3 = projects.filter(p => p.tier === 3)

  const headingRef = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true })

  return (
    <>
      <Nav />

      <main style={{ minHeight: '100vh' }}>
        {/* Page header */}
        <div
          ref={headingRef}
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            paddingTop: 72,
            paddingLeft: 48,
            paddingRight: 48,
          }}
          className="projects-header"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 900,
              fontSize: 'clamp(40px, 7vw, 80px)',
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              lineHeight: 1,
            }}
          >
            All Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 400,
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ink3)',
              marginTop: 10,
            }}
          >
            {total} projects · {languages} languages · {hackathons} hackathons
          </motion.p>
        </div>

        {/* Filter + Search */}
        <div
          style={{
            maxWidth: 1200,
            margin: '32px auto 0',
            paddingLeft: 48,
            paddingRight: 48,
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            flexWrap: 'wrap',
          }}
          className="projects-header"
        >
          {/* Search */}
          <div style={{ position: 'relative', flexShrink: 0 }} className="search-wrap">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                fontFamily: 'var(--font-instrument)',
                fontSize: 13,
                color: 'var(--ink)',
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 4,
                padding: '9px 14px',
                paddingRight: searchQuery ? 32 : 14,
                width: 260,
                outline: 'none',
                transition: 'border-color 0.15s ease',
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = 'var(--border2)'
                e.currentTarget.style.outline = '2px solid var(--acc)'
                e.currentTarget.style.outlineOffset = '2px'
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.outline = 'none'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: 10,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--ink3)',
                  fontSize: 14,
                  lineHeight: 1,
                  padding: 0,
                }}
              >
                ×
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {FILTER_PILLS.map(pill => {
              const isActive = activeTag === pill
              return (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setActiveTag(isActive && pill !== 'All' ? 'All' : pill)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '5px 10px',
                    borderRadius: 3,
                    background: isActive ? 'var(--ink)' : 'var(--bg2)',
                    border: `0.5px solid ${isActive ? 'var(--ink)' : 'var(--border)'}`,
                    color: isActive ? 'var(--bg)' : 'var(--ink3)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      const el = e.currentTarget
                      el.style.background = 'var(--bg3)'
                      el.style.borderColor = 'var(--border2)'
                      el.style.color = 'var(--ink2)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      const el = e.currentTarget
                      el.style.background = 'var(--bg2)'
                      el.style.borderColor = 'var(--border)'
                      el.style.color = 'var(--ink3)'
                    }
                  }}
                >
                  {pill}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content area */}
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            paddingLeft: 48,
            paddingRight: 48,
            paddingBottom: 80,
          }}
          className="projects-header"
        >
          <AnimatePresence mode="wait">
            {isFiltering ? (
              /* ── Filtered flat list ── */
              <motion.div
                key="filtered"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  style={{
                    marginTop: 32,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--ink3)',
                    marginBottom: 20,
                  }}
                >
                  Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                </div>

                {filteredProjects.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      fontFamily: 'var(--font-instrument)',
                      fontSize: 14,
                      color: 'var(--ink3)',
                      padding: '48px 0',
                    }}
                  >
                    No projects match.
                  </div>
                ) : (
                  <>
                    {/* Table header */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 3fr 120px 80px',
                        paddingBottom: 10,
                        borderBottom: '2px solid var(--ink)',
                        marginBottom: 0,
                      }}
                      className="archive-cols"
                    >
                      {['Project', 'Description', 'Stack', ''].map(col => (
                        <span
                          key={col}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: 9,
                            letterSpacing: '0.14em',
                            textTransform: 'uppercase',
                            color: 'var(--ink3)',
                          }}
                        >
                          {col}
                        </span>
                      ))}
                    </div>
                    {filteredProjects.map(p => <FlatRow key={p.slug} project={p} />)}
                  </>
                )}
              </motion.div>
            ) : (
              /* ── Tiered default view ── */
              <motion.div
                key="tiered"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Tier 1 */}
                <SectionLabel marginTop={56}>Flagship</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16 }} className="tier1-grid">
                  {tier1.map((p, i) => <Tier1Card key={p.slug} project={p} index={i} />)}
                </div>

                {/* Tier 2 */}
                <SectionLabel marginTop={48}>Notable</SectionLabel>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }} className="tier2-grid">
                  {tier2.map((p, i) => <Tier2Card key={p.slug} project={p} index={i} />)}
                </div>

                {/* Tier 3 */}
                <SectionLabel marginTop={48}>Archive</SectionLabel>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 3fr 120px 80px',
                    paddingBottom: 10,
                    borderBottom: '2px solid var(--ink)',
                  }}
                  className="archive-cols"
                >
                  {['Project', 'Description', 'Stack', ''].map(col => (
                    <span
                      key={col}
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 9,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--ink3)',
                      }}
                    >
                      {col}
                    </span>
                  ))}
                </div>
                {tier3.map(p => <ArchiveRow key={p.slug} project={p} />)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .projects-header {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .tier1-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 1024px) {
          .tier2-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 640px) {
          .tier2-grid {
            grid-template-columns: 1fr !important;
          }
          .archive-cols {
            grid-template-columns: 1fr 80px !important;
          }
          .archive-desc,
          .archive-stack {
            display: none !important;
          }
        }
        .search-wrap input::placeholder {
          color: var(--ink3);
        }
        @media (max-width: 640px) {
          .search-wrap input {
            width: 100% !important;
          }
        }
      `}</style>
    </>
  )
}

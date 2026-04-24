'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { projects, type Project } from '@/data/portfolio'

const AI_TAG_RE = /ai|llm|cv|voice|fine.?tun|claude|gpt|vision/i

const GitHubIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    style={{ display: 'block', flexShrink: 0 }}
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
)

const BlogIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    style={{ display: 'block', flexShrink: 0 }}
  >
    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5zM4.5 8a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zm0 2.5a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zm0 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z"/>
  </svg>
)

export default function Work() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="work"
      ref={ref}
      style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '72px 48px 0',
        scrollMarginTop: 80,
      }}
    >
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink3)',
          borderBottom: '1px solid var(--border)',
          paddingBottom: 10,
          marginBottom: 24,
        }}
      >
        Selected work · {projects.length} projects
      </motion.div>

      {/* Column headers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2.5fr 1.5fr 80px',
          padding: '0 0 10px',
          borderBottom: '2px solid var(--ink)',
        }}
        className="work-cols"
      >
        {['Project', 'Stack', ''].map((col) => (
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

      {/* Project rows */}
      <div>
        {projects.map((project, i) => (
          <ProjectRow key={project.name} project={project} index={i} inView={inView} />
        ))}
      </div>

      {/* View all link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ marginTop: 28 }}
      >
        <a
          href="/projects"
          style={{
            fontFamily: 'var(--font-instrument)',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink)',
            textDecoration: 'none',
            borderBottom: '2px solid var(--acc)',
            paddingBottom: 1,
            transition: 'color 0.2s ease',
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--acc)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)'
          }}
        >
          View all projects →
        </a>
      </motion.div>

      <style>{`
        @media (max-width: 640px) {
          #work { padding-left: 24px !important; padding-right: 24px !important; }
          .work-cols { display: none !important; }
        }
      `}</style>
    </section>
  )
}

const iconLabelStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 9,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: 'var(--ink3)',
}

function ProjectRow({
  project,
  index,
  inView,
}: {
  project: Project
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.07 }}
      className="project-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '2.5fr 1.5fr 80px',
        alignItems: 'center',
        borderBottom: '1px solid var(--border)',
        padding: '16px 0',
        paddingLeft: 0,
        marginLeft: 0,
        transition: 'background 0.15s ease, padding-left 0.15s ease, margin-left 0.15s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.backgroundColor = 'var(--bg2)'
        el.style.paddingLeft = '8px'
        el.style.marginLeft = '-8px'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.backgroundColor = 'transparent'
        el.style.paddingLeft = '0'
        el.style.marginLeft = '0'
      }}
    >
      {/* Left: name + description + badge */}
      <div>
        {project.blogSlug ? (
          <Link
            href={`/blog/${project.blogSlug}`}
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              display: 'inline',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.color = 'var(--acc)'
              el.style.textDecoration = 'underline'
              el.style.textUnderlineOffset = '3px'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.color = 'var(--ink)'
              el.style.textDecoration = 'none'
            }}
          >
            {project.name}
          </Link>
        ) : (
          <span
            style={{
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: '-0.01em',
              color: 'var(--ink)',
              display: 'block',
            }}
          >
            {project.name}
          </span>
        )}
        <span
          className="project-desc"
          style={{
            fontFamily: 'var(--font-instrument)',
            fontSize: 11,
            color: 'var(--ink3)',
            display: 'block',
            marginTop: 2,
          }}
        >
          {project.description}
        </span>
        {project.featured && (
          <span
            style={{
              display: 'inline-block',
              marginTop: 5,
              fontSize: 9,
              padding: '2px 7px',
              background: 'var(--acc-bg)',
              color: 'var(--acc)',
              borderRadius: 3,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-instrument)',
            }}
          >
            Featured
          </span>
        )}
      </div>

      {/* Middle: tags */}
      <div
        className="project-tags"
        style={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center' }}
      >
        {project.tags.map((tag) => {
          const isAI = AI_TAG_RE.test(tag)
          return (
            <span
              key={tag}
              style={{
                fontSize: 9,
                padding: '3px 7px',
                background: isAI ? 'var(--acc-bg)' : 'var(--bg3)',
                color: isAI ? 'var(--acc)' : 'var(--ink2)',
                borderRadius: 3,
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-instrument)',
              }}
            >
              {tag}
            </span>
          )
        })}
      </div>

      {/* Right: icon pair */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 14 }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} on GitHub`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: 8,
              color: 'var(--ink3)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink3)'
            }}
          >
            <GitHubIcon />
            <span style={iconLabelStyle}>GitHub</span>
          </a>
        )}
        {project.blogSlug && (
          <Link
            href={`/blog/${project.blogSlug}`}
            aria-label={`${project.name} case study`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: 8,
              color: 'var(--ink3)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--acc)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--ink3)'
            }}
          >
            <BlogIcon />
            <span style={iconLabelStyle}>Case study</span>
          </Link>
        )}
      </div>
    </motion.div>
  )
}

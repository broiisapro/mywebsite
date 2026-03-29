'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { projects, type Project } from '@/data/portfolio'

const GitHubIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
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
        padding: '72px 48px',
      }}
    >
      {/* Header row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <span className="label">Selected Work</span>
        <span
          style={{
            fontFamily: 'var(--font-syne)',
            fontSize: 11,
            color: 'rgba(212,208,200,0.2)',
            letterSpacing: '0.06em',
          }}
        >
          08 Projects
        </span>
      </motion.div>

      {/* Project list */}
      <div>
        {projects.map((project, i) => (
          <ProjectRow key={project.name} project={project} index={i} inView={inView} />
        ))}
      </div>
    </section>
  )
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
  const blogHref = `/blog/${project.blogSlug}`
  const hasCollaborator = !!project.collaborator

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
      className="project-row"
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 3fr 1.5fr auto',
        alignItems: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '22px 0',
        paddingLeft: 0,
        marginLeft: 0,
        transition: 'all 0.25s ease',
        cursor: 'none',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.backgroundColor = 'rgba(232,164,74,0.03)'
        el.style.paddingLeft = '12px'
        el.style.marginLeft = '-12px'
        const arrow = el.querySelector('.project-arrow') as HTMLElement
        if (arrow) arrow.style.color = '#e8a44a'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.backgroundColor = 'transparent'
        el.style.paddingLeft = '0'
        el.style.marginLeft = '0'
        const arrow = el.querySelector('.project-arrow') as HTMLElement
        if (arrow) arrow.style.color = 'rgba(212,208,200,0.18)'
      }}
    >
      {/* Name + badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' as const }}>
        <span
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: 17,
            color: 'rgba(255,255,255,0.85)',
          }}
          className="project-name"
        >
          {project.name}
        </span>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} GitHub repository`}
            style={{
              color: 'rgba(212,208,200,0.2)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.color = '#e8a44a'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.color = 'rgba(212,208,200,0.2)'
            }}
          >
            <GitHubIcon />
          </a>
        )}
        {project.featured && (
          <span
            style={{
              fontSize: 10,
              color: '#e8a44a',
              backgroundColor: 'rgba(232,164,74,0.15)',
              borderRadius: 20,
              padding: '3px 10px',
              letterSpacing: '0.04em',
              fontFamily: 'var(--font-syne)',
              fontWeight: 700,
            }}
          >
            Featured
          </span>
        )}
        {!project.github && !hasCollaborator && (
          <span
            style={{
              fontSize: 10,
              color: 'rgba(212,208,200,0.2)',
              fontFamily: 'var(--font-instrument)',
              letterSpacing: '0.02em',
            }}
          >
            Private
          </span>
        )}
      </div>

      {/* Description */}
      <span
        style={{
          fontSize: 13,
          color: 'rgba(212,208,200,0.4)',
          lineHeight: 1.5,
          paddingRight: 24,
        }}
        className="project-desc"
      >
        {project.description}
      </span>

      {/* Tags */}
      <div
        style={{ display: 'flex', gap: 6, flexWrap: 'wrap' as const }}
        className="project-tags"
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              color: 'rgba(232,164,74,0.6)',
              border: '1px solid rgba(232,164,74,0.15)',
              borderRadius: 20,
              padding: '3px 10px',
              letterSpacing: '0.02em',
              fontFamily: 'var(--font-instrument)',
            }}
          >
            {tag}
          </span>
        ))}
        {!project.github && project.collaborator && (
          <span
            style={{
              fontSize: 11,
              color: 'rgba(212,208,200,0.25)',
              fontFamily: 'var(--font-instrument)',
              letterSpacing: '0.02em',
            }}
          >
            w/ {project.collaborator}
          </span>
        )}
      </div>

      {/* Arrow — always links to blog post */}
      <Link
        href={blogHref}
        className="project-arrow"
        style={{
          fontSize: 18,
          color: 'rgba(212,208,200,0.18)',
          transition: 'color 0.25s ease',
          paddingLeft: 16,
          userSelect: 'none',
          textDecoration: 'none',
          display: 'inline-block',
        }}
      >
        ↗
      </Link>
    </motion.div>
  )
}

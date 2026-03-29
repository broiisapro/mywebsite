'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '@/data/portfolio'

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
          07 Projects
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
  project: (typeof projects)[0]
  index: number
  inView: boolean
}) {
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
        cursor: 'default',
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
      {/* Name */}
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
      </div>

      {/* Arrow */}
      <span
        className="project-arrow"
        style={{
          fontSize: 18,
          color: 'rgba(212,208,200,0.18)',
          transition: 'color 0.25s ease',
          paddingLeft: 16,
          userSelect: 'none',
        }}
      >
        ↗
      </span>
    </motion.div>
  )
}

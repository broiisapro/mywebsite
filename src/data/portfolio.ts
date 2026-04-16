export interface Project {
  name: string
  description: string
  tags: string[]
  github: string | null
  collaborator?: string
  blogSlug: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: 'LinkedIn Growth OS',
    description:
      'Personal CRM and content intelligence platform. 19 API routes, 41 React components, ~10,000 lines of TypeScript. AI post generation, scoring engine, and autopsy features.',
    tags: ['Next.js 14', 'TypeScript', 'Prisma', 'SQLite', 'Claude API'],
    github: null,
    blogSlug: 'linkedin-growth-os',
    featured: true,
  },
  {
    name: 'APEX',
    description:
      'High-altitude balloon spectroscopy platform. Team lead. Launched to 100,000 ft.',
    tags: ['Python', 'Embedded'],
    github: 'https://github.com/broiisapro/Apex',
    blogSlug: 'apex',
  },
  {
    name: 'Crawl / OpenClaw',
    description: 'Autonomous SEO/GEO agentic SaaS. GenAI Genesis 2025.',
    tags: ['Next.js', 'LLMs', 'Scraping'],
    collaborator: 'Nitya Savaram',
    // Co-built with Nitya Savaram — link to their repo, not broiisapro
    github: 'https://github.com/Nityasav/openclawseo',
    blogSlug: 'crawl-openclaw',
  },
  {
    name: 'VantageAI',
    description: 'Fine-tuned LLM grader in active pilot with DECA Ontario.',
    tags: ['Fine-tuning', 'FastAPI', 'React'],
    github: null,
    blogSlug: 'vantagei-deca-grader',
  },
  {
    name: 'Pyros',
    description: 'Wildfire detection with AI voice agent. Hack Canada 2025.',
    tags: ['CV', 'Voice AI', 'Python'],
    github: 'https://github.com/broiisapro/HackCanada-NRM',
    blogSlug: 'pyros',
  },
  {
    name: 'commitgpt',
    description:
      'Python CLI/Git hook that auto-generates conventional commit messages via LLM.',
    tags: ['Python', 'CLI', 'Git'],
    github: 'https://github.com/broiisapro/commitgpt',
    blogSlug: 'commitgpt',
  },
  {
    name: 'ASL Translator',
    description:
      'Real-time American Sign Language recognition via computer vision.',
    tags: ['MediaPipe', 'CV', 'Python'],
    github: 'https://github.com/broiisapro/project-11---sign-language',
    blogSlug: 'asl-translator',
  },
  {
    name: 'FRC Team 9621',
    description:
      'FIRST Robotics Competition. Blue Banner winner — first year competing.',
    tags: ['Robotics', 'C++'],
    github: 'https://github.com/9621-Payload/2024-Game-Robot',
    blogSlug: 'frc-team-9621',
  },
]

export const skills = {
  Languages: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Java'],
  'Frameworks & Tools': ['Next.js', 'React', 'FastAPI', 'Docker', 'AWS', 'Git'],
  Specialties: ['LLM APIs', 'Web Scraping', 'Browser Automation', 'Embedded Systems'],
}

export const stats = [
  '5+ years coding',
  '56+ public repos',
  '#5 globally · Hack Club',
  '4.0 GPA',
  'Blue Banner · FRC Team 9621',
]

export const marqueeItems = [
  'APEX',
  'Crawl / OpenClaw',
  'VantageAI',
  'Pyros',
  'commitgpt',
  'DECA ICDC Champion',
  'FRC Blue Banner',
  'Hack Club High Seas',
]

export const identity = {
  name: 'Moksh Siruvani',
  github: 'https://github.com/broiisapro',
  linkedin: 'https://linkedin.com/in/moksh-siruvani',
  email: 'mailto:moksh.siruvani@gmail.com',
  phone: '+1-437-265-4886',
  location: 'Whitby, Ontario, Canada',
  est: 'EST. 2009',
  bio: '16. Graduating early. Building software that ships — from autonomous SEO platforms to wildfire detection agents. Mechatronics engineer. Founder, competitor, maker.',
}

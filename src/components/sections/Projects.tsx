import { useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FiExternalLink, FiX, FiGithub } from 'react-icons/fi'
import { PROJECTS, type Project } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'

const CATEGORIES = ['All', 'Web', 'Mobile', 'Systems'] as const

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onClick={onOpen}
      className="panel-glass clip-corner p-6 cursor-pointer group relative overflow-hidden"
      data-cursor="link"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
    >
      {project.featured && (
        <span className="absolute top-4 right-4 text-[9px] font-mono tracking-widest text-signal border border-signal/40 px-2 py-0.5">
          FEATURED
        </span>
      )}
      <p className="font-mono text-[11px] text-ink-faint mb-2">{project.year} · {project.category}</p>
      <h3 className="font-display text-xl font-semibold text-ink mb-2 group-hover:text-signal transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-ink-dim mb-4 leading-relaxed">{project.tagline}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s) => (
          <span key={s} className="text-[10px] font-mono text-cyan border border-cyan/25 px-2 py-0.5">
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] bg-void/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto panel-glass clip-corner p-5 xs:p-7 sm:p-9"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-mono text-xs text-ink-faint mb-1">{project.year} · {project.role}</p>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">{project.title}</h3>
          </div>
          <button onClick={onClose} className="text-ink-dim hover:text-alert transition-colors" data-cursor="link">
            <FiX size={22} />
          </button>
        </div>
        <p className="text-ink-dim leading-relaxed mb-5 text-sm sm:text-base">{project.description}</p>

        <p className="eyebrow mb-2">Highlights</p>
        <ul className="space-y-2 mb-6">
          {project.highlights.map((h) => (
            <li key={h} className="text-sm text-ink-dim flex gap-2">
              <span className="text-signal">▹</span> {h}
            </li>
          ))}
        </ul>

        <p className="eyebrow mb-2">Stack</p>
        <div className="flex flex-wrap gap-1.5 mb-7">
          {project.stack.map((s) => (
            <span key={s} className="text-[11px] font-mono text-cyan border border-cyan/25 px-2 py-0.5">
              {s}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-neon flex items-center gap-2"
              data-cursor="link"
            >
              <FiExternalLink /> Live Site
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost flex items-center gap-2"
              data-cursor="link"
            >
              <FiGithub /> Repository
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>('All')
  const [selected, setSelected] = useState<Project | null>(null)

  const filtered = PROJECTS.filter((p) => filter === 'All' || p.category === filter)

  return (
    <section id="projects" className="relative py-20 sm:py-32 px-4 xs:px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Shipped Work"
          title="Projects"
          description="Real, deployed or deployable systems — not toy demos."
        />

        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 font-mono text-xs tracking-wide border transition-colors ${
                filter === cat
                  ? 'border-signal text-signal bg-signal/5'
                  : 'border-hairline text-ink-dim hover:text-ink'
              }`}
              data-cursor="link"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setSelected(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}

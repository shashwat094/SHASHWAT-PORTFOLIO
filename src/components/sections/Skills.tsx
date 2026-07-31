import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { SKILLS } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'

function SkillBar({ name, level, active }: { name: string; level: number; active: boolean }) {
  return (
    <div>
      <div className="flex justify-between mb-1.5 font-mono text-xs">
        <span className="text-ink">{name}</span>
        <span className="text-signal">{active ? level : 0}%</span>
      </div>
      <div className="h-1.5 bg-panel border border-hairline overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-signal-dim to-signal shadow-glow-sm"
          initial={{ width: 0 }}
          animate={{ width: active ? `${level}%` : 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const categories = Object.keys(SKILLS)
  const [active, setActive] = useState(categories[0])
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="skills" className="relative py-20 sm:py-32 px-4 xs:px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Capability Matrix"
          title="Skills & Tools"
          description="Grouped the way I actually use them day to day — not a wall of undifferentiated logos."
        />

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 font-mono text-xs tracking-wide border transition-colors ${
                active === cat
                  ? 'border-signal text-signal bg-signal/5'
                  : 'border-hairline text-ink-dim hover:text-ink'
              }`}
              data-cursor="link"
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={ref} className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
          {SKILLS[active].map((skill) => (
            <SkillBar key={active + skill.name} name={skill.name} level={skill.level} active={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

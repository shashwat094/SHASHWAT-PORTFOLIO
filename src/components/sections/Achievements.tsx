import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ACHIEVEMENTS } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'

function AchievementCard({ value, label, detail, i }: { value: string; label: string; detail: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="panel-glass clip-corner p-6 text-center"
    >
      <p className="font-display text-4xl font-bold text-signal text-glow mb-2">{value}</p>
      <p className="text-sm font-semibold text-ink mb-1">{label}</p>
      <p className="text-xs text-ink-faint leading-relaxed">{detail}</p>
    </motion.div>
  )
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20 sm:py-32 px-4 xs:px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="09" eyebrow="By The Numbers" title="Achievements" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ACHIEVEMENTS.map((a, i) => (
            <AchievementCard key={a.label} value={a.value} label={a.label} detail={a.detail} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { EXPERIENCE } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 sm:py-32 px-4 xs:px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading index="05" eyebrow="Track Record" title="Experience" />

        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[5px] sm:left-[7px] top-2 bottom-2 w-px bg-hairline" />
          <div className="space-y-12">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.role + exp.org}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                <span className="absolute -left-8 sm:-left-10 top-1.5 w-3 h-3 rounded-full bg-signal shadow-glow-sm" />
                <p className="font-mono text-xs text-signal mb-1 tracking-wide">{exp.period}</p>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-ink">{exp.role}</h3>
                <p className="text-sm text-cyan mb-2">{exp.org}</p>
                <p className="text-sm text-ink-dim leading-relaxed max-w-xl">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { FiAward } from 'react-icons/fi'
import { EDUCATION } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Education() {
  return (
    <section id="education" className="relative py-20 sm:py-32 px-4 xs:px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading index="06" eyebrow="Foundation" title="Education" />

        <div className="grid gap-5">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="panel-glass clip-corner p-6 sm:p-8 flex gap-5 items-start"
            >
              <div className="w-11 h-11 flex items-center justify-center border border-signal/40 text-signal shrink-0">
                <FiAward size={20} />
              </div>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-semibold text-ink">{edu.degree}</h3>
                <p className="text-sm text-cyan mt-1">{edu.institution}</p>
                <p className="text-xs text-ink-faint mt-1">{edu.affiliation}</p>
                <div className="flex gap-4 mt-3 font-mono text-xs text-ink-dim">
                  <span className="text-signal">{edu.period}</span>
                  <span>{edu.detail}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

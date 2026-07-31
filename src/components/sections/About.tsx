import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ABOUT } from '@/data/content'
import { useCountUp } from '@/hooks/useCountUp'
import SectionHeading from '@/components/ui/SectionHeading'

function Stat({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const count = useCountUp(value, { start: inView })

  return (
    <div ref={ref} className="panel-glass clip-corner p-4 xs:p-5">
      <p className="font-display text-2xl xs:text-3xl sm:text-4xl font-bold text-signal text-glow leading-tight">
        {count}
        {suffix}
      </p>
      <p className="mt-2 text-[11px] xs:text-xs text-ink-dim tracking-wide leading-snug">{label}</p>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-20 sm:py-32 px-4 xs:px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="01"
          eyebrow="Operator Profile"
          title="About the Developer"
        />

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} className="text-ink-dim leading-relaxed text-sm sm:text-base">
                {p}
              </p>
            ))}

            <div className="flex flex-wrap gap-2 pt-3">
              {ABOUT.strengths.map((s) => (
                <span
                  key={s}
                  className="border border-hairline px-3 py-1.5 text-[11px] font-mono text-cyan tracking-wide"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="pt-4 flex gap-8">
              {ABOUT.languages.map((lang) => (
                <div key={lang.name}>
                  <p className="text-xs font-mono text-ink-dim mb-1.5">{lang.name}</p>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`w-4 h-1.5 ${i < lang.level ? 'bg-signal' : 'bg-hairline'}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 content-start">
            {ABOUT.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Stat label={s.label} value={s.value} suffix={s.suffix} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { FiCode, FiSmartphone, FiLayout, FiTrendingUp } from 'react-icons/fi'
import { SERVICES } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'

const ICONS = [FiCode, FiSmartphone, FiLayout, FiTrendingUp]

export default function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-32 px-4 xs:px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="07" eyebrow="What I Build" title="Services" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group panel-glass clip-corner p-6 hover:border-signal/50 transition-colors"
              >
                <Icon className="text-signal mb-4 group-hover:scale-110 transition-transform" size={26} />
                <h3 className="font-display font-semibold text-ink mb-2">{s.title}</h3>
                <p className="text-xs text-ink-dim leading-relaxed">{s.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

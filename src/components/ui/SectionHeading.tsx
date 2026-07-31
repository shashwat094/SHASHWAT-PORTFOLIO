import { motion } from 'framer-motion'

interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  description?: string
}

export default function SectionHeading({ index, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mb-12 sm:mb-16"
    >
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-signal text-sm">{index}</span>
        <span className="eyebrow">{eyebrow}</span>
        <span className="h-px flex-1 bg-hairline" />
      </div>
      <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-ink-dim text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}

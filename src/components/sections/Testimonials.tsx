import { TESTIMONIALS } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section id="testimonials" className="relative py-20 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 xs:px-5 sm:px-8">
        <SectionHeading index="08" eyebrow="Kind Words" title="Testimonials" />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-void to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-void to-transparent z-10" />
        <div className="flex gap-6 animate-marquee w-max px-5">
          {loop.map((t, i) => (
            <div
              key={i}
              className="panel-glass clip-corner p-6 w-[320px] sm:w-[380px] shrink-0"
            >
              <p className="text-sm text-ink-dim leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-display text-sm font-semibold text-ink">{t.name}</p>
              <p className="font-mono text-[11px] text-signal">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

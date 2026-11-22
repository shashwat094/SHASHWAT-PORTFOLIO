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
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused] w-max px-5">
          {loop.map((t, i) => (
            <div
              key={i}
              className="panel-glass clip-corner p-6 w-[320px] sm:w-[380px] shrink-0"
            >
              <span className="block font-display text-4xl leading-none text-signal/60 mb-2" aria-hidden>&ldquo;</span>
              <p className="text-sm text-ink-dim leading-relaxed mb-5">{t.quote}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-hairline">
                <span className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-mono text-xs text-void bg-gradient-to-br from-signal to-violet">
                  {t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </span>
                <div className="min-w-0">
                  <p className="font-display text-sm font-semibold text-ink truncate">{t.name}</p>
                  <p className="font-mono text-[11px] text-signal truncate">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { SITE } from '@/data/content'
import { cn } from '@/lib/utils'

export default function ProfilePhoto({ className }: { className?: string }) {
  const [errored, setErrored] = useState(false)

  return (
    <div
      className={cn(
        'relative aspect-square overflow-hidden border border-signal/40 clip-corner',
        className
      )}
    >
      {!errored ? (
        <img
          src={SITE.photoUrl}
          alt={SITE.name}
          onError={() => setErrored(true)}
          className="h-full w-full object-cover grayscale-[15%] contrast-110"
        />
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center bg-panel gap-2 p-4 text-center">
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="text-signal/70">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.4" />
            <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.4" />
          </svg>
          <p className="font-mono text-[10px] tracking-widest text-signal/80">AWAITING UPLINK</p>
          <p className="font-mono text-[9px] text-ink-faint leading-relaxed">
            drop pic.jpeg into /public
          </p>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 scanlines opacity-20" />
    </div>
  )
}

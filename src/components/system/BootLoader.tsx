import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SITE } from '@/data/content'

const BOOT_LINES = [
  'SHASHWAT_OS v2.6.0 — INITIALIZING',
  'LOADING INTERFACE MODULES ... OK',
  'MOUNTING PROJECT DATA ... OK',
  'PREPARING SCROLL ENGINE ... OK',
  'RENDERING BACKGROUND SCENE ... OK',
  `LOADING PROFILE: ${SITE.name.toUpperCase()} ... OK`,
  'STARTING INTERACTIVE TERMINAL ... OK',
  'ALL SYSTEMS READY',
]

interface BootLoaderProps {
  onDone: () => void
}

export default function BootLoader({ onDone }: BootLoaderProps) {
  const [lineIndex, setLineIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [finished, setFinished] = useState(false)
  const [exiting, setExiting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) {
      setFinished(true)
      const t = setTimeout(() => setExiting(true), 550)
      return () => clearTimeout(t)
    }
    const delay = 90 + Math.random() * 160
    const t = setTimeout(() => setLineIndex((i) => i + 1), delay)
    return () => clearTimeout(t)
  }, [lineIndex])

  useEffect(() => {
    setProgress(Math.round((lineIndex / BOOT_LINES.length) * 100))
  }, [lineIndex])

  useEffect(() => {
    if (exiting) {
      const t = setTimeout(onDone, 650)
      return () => clearTimeout(t)
    }
  }, [exiting, onDone])

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="boot"
          exit={{ opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.5 }}
          ref={containerRef}
          className="fixed inset-0 z-[9500] bg-void font-mono text-signal px-4 xs:px-6 sm:px-10 py-8 sm:py-10 overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute inset-0 scanlines opacity-30" />
          <div>
            <p className="text-xs sm:text-sm text-ink-faint mb-6 tracking-widest">
              SHASHWAT_OS BOOT SEQUENCE
            </p>
            <div className="space-y-1.5 text-xs sm:text-sm">
              {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-ink-faint">[{String(i).padStart(2, '0')}]</span>
                  <span className={i === BOOT_LINES.length - 1 ? 'text-signal text-glow' : 'text-ink-dim'}>
                    {line}
                  </span>
                </div>
              ))}
              {!finished && (
                <div className="flex gap-3">
                  <span className="text-ink-faint">[{String(lineIndex).padStart(2, '0')}]</span>
                  <span className="inline-block w-2 h-3.5 bg-signal animate-pulse" />
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[10px] sm:text-xs text-ink-faint mb-2 tracking-widest">
              <span>LOADING SYSTEM</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-panel border border-hairline">
              <motion.div
                className="h-full bg-signal shadow-glow-sm"
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <AnimatePresence>
              {finished && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center font-display text-lg sm:text-2xl tracking-[0.3em] text-signal text-glow"
                >
                  READY
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

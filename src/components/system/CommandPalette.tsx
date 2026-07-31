import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { SITE } from '@/data/content'

interface CommandItem {
  label: string
  hint: string
  action: () => void
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')

  const items: CommandItem[] = useMemo(
    () => [
      { label: 'Go to About', hint: 'section', action: () => scrollTo('#about') },
      { label: 'Go to Skills', hint: 'section', action: () => scrollTo('#skills') },
      { label: 'Go to Projects', hint: 'section', action: () => scrollTo('#projects') },
      { label: 'Go to Experience', hint: 'section', action: () => scrollTo('#experience') },
      { label: 'Open Terminal', hint: 'section', action: () => scrollTo('#terminal') },
      { label: 'Go to Contact', hint: 'section', action: () => scrollTo('#contact') },
      { label: 'Open GitHub', hint: 'external', action: () => window.open(SITE.github, '_blank') },
      { label: 'Open LinkedIn', hint: 'external', action: () => window.open(SITE.linkedin, '_blank') },
      { label: 'Download Résumé', hint: 'file', action: () => window.open(SITE.resumeUrl, '_blank') },
      { label: 'Email Me', hint: 'mailto', action: () => (window.location.href = `mailto:${SITE.email}`) },
    ],
    []
  )

  function scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
    onClose()
  }

  const filtered = items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-20 sm:pt-28 px-4 bg-void/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg panel-glass clip-corner overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
              <span className="text-signal font-mono">$</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent font-mono text-sm text-ink placeholder:text-ink-faint outline-none"
              />
              <kbd className="text-[10px] font-mono text-ink-faint border border-hairline px-1.5 py-0.5">ESC</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <p className="px-4 py-6 text-center text-xs font-mono text-ink-faint">No matching command.</p>
              )}
              {filtered.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-ink-dim hover:bg-signal/5 hover:text-signal transition-colors font-mono"
                >
                  <span>{item.label}</span>
                  <span className="flex items-center gap-1 text-[10px] text-ink-faint">
                    {item.hint} <FiArrowUpRight size={12} />
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

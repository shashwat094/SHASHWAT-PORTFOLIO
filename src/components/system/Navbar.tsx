import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { FiMenu, FiX, FiVolume2, FiVolumeX, FiCommand } from 'react-icons/fi'
import { SITE } from '@/data/content'
import { useSound } from '@/context/SoundContext'
import { scrollToId } from '@/lib/utils'

const LINKS = [
  { href: '#about', label: 'about' },
  { href: '#skills', label: 'skills' },
  { href: '#projects', label: 'projects' },
  { href: '#experience', label: 'experience' },
  { href: '#terminal', label: 'terminal' },
  { href: '#contact', label: 'contact' },
]

interface NavbarProps {
  onOpenPalette: () => void
}

export default function Navbar({ onOpenPalette }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const { enabled, setEnabled, play } = useSound()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-signal shadow-glow-sm z-[60] origin-left"
        style={{ scaleX: progress }}
      />
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'panel-glass py-3' : 'py-5 bg-transparent'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 xs:px-5 sm:px-8 flex items-center justify-between gap-2">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollToId('#hero')
            }}
            className="font-display font-semibold tracking-wide sm:tracking-widest text-ink flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base shrink-0"
            data-cursor="link"
          >
            <span className="text-signal">◆</span>
            <span className="hidden xs:inline">SHASHWAT</span>
            <span className="xs:hidden">SW</span>
            <span className="text-signal">_OS</span>
          </a>

          <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(link.href)
                }}
                onMouseEnter={() => play('hover')}
                className="text-ink-dim hover:text-signal transition-colors"
                data-cursor="link"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 xs:gap-3">
            <button
              onClick={onOpenPalette}
              className="hidden sm:flex items-center gap-2 border border-hairline px-3 py-1.5 text-[10px] font-mono text-ink-dim hover:border-signal hover:text-signal transition-colors"
              data-cursor="link"
            >
              <FiCommand size={12} /> K
            </button>
            <button
              onClick={() => setEnabled(!enabled)}
              className="text-ink-dim hover:text-signal transition-colors"
              aria-label="Toggle sound"
              data-cursor="link"
            >
              {enabled ? <FiVolume2 size={16} /> : <FiVolumeX size={16} />}
            </button>
            <a
              href={SITE.resumeUrl}
              download
              className="hidden sm:inline-block btn-neon !py-2 !px-4 text-[10px]"
              data-cursor="link"
            >
              Resume
            </a>
            <button
              className="md:hidden text-ink"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              data-cursor="link"
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] xs:top-[64px] left-0 right-0 z-40 panel-glass md:hidden overflow-y-auto max-h-[calc(100svh-64px)]"
          >
            <div className="flex flex-col p-5 gap-4 font-mono text-sm uppercase tracking-widest">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    setOpen(false)
                    scrollToId(link.href)
                  }}
                  className="text-ink-dim hover:text-signal transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a href={SITE.resumeUrl} download className="btn-neon text-center">
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

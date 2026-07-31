import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi'
import { SITE, ROLES } from '@/data/content'
import { useTypewriter } from '@/hooks/useTypewriter'
import { scrollToId } from '@/lib/utils'
import MagneticButton from '@/components/ui/MagneticButton'
import ProfilePhoto from '@/components/ui/ProfilePhoto'

export default function Hero() {
  const typed = useTypewriter(ROLES)

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center pt-24 sm:pt-28 pb-24 px-4 xs:px-5 sm:px-8 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl w-full grid md:grid-cols-[1.3fr_0.7fr] gap-10 md:gap-12 items-center">
        <div className="min-w-0">
          {/* Photo shows small + centered on mobile, hidden here (shown large in the side column) from md up */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="w-28 xs:w-32 mx-auto mb-6 md:hidden"
          >
            <ProfilePhoto className="w-full" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="eyebrow mb-4 sm:mb-5 text-center md:text-left break-words"
          >
            SYSTEM ONLINE · {SITE.location.toUpperCase()}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display font-bold leading-[0.95] tracking-tight text-ink text-center md:text-left"
            style={{ fontSize: 'clamp(2.75rem, 11vw, 6.2rem)' }}
          >
            {SITE.shortName.toUpperCase()}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 min-h-8 font-mono text-base xs:text-lg sm:text-2xl text-signal text-center md:text-left"
          >
            <span className="text-ink-dim">&gt;_ </span>
            <span className="break-words">{typed}</span>
            <span className="inline-block w-2 h-5 bg-signal ml-1 align-middle animate-pulse" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-6 max-w-xl mx-auto md:mx-0 text-ink-dim text-sm sm:text-base leading-relaxed text-center md:text-left"
          >
            Building complete, production systems — from database schema to shipped product.
            Co-founder of a live spiritual tourism platform, and a full-stack / React Native developer
            who ships real things instead of demos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 sm:mt-9 flex flex-col xs:flex-row flex-wrap items-center md:items-start justify-center md:justify-start gap-4"
          >
            <a href={SITE.resumeUrl} download data-cursor="link" className="w-full xs:w-auto">
              <MagneticButton className="btn-neon w-full xs:w-auto flex items-center justify-center gap-2">
                <FiDownload /> Download Resume
              </MagneticButton>
            </a>
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToId('#projects') }} data-cursor="link" className="w-full xs:w-auto">
              <MagneticButton className="btn-ghost w-full xs:w-auto">View Projects</MagneticButton>
            </a>
            <div className="flex items-center gap-5 xs:gap-4 mt-2 xs:mt-0 xs:ml-1">
              {[
                { icon: <FiGithub />, href: SITE.github, label: 'GitHub' },
                { icon: <FiLinkedin />, href: SITE.linkedin, label: 'LinkedIn' },
                { icon: <FiMail />, href: `mailto:${SITE.email}`, label: 'Email' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  data-cursor="link"
                  className="text-ink-dim hover:text-signal transition-colors text-xl"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="hidden md:block"
        >
          <ProfilePhoto className="w-full max-w-xs mx-auto" />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          scrollToId('#about')
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink-faint hover:text-signal transition-colors"
        data-cursor="link"
      >
        <span className="font-mono text-[10px] tracking-widest">SCROLL</span>
        <FiArrowDown className="animate-bounce" />
      </motion.a>
    </section>
  )
}

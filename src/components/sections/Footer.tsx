import { FiArrowUp, FiInstagram, FiGithub } from 'react-icons/fi'
import { SITE } from '@/data/content'

export default function Footer() {
  return (
    <footer className="relative border-t border-hairline px-4 xs:px-5 sm:px-8 py-10">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-ink-faint">
          © {new Date().getFullYear()} {SITE.name}. Built with React, Three.js & GSAP.
        </p>
        <div className="flex items-center gap-5 text-ink-dim text-lg">
          <a href={SITE.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-signal transition-colors" data-cursor="link"><FiGithub /></a>
          <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-signal transition-colors" data-cursor="link"><FiInstagram /></a>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 font-mono text-xs text-ink-dim hover:text-signal transition-colors"
          data-cursor="link"
        >
          BACK TO TOP <FiArrowUp />
        </button>
      </div>
    </footer>
  )
}

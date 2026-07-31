import { FiArrowUp } from 'react-icons/fi'
import { SITE } from '@/data/content'

export default function Footer() {
  return (
    <footer className="relative border-t border-hairline px-4 xs:px-5 sm:px-8 py-10">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-ink-faint">
          © {new Date().getFullYear()} {SITE.name}. Built with React, Three.js & GSAP.
        </p>
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

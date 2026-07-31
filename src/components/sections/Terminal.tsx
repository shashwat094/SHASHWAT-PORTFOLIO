import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMaximize2, FiMinimize2 } from 'react-icons/fi'
import {
  SITE, ABOUT, SKILLS, PROJECTS, EXPERIENCE, EDUCATION, TERMINAL_HELP,
} from '@/data/content'
import { useSound } from '@/context/SoundContext'
import { useAccentTheme } from '@/context/ThemeContext'
import SectionHeading from '@/components/ui/SectionHeading'
import MatrixRain from '@/components/system/MatrixRain'

const JOKES = [
  'Why do programmers prefer dark mode? Because light attracts bugs.',
  "I'd tell you a UDP joke, but you might not get it.",
  "There are only 10 kinds of people: those who understand binary and those who don't.",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
  'I told my computer I needed a break. It said no problem, and froze.',
  '99 little bugs in the code, 99 little bugs — take one down, patch it around, 127 little bugs in the code.',
]

const ASCII_BANNER = String.raw`
   _____ _   _           _                  _
  / ____| | | |         | |                | |
 | (___ | |_| | __ _ ___| |____      ____ _| |_
  \___ \| __ |/ _\` / __| '_ \ \ /\ / / _\` | __|
  ____) | | | | (_| \__ \ | | \ V  V / (_| | |_
 |_____/|_| |_|\__,_|___/_| |_|\_/\_/ \__,_|\__|
`

// Quick-tap commands — the primary way to drive the terminal on touch
// devices, where typing a command is friction rather than fun.
const QUICK_COMMANDS = ['help', 'about', 'projects', 'skills', 'experience', 'hack', 'matrix', 'sudo', 'joke', 'theme', 'resume', 'contact', 'clear']

function Line({ children }: { children: ReactNode }) {
  return <div className="whitespace-pre-wrap break-words">{children}</div>
}

export default function Terminal() {
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<ReactNode[]>([
    <Line key="welcome">
      Welcome to <span className="text-signal">SHASHWAT_OS v2.6.0</span> — interactive shell.
    </Line>,
    <Line key="hint">
      Type <span className="text-cyan">help</span>, tap a command below, or hit{' '}
      <span className="text-cyan">fullscreen</span> to take this over your whole screen.
    </Line>,
  ])
  const [showMatrix, setShowMatrix] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputContainerRef = useRef<HTMLDivElement>(null)
  const { play } = useSound()
  const { cycleAccent } = useAccentTheme()

  useEffect(() => {
    // Scroll only the terminal's own output panel to its latest line —
    // scrollIntoView() on a sentinel element can bubble up and scroll the
    // whole page too, which is not what we want here.
    const el = outputContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [output])

  // Lock page scroll while the terminal owns the whole viewport
  useEffect(() => {
    document.body.style.overflow = fullscreen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [fullscreen])

  useEffect(() => {
    if (fullscreen) inputRef.current?.focus({ preventScroll: true })
  }, [fullscreen])

  useEffect(() => {
    if (!fullscreen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [fullscreen])

  const print = (...lines: ReactNode[]) => {
    setOutput((prev) => [...prev, ...lines.map((l, i) => <Line key={prev.length + i}>{l}</Line>)])
  }

  const runCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return
    setHistory((h) => [...h, raw])
    setHistoryIndex(-1)
    setOutput((prev) => [
      ...prev,
      <Line key={`in-${prev.length}`}>
        <span className="text-signal">guest@shashwat-os</span>
        <span className="text-ink-faint">:~$ </span>
        {raw}
      </Line>,
    ])

    switch (cmd) {
      case 'help':
        print(
          'Available commands:',
          ...TERMINAL_HELP.map((c) => (
            <span key={c.cmd}>
              <span className="text-cyan">{c.cmd.padEnd(12)}</span>
              <span className="text-ink-faint">{c.desc}</span>
            </span>
          ))
        )
        break
      case 'about':
        print(...ABOUT.paragraphs)
        break
      case 'skills':
        print(
          ...Object.entries(SKILLS).flatMap(([cat, list]) => [
            <span key={`${cat}-h`} className="text-signal">{cat}</span>,
            <span key={`${cat}-b`} className="text-ink-dim">{list.map((s) => s.name).join(' · ')}</span>,
          ])
        )
        break
      case 'projects':
        print(
          ...PROJECTS.map((p) => (
            <span key={p.id}>
              <span className="text-signal">{p.title}</span>
              <span className="text-ink-faint"> — {p.tagline}</span>
            </span>
          )),
          'Scroll to the Projects section above for full details, or run "hack" for fun.'
        )
        break
      case 'experience':
        print(
          ...EXPERIENCE.flatMap((e) => [
            <span key={`${e.role}-h`} className="text-signal">{`${e.role} — ${e.org}`}</span>,
            <span key={`${e.role}-b`} className="text-ink-faint">{e.period}</span>,
          ])
        )
        break
      case 'education':
        print(
          ...EDUCATION.map((e) => (
            <span key={e.degree}>
              {e.degree} — {e.institution} ({e.period}, {e.detail})
            </span>
          ))
        )
        break
      case 'contact':
        print(
          `Email: ${SITE.email}`,
          `Phone: ${SITE.phone}`,
          `GitHub: ${SITE.github}`,
          `LinkedIn: ${SITE.linkedin}`
        )
        break
      case 'github':
        print('Opening GitHub profile...')
        window.open(SITE.github, '_blank')
        break
      case 'linkedin':
        print('Opening LinkedIn profile...')
        window.open(SITE.linkedin, '_blank')
        break
      case 'resume':
        print('Downloading resume.pdf...')
        window.open(SITE.resumeUrl, '_blank')
        break
      case 'whoami':
        print('guest@shashwat-os — visitor, probably a recruiter, possibly a hacker.')
        break
      case 'sudo':
        print('Nice try. This session does not have root. Never will.')
        play('error')
        break
      case 'matrix':
        setShowMatrix(true)
        print('Entering the matrix... (press ESC or click to exit)')
        break
      case 'ascii':
        print(<pre className="text-signal text-[10px] sm:text-xs leading-tight">{ASCII_BANNER}</pre>)
        break
      case 'date':
        print(new Date().toDateString())
        break
      case 'time':
        print(new Date().toLocaleTimeString())
        break
      case 'joke':
        print(JOKES[Math.floor(Math.random() * JOKES.length)])
        break
      case 'coffee': {
        const levels = ['CRITICAL', 'LOW', 'ADEQUATE', 'OPTIMAL', 'OVERCLOCKED']
        print(`Coffee level: ${levels[Math.floor(Math.random() * levels.length)]}`)
        break
      }
      case 'music':
        print('♪ Playing synth arpeggio...')
        ;(['key', 'hover', 'success'] as const).forEach((k, i) => setTimeout(() => play(k), i * 160))
        break
      case 'hack': {
        print('Initiating fake hacking sequence for dramatic effect only...')
        const steps = [
          'Bypassing firewall... done',
          'Cracking encryption... done',
          'Rerouting through 14 proxies... done',
          'Accessing mainframe... done',
          'Just kidding. This is a portfolio, not a heist movie.',
        ]
        steps.forEach((s, i) => setTimeout(() => print(s), (i + 1) * 380))
        break
      }
      case 'theme': {
        const name = cycleAccent()
        print(`Accent color switched to: ${name}`)
        break
      }
      case 'fullscreen':
      case 'exit':
        setFullscreen((f) => !f)
        print(fullscreen ? 'Exiting full-screen shell.' : 'Entering full-screen shell. Press ESC to exit.')
        break
      case 'weather':
        print('SIMULATED FORECAST: 100% chance of shipping code today.')
        break
      case 'clear':
        setOutput([])
        break
      default:
        print(`Command not found: "${cmd}". Type "help" for a list of commands.`)
        play('error')
    }
  }

  const submit = (raw: string) => {
    runCommand(raw)
    setInput('')
    inputRef.current?.focus({ preventScroll: true })
  }

  const suggestions = useMemo(() => {
    if (!input.trim()) return []
    const q = input.trim().toLowerCase()
    return TERMINAL_HELP.filter((c) => c.cmd.startsWith(q) && c.cmd !== q).slice(0, 5)
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    play('key')
    if (e.key === 'Enter') {
      submit(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
      setHistoryIndex(nextIndex)
      setInput(history[nextIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      const nextIndex = historyIndex + 1
      if (nextIndex >= history.length) {
        setHistoryIndex(-1)
        setInput('')
      } else {
        setHistoryIndex(nextIndex)
        setInput(history[nextIndex])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const match = TERMINAL_HELP.find((c) => c.cmd.startsWith(input.toLowerCase()))
      if (match) setInput(match.cmd)
    }
  }

  const consoleBody = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 border-b border-hairline px-3 xs:px-4 py-2.5 xs:py-3 shrink-0">
        <button
          onClick={() => fullscreen && setFullscreen(false)}
          aria-label="Close full-screen"
          className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-alert/80 hover:bg-alert transition-colors"
        />
        <span className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-amber/80" />
        <button
          onClick={() => setFullscreen((f) => !f)}
          aria-label="Toggle full-screen"
          className="w-2.5 h-2.5 xs:w-3 xs:h-3 rounded-full bg-signal/80 hover:bg-signal transition-colors"
        />
        <span className="ml-2 xs:ml-3 font-mono text-[10px] xs:text-[11px] text-ink-faint truncate">
          guest@shashwat-os — zsh
        </span>
        <button
          onClick={() => setFullscreen((f) => !f)}
          className="ml-auto flex items-center gap-1.5 text-ink-faint hover:text-signal transition-colors font-mono text-[10px] tracking-wide shrink-0"
          data-cursor="link"
        >
          {fullscreen ? <FiMinimize2 size={12} /> : <FiMaximize2 size={12} />}
          <span className="hidden xs:inline">{fullscreen ? 'EXIT' : 'FULLSCREEN'}</span>
        </button>
      </div>

      <div
        ref={outputContainerRef}
        className={`flex-1 min-h-0 p-3 xs:p-4 sm:p-6 overflow-y-auto overflow-x-hidden font-mono text-[11px] xs:text-xs sm:text-sm space-y-1.5 text-ink-dim ${
          fullscreen ? '' : 'h-[300px] xs:h-[360px] sm:h-[420px]'
        }`}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
      >
        {output}

        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {suggestions.map((s) => (
              <button
                key={s.cmd}
                onClick={() => submit(s.cmd)}
                className="text-[10px] xs:text-[11px] font-mono border border-hairline text-cyan px-2 py-0.5 hover:border-cyan transition-colors"
              >
                {s.cmd}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 pt-1">
          <span className="text-signal shrink-0">guest@shashwat-os</span>
          <span className="text-ink-faint shrink-0">:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 min-w-0 bg-transparent outline-none text-ink"
            aria-label="Terminal input"
          />
          <span className="w-2 h-4 bg-signal animate-pulse shrink-0" />
        </div>
      </div>

      <div className="shrink-0 border-t border-hairline px-3 xs:px-4 py-2.5 xs:py-3 flex flex-wrap gap-1.5 xs:gap-2">
        {QUICK_COMMANDS.map((c) => (
          <button
            key={c}
            onClick={() => submit(c)}
            className="text-[10px] xs:text-[11px] font-mono px-2.5 py-1 border border-hairline text-ink-dim hover:border-signal hover:text-signal transition-colors"
            data-cursor="link"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <section id="terminal" className="relative py-20 sm:py-32 px-4 xs:px-5 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index="02"
          eyebrow="Interactive"
          title="System Terminal"
          description='A real shell. Tap a command below, try "help" or "hack", or press Tab to autocomplete.'
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="panel-glass clip-corner overflow-hidden h-[480px] xs:h-[520px] sm:h-[560px]"
        >
          {fullscreen ? (
            <div className="flex items-center justify-center h-full font-mono text-xs text-ink-faint">
              Terminal is currently full-screen — press ESC to bring it back here.
            </div>
          ) : (
            consoleBody
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[500] bg-void/95 backdrop-blur-sm p-3 xs:p-6 sm:p-10"
          >
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="panel-glass clip-corner overflow-hidden h-full max-w-6xl mx-auto"
            >
              {consoleBody}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showMatrix && <MatrixRain onClose={() => setShowMatrix(false)} />}
    </section>
  )
}

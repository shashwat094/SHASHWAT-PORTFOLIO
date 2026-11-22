import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageCircle, FiX, FiSend, FiExternalLink, FiZap } from 'react-icons/fi'
import {
  SITE, ABOUT, SKILLS, PROJECTS, EXPERIENCE, EDUCATION, SERVICES,
} from '@/data/content'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useSound } from '@/context/SoundContext'

type Sender = 'bot' | 'user'
interface Message {
  id: number
  sender: Sender
  content: ReactNode
}

const SECTION_INTROS: Record<string, string> = {
  hero: "You're at the top — this is Shashwat's introduction and the fastest ways to reach him.",
  about: "You're on the About section — his background, what he's actually shipped, and how he works.",
  terminal: "This is the interactive terminal — a real, working command shell. Try typing help in it, or tap a command chip.",
  skills: "You're looking at Skills — grouped by how he actually uses them, not just a logo wall.",
  projects: "You're on Projects — real, shipped systems, including Nova, the assistant this chat is a small preview of.",
  experience: "This is Experience — his work history, most recently as a Data Entry Operator and as founder of ChitrakootDhamTour.",
  education: "You're on Education — his BCA (2023–2026) at SICS, affiliated with Makhanlal Chaturvedi National University, and he's now pursuing an MCA (2026–2028) at JRD State University, Chitrakoot.",
  services: "This is what he offers if you're hiring or contracting — full-stack web, mobile, dashboards, and business sites.",
  testimonials: "These are a few words from people he's actually worked with.",
  achievements: "A few numbers that summarize the work so far.",
  github: "Live GitHub activity, pulled straight from the API — not a static screenshot.",
  contact: "You're on Contact — the form works even without a mail client configured, or email him directly.",
}

const TOPICS = [
  { key: 'about', label: 'About Shashwat' },
  { key: 'projects', label: 'Projects' },
  { key: 'novaai', label: 'Nova AI' },
  { key: 'skills', label: 'Skills' },
  { key: 'experience', label: 'Experience' },
  { key: 'education', label: 'Education' },
  { key: 'contact', label: 'Contact' },
  { key: 'resume', label: 'Resume' },
]

const KEYWORDS: Record<string, string[]> = {
  about: ['about', 'who', 'background', 'bio', 'yourself', 'shashwat'],
  projects: ['project', 'built', 'work', 'portfolio', 'apps', 'shipped'],
  novaai: ['nova', 'ai', 'bot', 'assistant', 'chatbot', 'agent'],
  skills: ['skill', 'stack', 'tech', 'language', 'tools', 'know'],
  experience: ['experience', 'job', 'work history', 'career', 'employ'],
  education: ['education', 'college', 'degree', 'bca', 'university', 'study'],
  contact: ['contact', 'email', 'reach', 'hire', 'phone', 'talk'],
  resume: ['resume', 'cv', 'download'],
  services: ['service', 'freelance', 'offer', 'hire'],
}

let idCounter = 0
function nextId() {
  idCounter += 1
  return idCounter
}

function bubble(sender: Sender, content: ReactNode): Message {
  return { id: nextId(), sender, content }
}

function respond(topic: string): ReactNode {
  switch (topic) {
    case 'about':
      return (
        <>
          <p className="mb-2">{ABOUT.paragraphs[0]}</p>
          <p>{ABOUT.paragraphs[1]}</p>
        </>
      )
    case 'projects':
      return (
        <div className="space-y-2">
          <p>Here's what he's actually shipped:</p>
          <ul className="space-y-1.5">
            {PROJECTS.slice(0, 4).map((p) => (
              <li key={p.id}>
                <span className="font-semibold text-ink">{p.title}</span>
                <span className="text-ink-faint"> — {p.tagline}</span>
              </li>
            ))}
          </ul>
          <p className="text-ink-faint text-xs">Scroll to the Projects section above for the full list and details.</p>
        </div>
      )
    case 'novaai': {
      const nova = PROJECTS.find((p) => p.id === 'nova-ai')
      return (
        <div className="space-y-2">
          <p>
            Nova is Shashwat's production AI assistant — {nova?.description}
          </p>
          <a
            href={SITE.novaUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-signal hover:underline text-xs font-medium"
          >
            Try the full Nova <FiExternalLink size={11} />
          </a>
          <p className="text-ink-faint text-xs">
            (I'm just a small, scripted preview of the idea — built to work without a backend on this static site.)
          </p>
        </div>
      )
    }
    case 'skills':
      return (
        <div className="space-y-1.5">
          {Object.entries(SKILLS).map(([cat, list]) => (
            <p key={cat}>
              <span className="font-semibold text-ink">{cat}: </span>
              <span className="text-ink-faint">{list.map((s) => s.name).join(', ')}</span>
            </p>
          ))}
        </div>
      )
    case 'experience':
      return (
        <div className="space-y-2">
          {EXPERIENCE.map((e) => (
            <p key={e.role}>
              <span className="font-semibold text-ink">{e.role}</span>
              <span className="text-ink-faint"> — {e.org} ({e.period})</span>
            </p>
          ))}
        </div>
      )
    case 'education':
      return (
        <div className="space-y-1">
          {EDUCATION.map((e) => (
            <p key={e.degree}>
              {e.degree} — {e.institution}, {e.period} ({e.detail})
            </p>
          ))}
        </div>
      )
    case 'services':
      return (
        <ul className="space-y-1.5">
          {SERVICES.map((s) => (
            <li key={s.title}>
              <span className="font-semibold text-ink">{s.title}</span>
              <span className="text-ink-faint"> — {s.description}</span>
            </li>
          ))}
        </ul>
      )
    case 'contact':
      return (
        <div className="space-y-1">
          <p>Best ways to reach him:</p>
          <p className="text-ink">{SITE.email}</p>
          <p className="text-ink">{SITE.phone}</p>
          <p className="text-ink-faint text-xs">Or use the Contact form near the bottom of the page.</p>
        </div>
      )
    case 'resume':
      return (
        <div className="space-y-2">
          <p>Here's his resume, ready to download.</p>
          <a
            href={SITE.resumeUrl}
            download
            className="inline-flex items-center gap-1.5 text-signal hover:underline text-xs font-medium"
          >
            Download resume.pdf <FiExternalLink size={11} />
          </a>
        </div>
      )
    default:
      return (
        <p>
          I'm not sure about that one — I only know what's on this page. Try asking about his{' '}
          <span className="text-ink">projects</span>, <span className="text-ink">skills</span>,{' '}
          <span className="text-ink">experience</span>, or how to <span className="text-ink">contact</span> him.
        </p>
      )
  }
}

function matchTopic(text: string): string {
  const q = text.toLowerCase()
  for (const [topic, words] of Object.entries(KEYWORDS)) {
    if (words.some((w) => q.includes(w))) return topic
  }
  return 'unknown'
}

export default function NovaBot() {
  const [open, setOpen] = useState(false)
  const [hasPinged, setHasPinged] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const activeSection = useActiveSection()
  const lastIntroRef = useRef<string | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const { play } = useSound()

  // Gentle one-time nudge after a few seconds if the visitor hasn't opened it yet
  useEffect(() => {
    const t = setTimeout(() => setHasPinged(true), 6000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!open) return
    if (messages.length === 0) {
      setMessages([
        bubble(
          'bot',
          <>
            Hi, I'm <span className="font-semibold text-ink">Nova</span> — a small, scripted guide to this
            page (and a preview of Shashwat's real AI agent). {SECTION_INTROS[activeSection] ?? ''}
          </>
        ),
      ])
      lastIntroRef.current = activeSection
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  // If the visitor scrolls to a meaningfully different section while the chat is open,
  // let Nova mention it once — without repeating for the same section twice in a row.
  useEffect(() => {
    if (!open) return
    if (lastIntroRef.current === activeSection) return
    lastIntroRef.current = activeSection
    const intro = SECTION_INTROS[activeSection]
    if (!intro) return
    setMessages((prev) => [...prev, bubble('bot', intro)])
  }, [activeSection, open])

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const ask = (topic: string, label: string) => {
    play('key')
    setMessages((prev) => [...prev, bubble('user', label)])
    setTimeout(() => {
      setMessages((prev) => [...prev, bubble('bot', respond(topic))])
    }, 350)
  }

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    const topic = matchTopic(text)
    setMessages((prev) => [...prev, bubble('user', text)])
    setInput('')
    setTimeout(() => {
      setMessages((prev) => [...prev, bubble('bot', respond(topic))])
    }, 350)
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => {
          setOpen((o) => !o)
          setHasPinged(false)
        }}
        className="fixed bottom-5 right-5 xs:bottom-6 xs:right-6 z-[400] w-14 h-14 rounded-full bg-signal text-void shadow-glow-md flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Open Nova, the site guide"
        data-cursor="link"
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
        {!open && hasPinged && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-alert animate-pulse-slow" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 xs:right-6 z-[400] w-[calc(100vw-2.5rem)] xs:w-[360px] max-h-[70vh] panel-glass clip-corner overflow-hidden flex flex-col shadow-glow-md"
          >
            <div className="flex items-center gap-2.5 border-b border-hairline px-4 py-3 shrink-0">
              <div className="w-8 h-8 rounded-full bg-signal/15 border border-signal/30 flex items-center justify-center text-signal">
                <FiZap size={15} />
              </div>
              <div className="min-w-0">
                <p className="font-display text-sm font-semibold text-ink leading-tight">Nova</p>
                <p className="text-[10px] text-ink-faint leading-tight truncate">Site guide · scripted preview</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto text-ink-faint hover:text-ink transition-colors"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>

            <div ref={bodyRef} className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3 text-[13px] leading-relaxed">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 ${
                      m.sender === 'user'
                        ? 'bg-signal text-void'
                        : 'bg-panel-raised text-ink-dim border border-hairline'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="shrink-0 border-t border-hairline px-3 py-2.5 flex flex-wrap gap-1.5">
              {TOPICS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => ask(t.key, t.label)}
                  className="text-[10.5px] font-mono px-2.5 py-1 rounded-full border border-hairline text-ink-dim hover:border-signal hover:text-signal transition-colors"
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="shrink-0 border-t border-hairline p-2.5 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about projects, skills, contact..."
                className="flex-1 min-w-0 bg-void-soft border border-hairline focus:border-signal outline-none rounded-lg px-3 py-2 text-xs text-ink transition-colors"
              />
              <button
                onClick={handleSend}
                aria-label="Send"
                className="w-9 h-9 shrink-0 rounded-lg bg-signal text-void flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <FiSend size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

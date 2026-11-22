import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiInstagram,
  FiCopy, FiCheck, FiExternalLink, FiCheckCircle, FiAlertCircle, FiX,
} from 'react-icons/fi'
import { SITE } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'
import MagneticButton from '@/components/ui/MagneticButton'

type Status = 'idle' | 'sending' | 'ready' | 'error'
type Toast = { kind: 'success' | 'error'; text: string } | null

const WEB3FORMS_CONFIGURED = SITE.web3formsKey !== 'YOUR_WEB3FORMS_ACCESS_KEY'

function buildMailto(name: string, email: string, message: string) {
  const subject = `Portfolio contact from ${name}`
  const body = `${message}\n\n— ${name} (${email})`
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState<'message' | 'email' | null>(null)
  const [toast, setToast] = useState<Toast>(null)

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4500)
    return () => clearTimeout(t)
  }, [toast])

  const validate = () => {
    const next: Partial<typeof form> = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    if (form.message.trim().length < 10) next.message = 'Message should be at least 10 characters'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    if (!WEB3FORMS_CONFIGURED) {
      // No delivery key configured yet — still give a real, guaranteed way
      // to reach out instead of silently failing.
      setStatus('ready')
      setToast({ kind: 'success', text: 'Message ready — pick how to send it below.' })
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: SITE.web3formsKey,
          subject: `Portfolio contact from ${form.name}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setToast({ kind: 'success', text: "Message sent! I'll get back to you soon." })
        setForm({ name: '', email: '', message: '' })
        setStatus('idle')
      } else {
        throw new Error(data.message || 'Delivery failed')
      }
    } catch {
      setStatus('error')
      setToast({ kind: 'error', text: "Couldn't send that — try the direct email option below." })
    }
  }

  const copyToClipboard = async (text: string, which: 'message' | 'email') => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(which)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // Clipboard API unavailable — the mailto / text is still visible to copy manually
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-32 px-4 xs:px-5 sm:px-8">
      {/* Popup confirmation toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 sm:top-24 left-1/2 -translate-x-1/2 z-[600] w-[calc(100vw-2rem)] max-w-sm"
          >
            <div
              className={`panel-glass clip-corner flex items-start gap-3 px-4 py-3 shadow-glow-md ${
                toast.kind === 'success' ? 'border-signal/50' : 'border-alert/50'
              }`}
            >
              {toast.kind === 'success' ? (
                <FiCheckCircle className="text-signal shrink-0 mt-0.5" size={18} />
              ) : (
                <FiAlertCircle className="text-alert shrink-0 mt-0.5" size={18} />
              )}
              <p className="text-sm text-ink flex-1">{toast.text}</p>
              <button onClick={() => setToast(null)} className="text-ink-faint hover:text-ink transition-colors shrink-0">
                <FiX size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index="11"
          eyebrow="Let's Talk"
          title="Contact"
          description="Open to internships and full-time roles — reach out through the form or directly."
        />

        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {[
              { icon: FiMail, label: SITE.email, href: `mailto:${SITE.email}` },
              { icon: FiPhone, label: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
              { icon: FiMapPin, label: SITE.location, href: undefined },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-11 h-11 flex items-center justify-center border border-signal/40 text-signal shrink-0">
                  <item.icon size={18} />
                </div>
                {item.href ? (
                  <a href={item.href} className="text-ink-dim hover:text-signal transition-colors text-sm" data-cursor="link">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-ink-dim text-sm">{item.label}</span>
                )}
              </div>
            ))}

            <div className="flex gap-4 pt-4">
              <a href={SITE.github} target="_blank" rel="noreferrer" className="text-ink-dim hover:text-signal transition-colors text-xl" data-cursor="link">
                <FiGithub />
              </a>
              <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-ink-dim hover:text-signal transition-colors text-xl" data-cursor="link">
                <FiInstagram />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="panel-glass clip-corner p-5 xs:p-6 sm:p-8"
          >
            {status === 'ready' ? (
              <div className="space-y-5">
                <div>
                  <p className="font-display text-lg font-semibold text-ink mb-1">Your message is ready</p>
                  <p className="text-xs text-ink-dim leading-relaxed">
                    Pick whichever of these actually works on your device — both send the exact same message.
                  </p>
                </div>

                <a
                  href={buildMailto(form.name, form.email, form.message)}
                  className="btn-neon w-full flex items-center justify-center gap-2"
                  data-cursor="link"
                >
                  <FiExternalLink /> Open in Email App
                </a>

                <button
                  type="button"
                  onClick={() => copyToClipboard(`${form.message}\n\n— ${form.name} (${form.email})`, 'message')}
                  className="btn-ghost w-full flex items-center justify-center gap-2"
                  data-cursor="link"
                >
                  {copied === 'message' ? <FiCheck /> : <FiCopy />}
                  {copied === 'message' ? 'Copied — paste it anywhere' : 'Copy Message Instead'}
                </button>

                <div className="flex items-center justify-between border-t border-hairline pt-4 text-xs">
                  <span className="text-ink-faint">Or email me directly:</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(SITE.email, 'email')}
                    className="flex items-center gap-1.5 text-signal hover:text-cyan transition-colors font-mono"
                  >
                    {copied === 'email' ? <FiCheck size={12} /> : <FiCopy size={12} />}
                    {SITE.email}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-xs text-ink-faint hover:text-ink-dim transition-colors underline"
                >
                  ← Back to the form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <label className="font-mono text-xs text-ink-dim mb-1.5 block">Name</label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-void-soft border border-hairline focus:border-signal outline-none px-3 py-2.5 text-sm text-ink transition-colors rounded-lg"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-alert text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="font-mono text-xs text-ink-dim mb-1.5 block">Email</label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-void-soft border border-hairline focus:border-signal outline-none px-3 py-2.5 text-sm text-ink transition-colors rounded-lg"
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-alert text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="font-mono text-xs text-ink-dim mb-1.5 block">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    className="w-full bg-void-soft border border-hairline focus:border-signal outline-none px-3 py-2.5 text-sm text-ink transition-colors resize-none rounded-lg"
                    placeholder="What are you looking to build?"
                  />
                  {errors.message && <p className="text-alert text-xs mt-1">{errors.message}</p>}
                </div>

                <MagneticButton
                  type="submit"
                  className="btn-neon w-full flex items-center justify-center gap-2"
                  disabled={status === 'sending'}
                >
                  <FiSend />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </MagneticButton>

                {status === 'error' && (
                  <p className="text-alert text-xs text-center">
                    Something went wrong sending that — email me directly at {SITE.email} instead.
                  </p>
                )}
                <p className="text-ink-faint text-[11px] text-center">
                  Prefer email? Reach me directly at{' '}
                  <a href={`mailto:${SITE.email}`} className="text-cyan hover:underline">
                    {SITE.email}
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

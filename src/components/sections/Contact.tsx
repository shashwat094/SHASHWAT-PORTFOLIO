import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FiMail, FiPhone, FiMapPin, FiSend, FiGithub, FiLinkedin, FiCopy, FiCheck, FiExternalLink } from 'react-icons/fi'
import { SITE } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'
import MagneticButton from '@/components/ui/MagneticButton'

type Status = 'idle' | 'sending' | 'ready' | 'sent' | 'error'

const EMAILJS_CONFIGURED =
  SITE.emailjs.serviceId !== 'YOUR_EMAILJS_SERVICE_ID' &&
  SITE.emailjs.templateId !== 'YOUR_EMAILJS_TEMPLATE_ID' &&
  SITE.emailjs.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY'

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

    if (!EMAILJS_CONFIGURED) {
      // No backend configured yet — hand the visitor a guaranteed way to
      // actually reach out instead of silently trying (and possibly failing)
      // to open a mail client with no visible feedback either way.
      setStatus('ready')
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(
        SITE.emailjs.serviceId,
        SITE.emailjs.templateId,
        { from_name: form.name, from_email: form.email, message: form.message },
        SITE.emailjs.publicKey
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
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
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          index="11"
          eyebrow="Let's Talk"
          title="Contact"
          description="Open to internships and freelance work — reach out through the form or directly."
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
              <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="text-ink-dim hover:text-signal transition-colors text-xl" data-cursor="link">
                <FiLinkedin />
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
                    This site doesn't run its own mail server, so pick whichever of these actually works on
                    your device — both send the exact same message.
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
                    className="w-full bg-void-soft border border-hairline focus:border-signal outline-none px-3 py-2.5 text-sm text-ink transition-colors"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-alert text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="font-mono text-xs text-ink-dim mb-1.5 block">Email</label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-void-soft border border-hairline focus:border-signal outline-none px-3 py-2.5 text-sm text-ink transition-colors"
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
                    className="w-full bg-void-soft border border-hairline focus:border-signal outline-none px-3 py-2.5 text-sm text-ink transition-colors resize-none"
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

                {status === 'sent' && (
                  <p className="text-signal text-xs text-center">Message sent — I'll get back to you soon.</p>
                )}
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

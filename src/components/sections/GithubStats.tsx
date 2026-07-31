import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FiGithub, FiUsers, FiBook, FiStar } from 'react-icons/fi'
import { SITE } from '@/data/content'
import SectionHeading from '@/components/ui/SectionHeading'

interface GhUser {
  public_repos: number
  followers: number
  following: number
  avatar_url: string
  html_url: string
  created_at: string
}
interface GhRepo {
  name: string
  html_url: string
  stargazers_count: number
  language: string | null
  description: string | null
}

export default function GithubStats() {
  const [user, setUser] = useState<GhUser | null>(null)
  const [repos, setRepos] = useState<GhRepo[]>([])
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${SITE.githubUsername}`),
          fetch(`https://api.github.com/users/${SITE.githubUsername}/repos?sort=updated&per_page=6`),
        ])
        if (!uRes.ok) throw new Error('user not found')
        const uData = await uRes.json()
        const rData = rRes.ok ? await rRes.json() : []
        if (!cancelled) {
          setUser(uData)
          setRepos(Array.isArray(rData) ? rData : [])
          setStatus('ok')
        }
      } catch {
        if (!cancelled) setStatus('error')
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section id="github" className="relative py-20 sm:py-32 px-4 xs:px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="10"
          eyebrow="Live Data"
          title="GitHub Activity"
          description="Pulled live from the GitHub REST API — not a static screenshot."
        />

        {status === 'error' && (
          <div className="panel-glass clip-corner p-8 text-center">
            <FiGithub className="mx-auto text-signal mb-3" size={28} />
            <p className="text-sm text-ink-dim mb-1">
              Couldn't reach the GitHub API for <span className="text-signal">@{SITE.githubUsername}</span> right now.
            </p>
            <a href={SITE.github} target="_blank" rel="noreferrer" className="text-cyan text-sm underline">
              View profile directly →
            </a>
          </div>
        )}

        {status === 'loading' && (
          <div className="panel-glass clip-corner p-8 text-center font-mono text-xs text-ink-faint">
            Fetching live GitHub data...
          </div>
        )}

        {status === 'ok' && user && (
          <>
            <div className="grid sm:grid-cols-3 gap-5 mb-8">
              {[
                { icon: FiBook, label: 'Public Repos', value: user.public_repos },
                { icon: FiUsers, label: 'Followers', value: user.followers },
                { icon: FiStar, label: 'Following', value: user.following },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="panel-glass clip-corner p-6 flex items-center gap-4"
                >
                  <s.icon className="text-signal" size={22} />
                  <div>
                    <p className="font-display text-2xl font-bold text-ink">{s.value}</p>
                    <p className="text-xs text-ink-faint">{s.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {repos.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="panel-glass clip-corner p-5 hover:border-signal/50 transition-colors"
                    data-cursor="link"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-mono text-sm text-signal truncate">{repo.name}</p>
                      <span className="flex items-center gap-1 text-[11px] text-amber">
                        <FiStar size={11} /> {repo.stargazers_count}
                      </span>
                    </div>
                    <p className="text-xs text-ink-dim line-clamp-2 mb-2">
                      {repo.description || 'No description provided.'}
                    </p>
                    {repo.language && (
                      <span className="text-[10px] font-mono text-cyan">{repo.language}</span>
                    )}
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

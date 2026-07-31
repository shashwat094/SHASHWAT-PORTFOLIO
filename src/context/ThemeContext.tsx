import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export const ACCENTS = [
  { name: 'periwinkle', signal: '#8ca8f0', dim: '#5470b8' },
  { name: 'teal', signal: '#6fd1c8', dim: '#3d8f88' },
  { name: 'violet', signal: '#b39df0', dim: '#7259b8' },
  { name: 'azure', signal: '#7c9ce8', dim: '#4a68b0' },
  { name: 'amber', signal: '#eabd7c', dim: '#a8813f' },
  { name: 'rose', signal: '#e8798c', dim: '#a84a5c' },
] as const

interface ThemeCtx {
  accentIndex: number
  accentName: string
  cycleAccent: () => string
}

const ThemeContext = createContext<ThemeCtx | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accentIndex, setAccentIndex] = useState(0)

  const applyAccent = useCallback((index: number) => {
    const accent = ACCENTS[index]
    const root = document.documentElement
    root.style.setProperty('--color-signal', accent.signal)
    root.style.setProperty('--color-signal-dim', accent.dim)
  }, [])

  const cycleAccent = useCallback(() => {
    let next = 0
    setAccentIndex((prev) => {
      next = (prev + 1) % ACCENTS.length
      applyAccent(next)
      return next
    })
    return ACCENTS[next]?.name ?? ACCENTS[0].name
  }, [applyAccent])

  const value = useMemo(
    () => ({ accentIndex, accentName: ACCENTS[accentIndex].name, cycleAccent }),
    [accentIndex, cycleAccent]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useAccentTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useAccentTheme must be used within ThemeProvider')
  return ctx
}

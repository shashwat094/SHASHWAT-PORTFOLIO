import { createContext, useContext, type ReactNode } from 'react'
import { useSoundEngine } from '@/hooks/useSoundEngine'

const SoundContext = createContext<ReturnType<typeof useSoundEngine> | null>(null)

export function SoundProvider({ children }: { children: ReactNode }) {
  const engine = useSoundEngine()
  return <SoundContext.Provider value={engine}>{children}</SoundContext.Provider>
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used within SoundProvider')
  return ctx
}

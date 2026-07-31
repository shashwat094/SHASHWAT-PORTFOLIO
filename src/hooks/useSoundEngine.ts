import { useCallback, useRef, useState } from 'react'

export type SoundKind = 'key' | 'hover' | 'success' | 'error' | 'boot'

export function useSoundEngine() {
  const [enabled, setEnabled] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const Ctor = window.AudioContext || (window as any).webkitAudioContext
      ctxRef.current = new Ctor()
    }
    return ctxRef.current
  }, [])

  const play = useCallback(
    (kind: SoundKind) => {
      if (!enabled) return
      try {
        const ctx = getCtx()
        if (ctx.state === 'suspended') ctx.resume()
        const now = ctx.currentTime
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.connect(gain)
        gain.connect(ctx.destination)

        const presets: Record<SoundKind, { freq: number; type: OscillatorType; dur: number; vol: number }> = {
          key: { freq: 880, type: 'square', dur: 0.045, vol: 0.03 },
          hover: { freq: 1200, type: 'sine', dur: 0.03, vol: 0.02 },
          success: { freq: 660, type: 'triangle', dur: 0.22, vol: 0.05 },
          error: { freq: 140, type: 'sawtooth', dur: 0.2, vol: 0.05 },
          boot: { freq: 220, type: 'square', dur: 0.35, vol: 0.04 },
        }
        const p = presets[kind]
        osc.type = p.type
        osc.frequency.setValueAtTime(p.freq, now)
        if (kind === 'success') osc.frequency.exponentialRampToValueAtTime(p.freq * 2, now + p.dur)
        if (kind === 'error') osc.frequency.exponentialRampToValueAtTime(p.freq * 0.6, now + p.dur)
        gain.gain.setValueAtTime(p.vol, now)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + p.dur)
        osc.start(now)
        osc.stop(now + p.dur + 0.02)
      } catch {
        // audio not available — fail silently
      }
    },
    [enabled, getCtx]
  )

  return { enabled, setEnabled, play }
}

import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, options: { duration?: number; start?: boolean } = {}) {
  const { duration = 1600, start = false } = options
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!start || startedRef.current) return
    startedRef.current = true

    const t0 = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [start, target, duration])

  return value
}

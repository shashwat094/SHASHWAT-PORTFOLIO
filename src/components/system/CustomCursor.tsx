import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hidden, setHidden] = useState(false)
  const [hoverState, setHoverState] = useState<'default' | 'link' | 'text'>('default')

  useEffect(() => {
    if (window.matchMedia('(hover: none), (max-width: 768px)').matches) {
      setHidden(true)
      return
    }

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: pos.x, y: pos.y }

    const move = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor="link"], input, textarea, select')
      const textish = target.closest('[data-cursor="text"], p, h1, h2, h3')
      setHoverState(interactive ? 'link' : textish ? 'text' : 'default')
    }

    let raf: number
    const tick = () => {
      ring.x += (pos.x - ring.x) * 0.18
      ring.y += (pos.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }

    const enter = () => {
      dotRef.current?.style.setProperty('opacity', '1')
      ringRef.current?.style.setProperty('opacity', '1')
    }
    const leave = () => {
      dotRef.current?.style.setProperty('opacity', '0')
      ringRef.current?.style.setProperty('opacity', '0')
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseenter', enter)
    document.addEventListener('mouseleave', leave)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseenter', enter)
      document.removeEventListener('mouseleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (hidden) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 transition-opacity duration-200"
        style={{ willChange: 'transform' }}
      >
        <div
          className="rounded-full bg-signal transition-all duration-150"
          style={{
            width: hoverState === 'link' ? 6 : 6,
            height: hoverState === 'link' ? 6 : 6,
            boxShadow: '0 0 8px var(--color-signal), 0 0 16px var(--color-signal)',
          }}
        />
      </div>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0 transition-opacity duration-200 rounded-full border"
        style={{
          willChange: 'transform',
          width: hoverState === 'link' ? 52 : hoverState === 'text' ? 36 : 28,
          height: hoverState === 'link' ? 52 : hoverState === 'text' ? 36 : 28,
          transition: 'width 0.2s ease-out, height 0.2s ease-out, opacity 0.2s ease, border-color 0.2s ease, background 0.2s ease',
          borderColor:
            hoverState === 'link' ? 'var(--color-signal)' : 'color-mix(in srgb, var(--color-signal) 50%, transparent)',
          background:
            hoverState === 'link' ? 'color-mix(in srgb, var(--color-signal) 8%, transparent)' : 'transparent',
        }}
      />
    </>
  )
}

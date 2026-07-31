import { useEffect, useRef } from 'react'

const CHARS = 'アイウエオカキクケコサシスセソ01234567890<>/{}[]#$%SHASHWAT'.split('')

export default function MatrixRain({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    const fontSize = 15
    let columns = Math.floor(width / fontSize)
    let drops = new Array(columns).fill(1)

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      columns = Math.floor(width / fontSize)
      drops = new Array(columns).fill(1)
    }
    window.addEventListener('resize', onResize)

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 6, 7, 0.15)'
      ctx.fillRect(0, 0, width, height)
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.fillStyle = Math.random() > 0.97 ? '#eafff2' : '#39ff9c'
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }

    const id = setInterval(draw, 42)
    return () => {
      clearInterval(id)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[300] bg-void cursor-pointer" onClick={onClose}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <p className="absolute top-4 right-6 font-mono text-[10px] text-ink-faint tracking-widest">
        CLICK OR PRESS ESC TO EXIT
      </p>
    </div>
  )
}

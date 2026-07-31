import { useRef, type ReactNode, type ButtonHTMLAttributes } from 'react'

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  strength?: number
}

export default function MagneticButton({ children, strength = 18, className, ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{ transition: 'transform 0.2s ease-out' }}
      data-cursor="link"
      {...rest}
    >
      {children}
    </button>
  )
}

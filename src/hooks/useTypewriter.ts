import { useEffect, useState } from 'react'

interface Options {
  typeSpeed?: number
  deleteSpeed?: number
  pauseTime?: number
}

export function useTypewriter(words: string[], options: Options = {}) {
  const { typeSpeed = 65, deleteSpeed = 35, pauseTime = 1600 } = options
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing')

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed)
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseTime)
      }
    } else if (phase === 'pausing') {
      timeout = setTimeout(() => setPhase('deleting'), 200)
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed)
      } else {
        setPhase('typing')
        setWordIndex((i) => (i + 1) % words.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, phase, wordIndex, words, typeSpeed, deleteSpeed, pauseTime])

  return text
}

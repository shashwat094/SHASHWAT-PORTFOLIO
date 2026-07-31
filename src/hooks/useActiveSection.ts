import { useEffect, useState } from 'react'

const SECTION_IDS = [
  'hero', 'about', 'terminal', 'skills', 'projects', 'experience',
  'education', 'services', 'testimonials', 'achievements', 'github', 'contact',
]

export function useActiveSection() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    )
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: '-15% 0px -35% 0px' }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}

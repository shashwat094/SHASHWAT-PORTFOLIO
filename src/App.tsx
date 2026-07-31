import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { SoundProvider } from '@/context/SoundContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { useLenis } from '@/hooks/useLenis'
import { useKonamiCode } from '@/hooks/useKonamiCode'

import BootLoader from '@/components/system/BootLoader'
import CustomCursor from '@/components/system/CustomCursor'
import Navbar from '@/components/system/Navbar'
import CommandPalette from '@/components/system/CommandPalette'
import NovaBot from '@/components/system/NovaBot'
import Footer from '@/components/sections/Footer'

import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Terminal from '@/components/sections/Terminal'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Education from '@/components/sections/Education'
import Services from '@/components/sections/Services'
import Testimonials from '@/components/sections/Testimonials'
import Achievements from '@/components/sections/Achievements'
import GithubStats from '@/components/sections/GithubStats'
import Contact from '@/components/sections/Contact'

const Background3D = lazy(() => import('@/components/system/Background3D'))

type Stage = 'boot' | 'site'

function MainSite() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  useLenis(true)

  useKonamiCode(
    useCallback(() => {
      confetti({ particleCount: 160, spread: 90, colors: ['#8ca8f0', '#6fd1c8', '#b39df0'], origin: { y: 0.4 } })
    }, [])
  )

  useEffect(() => {
    // Always start at the top of the page once the site mounts, regardless
    // of any leftover scroll position or URL fragment.
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((p) => !p)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="relative">
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>
      <CustomCursor />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <main className="relative">
        <Hero />
        <About />
        <Terminal />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Services />
        <Testimonials />
        <Achievements />
        <GithubStats />
        <Contact />
      </main>
      <Footer />
      <NovaBot />
    </div>
  )
}

export default function App() {
  const [stage, setStage] = useState<Stage>('boot')

  return (
    <SoundProvider>
      <ThemeProvider>
        {stage === 'boot' && <BootLoader onDone={() => setStage('site')} />}
        {stage === 'site' && <MainSite />}
      </ThemeProvider>
    </SoundProvider>
  )
}

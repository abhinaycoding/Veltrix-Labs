import { useRef } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ParticleBackground from '../components/ParticleBackground'
import HUD from '../components/HUD'
import CustomCursor from '../components/CustomCursor'
import Spotlight from '../components/Spotlight'
import CinematicOverlay from '../components/CinematicOverlay'
import Vision from '../components/Vision'
import ProductShowcase from '../components/ProductShowcase'
import Innovation from '../components/Innovation'
import Services from '../components/Services'
import Manifesto from '../components/Manifesto'
import Footer from '../components/Footer'
import CoreAnswers from '../components/CoreAnswers'

export default function Home() {
  const visionRef = useRef(null)

  const scrollToVision = () => {
    visionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="relative bg-black min-h-screen selection:bg-white/20 cursor-default md:cursor-none">
      <CinematicOverlay />
      
      {/* 3D Background Layer */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Interactive Flashlight Reveals */}
      <Spotlight />

      {/* Decorative HUD Layer */}
      <HUD />

      {/* Foreground Interactive Content */}
      <div className="relative z-10 flex flex-col">
        <Navbar />
        <Hero onEnterClick={scrollToVision} data-theme="dark" />
        
        <CoreAnswers data-theme="dark" />
        
        <div ref={visionRef} data-theme="dark">
          <Vision />
        </div>
        
        <Services data-theme="dark" />
        <Manifesto data-theme="light" />
        <ProductShowcase data-theme="dark" />
        <Innovation data-theme="dark" />
        <Footer />
      </div>

      {/* Interactive Cursor Layer */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>
    </main>
  )
}

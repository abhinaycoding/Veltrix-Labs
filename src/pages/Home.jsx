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
import Section3D from '../components/Section3D'

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
      <div className="relative z-10 flex flex-col perspective-[2000px] overflow-x-hidden">
        <Navbar />
        <Hero onEnterClick={scrollToVision} />
        
        <Section3D>
          <div ref={visionRef}>
            <Vision />
          </div>
        </Section3D>
        
        <Section3D>
          <Services />
        </Section3D>
        
        <Section3D>
          <Manifesto />
        </Section3D>
        
        <Section3D>
          <ProductShowcase />
        </Section3D>
        
        <Section3D>
          <Innovation />
        </Section3D>
        
        <Section3D>
          <Footer />
        </Section3D>
      </div>

      {/* Interactive Cursor Layer */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>
    </main>
  )
}

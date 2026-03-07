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
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials'

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
        <div data-theme="dark">
          <Hero onEnterClick={scrollToVision} />
        </div>
        
        <div data-theme="dark">
          <CoreAnswers />
        </div>
        
        <div id="about" ref={visionRef} data-theme="dark">
          <Vision />
        </div>
        
        <div data-theme="dark">
          <Services />
        </div>

        <div data-theme="light">
          <Manifesto />
        </div>

        <div id="products" data-theme="dark">
          <ProductShowcase />
        </div>

        <div data-theme="dark">
          <Testimonials />
        </div>

        <div data-theme="dark">
          <Innovation />
        </div>
        <div data-theme="dark">
          <FAQ />
        </div>
        <Footer />
      </div>

      {/* Interactive Cursor Layer */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>
    </main>
  )
}

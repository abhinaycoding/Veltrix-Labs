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
import StickySection from '../components/StickySection'

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
      <div className="relative z-10 flex flex-col overflow-x-hidden">
        <Navbar />
        
        {/* We use StickySection for the stacking effect. Hero is normal to allow organic scroll start. */}
        <div className="relative z-20 bg-black">
           <Hero onEnterClick={scrollToVision} />
        </div>
        
        <div ref={visionRef} className="relative z-10">
          <StickySection>
            <div className="w-full h-full overflow-y-auto hide-scrollbar">
              <Vision />
            </div>
          </StickySection>
        </div>
        
        <StickySection>
          <div className="w-full h-full overflow-y-auto hide-scrollbar bg-black/40 backdrop-blur-xl border-t border-white/5 rounded-t-[40px]">
             <Services />
          </div>
        </StickySection>
        
        <StickySection>
          <div className="w-full h-full overflow-y-auto hide-scrollbar bg-black/60 backdrop-blur-3xl border-t border-white/5 rounded-t-[40px]">
             <Manifesto />
          </div>
        </StickySection>
        
        <StickySection>
          <div className="w-full h-full overflow-y-auto hide-scrollbar bg-zinc-950 border-t border-white/5 rounded-t-[40px]">
             <ProductShowcase />
          </div>
        </StickySection>
        
        <StickySection>
          <div className="w-full h-full overflow-y-auto hide-scrollbar bg-black border-t border-white/5 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
             <Innovation />
          </div>
        </StickySection>
        
        <div className="relative z-50 bg-black rounded-t-[40px] pt-12 shadow-[0_-40px_100px_rgba(0,0,0,1)]">
          <Footer />
        </div>
      </div>

      {/* Interactive Cursor Layer */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>
    </main>
  )
}

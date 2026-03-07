import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import CTAButton from './CTAButton'
import MaskedText from './MaskedText'
import { useRef, useEffect, useState } from 'react'
import { siteContent } from '../data/content'
import Spline from '@splinetool/react-spline'

export default function Hero({ onEnterClick }) {
  const ref = useRef(null)
  
  // Mouse position tracking for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring smoothing for parallax
  const springConfig = { damping: 50, stiffness: 300 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Background Parallax Transforms (Mouse only)
  const bgX = useTransform(smoothMouseX, [-800, 800], [20, -20])
  const bgY = useTransform(smoothMouseY, [-400, 400], [20, -20])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      const x = clientX - innerWidth / 2
      const y = clientY - innerHeight / 2
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Spline loading state to ensure smooth transitions
  const [isSplineLoaded, setIsSplineLoaded] = useState(false)

  return (
    <section 
      ref={ref}
      style={{ position: 'relative' }}
      className="relative min-h-screen flex items-center justify-center select-none overflow-hidden"
    >
      {/* Interactive Spline 3D Scene */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black flex items-center justify-center pointer-events-none">
        <div style={{ willChange: 'opacity' }} className={`absolute inset-0 transition-opacity duration-[2500ms] ${isSplineLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <Spline 
            scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            onLoad={() => setIsSplineLoaded(true)}
            className="w-full h-full object-cover scale-[1.05]"
          />
        </div>
        
        {/* Fallback/Loader State */}
        {!isSplineLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-12 h-12 border-t border-[#ADFF2F] rounded-full animate-spin opacity-50" />
          </div>
        )}
        
        {/* Vignette Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black pointer-events-none" />
      </div>

      {/* Intense Center Neon Flare */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[60vw] h-[120vw] md:h-[60vw] rounded-full opacity-30 pointer-events-none mix-blend-screen"
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#ADFF2F_0%,_transparent_60%)] blur-[80px]" />
      </motion.div>

      {/* Soft Glow Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 flex items-center justify-center">
        <div className="w-[800px] h-[800px] radial-glow opacity-10 animate-pulse transition-opacity duration-1000" />
      </div>

      <div 
        className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center relative z-10"
      >
        {/* Cinematic Headline - Agency Brand */}
        <div className="mb-0 relative flex justify-center w-full z-20 flex-col items-center">
           <AnimatedHeading text={siteContent.hero.headline} />
        </div>

        {/* Subheadline */}
        <MaskedText delay={0.8}>
          <p className="text-white text-base md:text-xl font-medium uppercase tracking-[0.3em] mt-8 text-center max-w-2xl leading-relaxed text-shadow-glow">
            {siteContent.hero.subheadline}
          </p>
        </MaskedText>

        {/* Tactical Interface Lines */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.2 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          className="mt-4 flex items-center space-x-4"
        >
           <div className="h-[1px] w-12 bg-white origin-right" />
           <div className="w-1.5 h-1.5 border border-white rotate-45" />
           <div className="h-[1px] w-12 bg-white origin-left" />
        </motion.div>

        {/* CTA Launch - Dual Action */}
        <motion.div
           initial={{ opacity: 0, y: 30, scale: 0.9 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="mt-16 z-20 flex flex-col sm:flex-row items-center gap-6"
        >
          <CTAButton onClick={onEnterClick} text={siteContent.hero.ctaText} />
          
          <button 
            onClick={() => document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-3 px-8 py-5 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300"
          >
            <span className="font-heading font-bold tracking-[0.2em] uppercase text-xs">READ MANIFESTO</span>
          </button>
        </motion.div>
      </div>

      {/* Decorative Animated Lines */}
      <div className="absolute bottom-16 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
      <div className="absolute top-1/2 left-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent z-10 animate-pulse" />
    </section>
  )
}

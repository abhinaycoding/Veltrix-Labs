import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import AnimatedHeading from './AnimatedHeading'
import CTAButton from './CTAButton'
import MaskedText from './MaskedText'
import { useRef, useEffect, useState } from 'react'
import { siteContent } from '../data/content'
import Spline from '@splinetool/react-spline'
import { ArrowUpRight } from 'lucide-react'

export default function Hero({ onEnterClick }) {
  const ref = useRef(null)
  const [isSplineLoaded, setIsSplineLoaded] = useState(false)

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-start pt-32 md:pt-48 select-none overflow-hidden bg-black"
    >
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C5A059]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="mb-8 flex items-center gap-3 text-[10px] md:text-xs font-black tracking-[0.4em] uppercase text-[#C5A059]"
            >
              <div className="w-6 h-6 rounded-full border border-[#C5A059]/30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-pulse" />
              </div>
              <span>Engineering the Future // Est. 2024</span>
            </motion.div>

            <div className="relative">
               <AnimatedHeading text={siteContent.hero.headline} align="left" />
            </div>

            <MaskedText delay={0.8}>
              <p className="font-serif italic text-white/70 text-2xl md:text-3xl tracking-wide mt-6 max-w-xl leading-snug">
                {siteContent.hero.subheadline}
              </p>
            </MaskedText>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 1.2 }}
               className="mt-12 flex flex-col sm:flex-row items-center gap-8"
            >
              <CTAButton onClick={onEnterClick} text={siteContent.hero.ctaText} />
              <button 
                onClick={() => document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-4 text-white/40 hover:text-white transition-all duration-300"
              >
                <span className="font-heading font-black tracking-[0.3em] uppercase text-[10px]">PHILOSOPHY</span>
                <ArrowUpRight className="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Content - Visual Focal Point */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center pointer-events-none"
          >
            <div className="absolute inset-0 z-0 bg-black flex items-center justify-center overflow-hidden rounded-[40px]">
              <div style={{ willChange: 'opacity' }} className={`absolute inset-0 transition-opacity duration-[2500ms] ${isSplineLoaded ? 'opacity-30' : 'opacity-0'}`}>
                <Spline 
                  scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
                  onLoad={() => setIsSplineLoaded(true)}
                  className="w-full h-full object-cover"
                />
              </div>
              {!isSplineLoaded && (
                <div className="w-10 h-10 border-t border-[#C5A059] rounded-full animate-spin opacity-30" />
              )}
            </div>
            {/* Visual Frame Decor */}
            <div className="absolute -inset-4 border border-white/5 rounded-[60px] pointer-events-none" />
          </motion.div>
        </div>

        {/* Global Operations Indicator */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.4 }}
           transition={{ delay: 2 }}
           className="mt-24 mb-12 flex items-center gap-4"
        >
           <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
           <p className="text-[9px] font-black tracking-[0.8em] uppercase text-white/40">VELTRIX LABS // GLOBAL OPERATIONS</p>
           <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </motion.div>

        {/* Browser Preview Window */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="preview-window w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[21/7] max-w-6xl mx-auto"
        >
          <div className="preview-header">
            <div className="preview-dot bg-red-500/30" />
            <div className="preview-dot bg-yellow-500/30" />
            <div className="preview-dot bg-green-500/30" />
            <div className="ml-4 h-4 w-32 bg-white/5 rounded-full" />
          </div>
          <div className="p-8 md:p-12 h-full flex items-center justify-center">
             <div className="grid grid-cols-3 gap-8 w-full opacity-30 grayscale pointer-events-none">
                <div className="h-32 bg-white/5 rounded-xl animate-pulse" />
                <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-75" />
                <div className="h-32 bg-white/5 rounded-xl animate-pulse delay-150" />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
    </section>
  )
}

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import AnimatedHeading from './AnimatedHeading'
import CTAButton from './CTAButton'
import MaskedText from './MaskedText'
import { useRef, useEffect, useState } from 'react'
import { siteContent } from '../data/content'
import HeroIllustration from './HeroIllustration'
import { ArrowUpRight } from 'lucide-react'

export default function Hero({ onEnterClick }) {
  const ref = useRef(null)
  const [isSplineLoaded, setIsSplineLoaded] = useState(false)

  return (
    <section 
      ref={ref}
      className="relative min-h-[85vh] flex flex-col items-center justify-start pb-12 pt-24 md:pt-32 select-none overflow-hidden bg-black"
    >
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#ADFF2F]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-white/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Content */}
          <div className="flex flex-col items-start text-left">

            <div className="relative z-20">
               <AnimatedHeading text={siteContent.hero.headline} align="left" />
            </div>

            <MaskedText delay={0.8}>
              <p className="font-serif italic text-white/70 text-2xl md:text-3xl tracking-wide mt-6 max-w-xl leading-snug relative z-20">
                {siteContent.hero.subheadline}
              </p>
            </MaskedText>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 1.2 }}
               className="mt-8 flex flex-col sm:flex-row items-center gap-6"
            >
              <CTAButton onClick={onEnterClick} text={siteContent.hero.ctaText} />
              <button 
                onClick={() => document.getElementById('manifesto')?.scrollIntoView({ behavior: 'smooth' })}
                className="group flex items-center gap-4 text-white/40 hover:text-white transition-all duration-300"
              >
                <span className="font-heading font-black tracking-[0.3em] uppercase text-[10px]">PHILOSOPHY</span>
                <ArrowUpRight className="w-4 h-4 text-[#ADFF2F] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Content - SVG Illustration representing productivity & architecture */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-square lg:aspect-auto lg:h-[500px] flex items-center justify-center pointer-events-none mt-10 lg:mt-16"
          >
            <HeroIllustration />
          </motion.div>
        </div>

      </div>
    </section>
  )
}

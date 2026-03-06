import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import AnimatedHeading from './AnimatedHeading'
import CTAButton from './CTAButton'
import { useRef, useEffect } from 'react'
import { siteContent } from '../data/content'
import heroImg from '../assets/hero_bg.png'

export default function Hero({ onEnterClick }) {
  const ref = useRef(null)
  
  // Mouse position tracking for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring smoothing for parallax
  const springConfig = { damping: 50, stiffness: 300 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Background Parallax Transforms
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const scrollYParallax = useTransform(scrollYProgress, [0, 1], [0, 400])
  const combinedY = useTransform([scrollYParallax, bgY], ([s, m]) => s + m)
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  return (
    <section 
      ref={ref}
      style={{ position: 'relative' }}
      className="relative min-h-screen flex items-center justify-center select-none overflow-hidden"
    >
      {/* Premium Hero Background Image with Parallax */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <motion.img
          style={{ y: combinedY, x: bgX, scale: 1.15 }}
          src={heroImg}
          alt=""
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
      </div>

      {/* Soft Glow Ambient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 flex items-center justify-center">
        <div className="w-[800px] h-[800px] radial-glow opacity-10 animate-pulse transition-opacity duration-1000" />
      </div>

      <motion.div 
        style={{ y: textY, opacity, scale: scaleValue }}
        className="max-w-7xl mx-auto px-8 flex flex-col items-center text-center"
      >
        {/* Cinematic Headline - Agency Brand */}
        <div className="mb-0 relative flex justify-center w-full z-20 flex-col items-center">
           <AnimatedHeading text={siteContent.hero.headline} />
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-white/60 text-sm md:text-xl font-light uppercase tracking-[0.3em] mt-6 text-center max-w-2xl leading-relaxed"
        >
          {siteContent.hero.subheadline}
        </motion.p>

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

        {/* CTA Launch */}
        <motion.div
           initial={{ opacity: 0, y: 30, scale: 0.9 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="mt-16 z-20"
        >
          <CTAButton onClick={onEnterClick} text={siteContent.hero.ctaText} />
        </motion.div>
      </motion.div>

      {/* Decorative Animated Lines */}
      <div className="absolute bottom-16 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent z-10" />
      <div className="absolute top-1/2 left-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent z-10 animate-pulse" />
    </section>
  )
}

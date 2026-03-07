import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function AnimatedHeading({ text = "VELTRIX", align = "center" }) {
  const containerRef = useRef(null)
  
  // Mouse position for subtle 3D Depth
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 40, stiffness: 80, mass: 1 }
  const mouseSpringX = useSpring(mouseX, springConfig)
  const mouseSpringY = useSpring(mouseY, springConfig)
  
  // Very subtle perspective tilt for "Institutional Weight"
  const rotateX = useTransform(mouseSpringY, [-500, 500], [5, -5])
  const rotateY = useTransform(mouseSpringX, [-800, 800], [-8, 8])

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set(clientX - innerWidth / 2)
      mouseY.set(clientY - innerHeight / 2)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const characters = text.split('')

  const alignmentClasses = align === "left" ? "justify-start" : "justify-center text-center"
  const containerAlignment = align === "left" ? "items-start justify-start" : "items-center justify-center"

  return (
    <motion.div 
      ref={containerRef}
      className={`relative perspective-2000 py-6 px-0 flex w-full ${containerAlignment}`}
      style={{ rotateX, rotateY }}
    >
      <h1 className={`relative flex flex-wrap items-center gap-[0.02em] font-heading font-black text-[clamp(2.5rem,8vw,6.5rem)] tracking-tighter leading-[0.9] uppercase select-none ${alignmentClasses}`}>
        {characters.map((char, i) => (
          <div key={i} className="relative overflow-hidden inline-block py-2">
            <motion.span
              initial={{ 
                y: "110%",
                opacity: 0,
                rotateX: 45
              }}
              animate={{ 
                y: 0,
                opacity: 1,
                rotateX: 0
              }}
              transition={{
                duration: 1.8,
                delay: i * 0.04,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="inline-block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 will-change-transform"
              style={{ 
                width: char === ' ' ? '0.3em' : 'auto',
              }}
            >
              {char}
            </motion.span>
          </div>
        ))}
      </h1>

      {/* Internal Luminosity (Subtle Professional Glow) */}
      <motion.div 
        className="absolute inset-0 z-[-1] pointer-events-none blur-[100px] opacity-20"
        style={{
          background: `radial-gradient(circle at center, #C5A059 0%, transparent 60%)`,
          x: useTransform(mouseSpringX, x => x * 0.05),
          y: useTransform(mouseSpringY, y => y * 0.05),
        }}
      />
    </motion.div>
  )
}

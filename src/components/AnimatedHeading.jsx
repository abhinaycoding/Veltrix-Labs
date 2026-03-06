import { useState, useEffect, useRef } from 'react'
/* eslint-disable */
import { motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'

export default function AnimatedHeading({ text = "Launching Soon" }) {
  const containerRef = useRef(null)
  
  // Mouse position for 3D Tilt (Smoothed)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Velocity tracking for the "Liquid Stretch" effect
  const velX = useVelocity(mouseX)
  const velY = useVelocity(mouseY)
  
  // Smooth springs for motion
  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 }
  const mouseSpringX = useSpring(mouseX, springConfig)
  const mouseSpringY = useSpring(mouseY, springConfig)
  
  // Transform velocity into slight warping/skewing (Liquid feel)
  const skewX = useSpring(useTransform(velX, [-2000, 2000], [-15, 15]), springConfig)
  const scaleY = useSpring(useTransform(velY, [-2000, 2000], [0.9, 1.1]), springConfig)
  
  // Perspective Tilt
  const rotateX = useTransform(mouseSpringY, [0, 800], [8, -8])
  const rotateY = useTransform(mouseSpringX, [0, 1600], [-12, 12])

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const characters = text.split('')

  return (
    <motion.div 
      ref={containerRef}
      className="relative perspective-2000 py-10 md:py-20 px-4 md:px-10 flex items-center justify-center w-full"
      style={{ rotateX, rotateY, skewX, scaleY }}
    >
      {/* Soft Ethereal Glow Trail */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none blur-[120px] opacity-10"
        style={{
          background: `radial-gradient(circle at center, #ADFF2F, #00CED1, transparent 70%)`,
          x: useTransform(mouseSpringX, x => x * 0.1),
          y: useTransform(mouseSpringY, y => y * 0.1),
        }}
      />

      <h1 className="relative flex flex-nowrap items-center justify-center gap-[0.05em] font-heading font-black text-[clamp(2.5rem,10vw,8.5rem)] tracking-tight leading-none uppercase select-none">
        {characters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ 
              opacity: 0, 
              y: 80, 
              filter: 'blur(30px)',
              scale: 0.7,
              letterSpacing: '0.2em'
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              filter: 'blur(0px)',
              scale: 1,
              letterSpacing: '0.05em'
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.1,
              ease: [0.19, 1, 0.22, 1] // Extreme ease-out
            }}
            whileHover={{ 
              y: -8,
              scale: 1.05,
              filter: 'drop-shadow(0 0 60px rgba(173,255,47,0.6))',
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }}
            className="inline-block bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/30 drop-shadow-2xl"
            style={{ 
              width: char === ' ' ? '0.3em' : 'auto',
              // Dynamic weight/spacing based on mouse proximity could go here
            }}
          >
            {char}
          </motion.span>
        ))}
        
        {/* Mirror Reflection (Ultra-Smooth) */}
        <div className="absolute top-[105%] left-0 w-full opacity-10 blur-[2px] pointer-events-none scale-y-[-1] mask-gradient">
           <div className="flex justify-center gap-[0.05em]">
              {characters.map((char, i) => (
                <span key={i} style={{ width: char === ' ' ? '0.3em' : 'auto' }}>
                   {char}
                </span>
              ))}
           </div>
        </div>
      </h1>

      {/* Fluid Scan-Line (Soft) */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-30 opacity-20"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)',
          width: '200px',
        }}
        animate={{ 
          left: ['-20%', '120%'],
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </motion.div>
  )
}

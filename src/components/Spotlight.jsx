/* eslint-disable */
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Spotlight() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // High-stiffness springs for much faster, reactive spotlight movement
  const springX = useSpring(mouseX, { stiffness: 350, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 350, damping: 30 })

  const background = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(circle 600px at ${x}px ${y}px, rgba(255,255,255,0.03), transparent 80%)`
  )

  const borderMask = useTransform(
    [springX, springY],
    ([x, y]) => `radial-gradient(circle 400px at ${x}px ${y}px, black, transparent 80%)`
  )

  return (
    <>
      {/* Soft Ambient Cursor Spotlight */}
      <motion.div 
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ background }}
      />

      {/* Hidden Technical Grid revealed by cursor */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <motion.div 
          className="absolute inset-0"
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '4vw 4vw',
            maskImage: borderMask,
            WebkitMaskImage: borderMask
          }}
        />
      </div>
    </>
  )
}

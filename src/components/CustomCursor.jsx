/* eslint-disable */
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovering, setIsHovering] = useState(false)

  // Much tighter springs for incredibly fast, responsive cursor movement
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const innerSpringConfig = { damping: 20, stiffness: 600, mass: 0.2 }
  const innerSpringX = useSpring(mouseX, innerSpringConfig)
  const innerSpringY = useSpring(mouseY, innerSpringConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('button') ||
        e.target.classList.contains('interactive')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Small Dot */}
      <motion.div
        style={{
          x: innerSpringX,
          y: innerSpringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full z-[9999] pointer-events-none mix-blend-difference"
      />
      
      {/* Large Reacting Ring */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.3 : 0.6,
          borderWidth: isHovering ? '1px' : '2px',
        }}
        transition={{ type: 'spring', ...springConfig }}
        className="fixed top-0 left-0 w-8 h-8 border-white rounded-full z-[9998] pointer-events-none mix-blend-difference"
      />
    </>
  )
}

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Section3D({ children }) {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Deep-Space 3D Transforms
  // Entering: Submerged in depth, tilted up, faded
  // Active: Centered, flat, fully visible
  // Exiting: Submerged in depth, tilted down, faded
  
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0])
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [20, 0, 0, -20])
  const y = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [150, 0, 0, -150])

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        rotateX,
        y,
        transformStyle: 'preserve-3d'
      }}
      className="relative w-full will-change-transform"
    >
      {children}
    </motion.div>
  )
}

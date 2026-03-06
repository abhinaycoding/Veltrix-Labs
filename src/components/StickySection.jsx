import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function StickySection({ children }) {
  const ref = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  // Start perfectly flat (scale 1). 
  // As the user scrolls down (and this section sticks to the top),
  // it scales down slightly and fades into the background,
  // allowing the next section to smoothly scroll over it.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <div ref={ref} className="relative h-[120vh]">
      <motion.div
        style={{ scale, opacity }}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center will-change-transform bg-black origin-top"
      >
        {children}
      </motion.div>
    </div>
  )
}

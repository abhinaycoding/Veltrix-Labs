import { motion } from 'framer-motion'

export default function MaskedText({ children, className = "", delay = 0 }) {
  return (
    <div className={`overflow-hidden py-1 ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.2,
          delay: delay,
          ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier for premium feel
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

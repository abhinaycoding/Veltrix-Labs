import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { siteContent } from '../data/content'

export default function Manifesto() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Horizontal scroll effect
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2])

  return (
    <section 
      id="manifesto"
      ref={containerRef}
      className="min-h-screen relative w-full flex flex-col justify-center overflow-hidden bg-white text-black py-40 select-none"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-20 md:mb-40">
        <span className="text-[10px] font-black tracking-[0.8em] text-black/40 uppercase block mb-12">
           {siteContent.manifesto.title}
        </span>
        <p className="text-xl md:text-3xl lg:text-5xl font-bold leading-snug tracking-tight max-w-4xl text-black/80">
           {siteContent.manifesto.paragraph}
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex whitespace-nowrap">
        <motion.div 
          style={{ x, opacity }}
          className="flex space-x-12 md:space-x-32 px-6"
        >
          {siteContent.manifesto.statements.map((statement, idx) => (
             <div key={idx} className="flex items-center space-x-12 md:space-x-32">
                <h2 className="text-6xl md:text-[180px] font-black tracking-tighter uppercase text-black leading-none">
                  {statement}
                </h2>
                {/* Decorative Separator */}
                {idx !== siteContent.manifesto.statements.length - 1 && (
                  <div className="w-12 h-12 md:w-20 md:h-20 bg-[#ADFF2F] flex-shrink-0" />
                )}
             </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { siteContent } from '../data/content'

export default function CoreAnswers() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // A subtle parallax effect for the background text
  const yBg = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section 
      ref={containerRef}
      className="relative z-10 w-full bg-black py-24 md:py-40 px-6 md:px-12 overflow-hidden border-t border-white/5"
    >
      {/* Huge Background Text */}
      <motion.div 
        style={{ y: yBg }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] tracking-tighter whitespace-nowrap pointer-events-none select-none z-0"
      >
        THE ESSENTIALS
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {siteContent.coreAnswers.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col group relative"
            >
              {/* Question Number */}
              <div className="text-[10px] font-mono text-white/30 mb-6 tracking-[0.2em] flex items-center space-x-4">
                <span className="w-8 h-[1px] bg-white/10 group-hover:bg-[#ADFF2F]/50 transition-colors duration-500" />
                <span>0{index + 1}</span>
              </div>
              
              {/* The Question */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-6">
                {item.question}
              </h3>
              
              {/* The Answer */}
              <p 
                className="text-white/60 text-lg md:text-xl font-light leading-relaxed tracking-wide"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
              
              {/* Decorative line */}
              <div className="absolute -left-6 top-0 w-[1px] h-0 bg-gradient-to-b from-[#ADFF2F]/0 via-[#ADFF2F]/50 to-[#ADFF2F]/0 group-hover:h-full transition-all duration-700 ease-in-out hidden md:block" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

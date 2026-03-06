import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Brain, Network, Zap, Shield, Cpu, LayoutTemplate } from 'lucide-react'
import { siteContent } from '../data/content'

const IconMap = {
  Brain: Brain,
  Network: Network,
  Zap: Zap,
  Shield: Shield,
  Cpu: Cpu,
  LayoutTemplate: LayoutTemplate
}

export default function Services() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section 
      ref={containerRef}
      className="min-h-screen relative z-10 w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] py-32"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] bg-[#ADFF2F] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="mb-20 md:mb-32"
        >
          <span className="text-[10px] font-black tracking-[0.8em] text-[#ADFF2F] uppercase mb-6 block">
             {siteContent.services.title}
          </span>
          <h2 
            className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]"
            dangerouslySetInnerHTML={{ __html: siteContent.services.headline }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {siteContent.services.items.map((service, index) => {
            const Icon = IconMap[service.icon]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative p-8 md:p-10 rounded-2xl glass border border-white/5 hover:border-[#ADFF2F]/50 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.02]"
              >
                {/* Number Indicator */}
                <div className="absolute top-8 right-8 text-white/10 font-black text-2xl group-hover:text-[#ADFF2F]/20 transition-colors">
                  0{index + 1}
                </div>
                
                <div className="w-14 h-14 rounded-xl bg-white/5 mb-8 flex items-center justify-center border border-white/10 group-hover:border-[#ADFF2F]/30 transition-colors">
                  {Icon && <Icon className="w-6 h-6 text-white/50 group-hover:text-[#ADFF2F] transition-colors" />}
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-white/40 text-sm md:text-base leading-relaxed font-light">
                  {service.description}
                </p>

                {/* Hover line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ADFF2F] group-hover:w-full transition-all duration-500 ease-out rounded-b-2xl" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

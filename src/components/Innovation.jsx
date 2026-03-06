import { motion } from 'framer-motion'
import { Rocket, Cpu, Globe } from 'lucide-react'
import { siteContent } from '../data/content'

import innovationImg from '../assets/innovation.png'

// Mapping string names to actual Lucide component imports
const IconMap = {
  Cpu: Cpu,
  Globe: Globe,
  Rocket: Rocket
}

export default function Innovation() {
  const { innovation } = siteContent

  return (
    <section className="min-h-[80vh] md:min-h-screen py-20 md:py-32 px-6 md:px-10 relative z-10 max-w-7xl mx-auto w-full flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center w-full">
        {/* Text Content Block */}
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
        >
          <span className="text-[10px] font-black tracking-[0.8em] text-[#ADFF2F] uppercase mb-4 block">
             {innovation.title}
          </span>
          <h2 
            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 md:mb-10 w-full break-words"
            dangerouslySetInnerHTML={{ __html: innovation.headline }}
          />
          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed uppercase tracking-widest mb-12">
             {innovation.description}
          </p>
          
          <div className="space-y-8">
            {innovation.features.map((item, i) => {
              const Icon = typeof item.icon === 'string' ? IconMap[item.icon] : item.icon;
              return (
                <div key={i} className="flex items-start space-x-6 group">
                  <div className="w-12 h-12 rounded-xl glass border border-white/10 flex items-center justify-center group-hover:border-[#ADFF2F]/40 transition-colors">
                    {Icon && <Icon className="w-5 h-5 text-white/40 group-hover:text-[#ADFF2F] transition-colors" />}
                  </div>
                  <div>
                    <h4 className="text-white font-black tracking-widest text-[11px] mb-1">{item.label}</h4>
                    <p className="text-white/30 text-[10px] tracking-wider uppercase">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* High-Tech Generated Image */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
           whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5 }}
           className="relative aspect-square rounded-[40px] overflow-hidden glass border border-white/10"
        >
          <img 
            src={innovationImg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-black/30 pointer-events-none mix-blend-overlay" />
          
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { siteContent } from '../data/content'
import visionImg from '../assets/vision.png'
import MaskedText from './MaskedText'

export default function Vision() {
  const { vision } = siteContent

  return (
    <section className="min-h-screen py-32 px-6 md:px-10 flex flex-col items-center justify-center relative z-10 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center w-full">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] font-black tracking-[0.8em] text-[#f35520] uppercase mb-8 block">
             {vision.title}
          </span>
          <MaskedText>
            <h2 
              className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-12"
              dangerouslySetInnerHTML={{ __html: vision.headline }}
            />
          </MaskedText>
          
          <div className="max-w-2xl">
            <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed uppercase tracking-widest">
              {vision.description}
            </p>
          </div>

          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[1px] w-32 bg-[#f35520] mt-16 origin-left"
          />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
           whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5 }}
           className="relative aspect-[4/5] rounded-[40px] overflow-hidden glass border border-white/10"
        >
          <img 
            src={visionImg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
        </motion.div>
      </div>
    </section>
  )
}

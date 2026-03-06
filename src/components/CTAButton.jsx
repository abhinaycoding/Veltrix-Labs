import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Magnetic from './Magnetic'

export default function CTAButton({ onClick, text = "Enter Veltrix" }) {
  return (
    <Magnetic strength={40}>
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group px-10 py-5 rounded-full glass border border-white/10 overflow-hidden interactive"
      >
        {/* Outer Halo on Hover */}
        <div className="absolute inset-0 border border-white/20 rounded-full group-hover:border-white/40 transition-colors" />
        
        {/* Internal Glow Field */}
        <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-[#FFD700]/20 via-[#ADFF2F]/20 via-[#00CED1]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />

        {/* Button Content */}
        <div className="relative flex items-center gap-3 z-10">
          <span className="font-heading font-black tracking-[0.3em] uppercase text-sm text-white">
            {text}
          </span>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.button>
    </Magnetic>
  )
}

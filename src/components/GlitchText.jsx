import { motion } from 'framer-motion'

export default function GlitchText({ text, className }) {
  return (
    <div className={`relative inline-block ${className}`} data-text={text}>
      {/* Base Layer */}
      <span className="relative z-10 text-white">
        {text}
      </span>
      
      {/* RGB Glitch Layers */}
      <span className="absolute top-0 left-0 w-full h-full text-red-500/50 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-100 animate-[glitch-anim_0.2s_infinite] pointer-events-none">
        {text}
      </span>
      <span className="absolute top-0 left-0 w-full h-full text-cyan-500/50 mix-blend-screen opacity-0 group-hover:opacity-100 transition-opacity duration-100 animate-[glitch-anim_0.2s_infinite_reverse] pointer-events-none">
        {text}
      </span>
    </div>
  )
}

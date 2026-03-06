import { motion } from 'framer-motion'

export default function CinematicOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_120%)]" />
      
      {/* Dynamic Film Grain Layer */}
      <div className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none mix-blend-soft-light" />

      {/* Rhythmic Scanlines */}
      <div className="absolute inset-0 bg-scanlines opacity-[0.03] pointer-events-none" />

      {/* Global Grade Overlay (Blue/Teal Shadow Lean) */}
      <div className="absolute inset-0 bg-[#00CED1]/[0.02] pointer-events-none mix-blend-overlay" />
      
      {/* Edge Blur / Chromatic Ambience */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none" />
    </div>
  )
}

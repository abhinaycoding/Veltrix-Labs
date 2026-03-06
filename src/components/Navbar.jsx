import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Magnetic from './Magnetic'
import { Menu, X } from 'lucide-react'
import logoImg from '../assets/logo_original_user.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const links = ['Products', 'About', 'Contact']

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 flex justify-center pointer-events-none"
      >
        {/* The Liquid Cyber-Dock */}
        <motion.div 
          animate={{ 
            width: isScrolled ? 'auto' : '100%',
            maxWidth: isScrolled ? '700px' : '1200px',
            backgroundColor: isScrolled ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0)',
            backdropFilter: isScrolled ? 'blur(30px)' : 'blur(0px)',
            borderRadius: isScrolled ? '100px' : '0px',
            padding: isScrolled ? '8px 12px' : '16px 0',
            marginTop: isScrolled ? '12px' : '0px'
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 120, mass: 0.8 }}
          className="relative flex items-center justify-between w-full pointer-events-auto group/nav perspective-1000"
        >
          {/* Animated Border Gradient (Visible only when scrolled) */}
          {isScrolled && (
            <motion.div 
              layoutId="nav-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 rounded-[100px] p-[1px] animate-border-flow bg-gradient-to-r from-white/0 via-white/20 to-white/0 -z-10"
              style={{ maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)', maskComposite: 'exclude' }}
            />
          )}

          {/* Logo Section - Magnetic & Holographic */}
          <div className="flex-1 flex items-center pl-6">
            <Magnetic strength={15}>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center cursor-pointer group interactive h-12 w-32 relative overflow-hidden"
              >
                <img 
                  src={logoImg} 
                  alt="Veltrix Labs" 
                  className="absolute inset-0 w-full h-full object-contain scale-[2.2] mix-blend-screen brightness-150 contrast-125 transition-all group-hover:brightness-200"
                />
              </motion.div>
            </Magnetic>
          </div>

          {/* HUD Links - Minimalist & Interactive */}
          <div className="hidden md:flex space-x-1 items-center justify-center">
            {links.map((link, i) => (
              <Magnetic key={link} strength={20}>
                <motion.a
                  href={`#${link.toLowerCase()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.8 }}
                  className="relative px-6 py-2 group/link interactive"
                >
                  <span className="absolute left-1 text-white/0 group-hover/link:text-white/40 transition-all duration-300 hud-bracket">[</span>
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40 group-hover/link:text-white transition-all duration-300">
                    {link}
                  </span>
                  <span className="absolute right-1 text-white/0 group-hover/link:text-white/40 transition-all duration-300 hud-bracket">]</span>
                  
                  {/* Subtle underline glow */}
                  <motion.div 
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white opacity-0 group-hover/link:opacity-20 transition-all duration-500 group-hover/link:w-1/2"
                  />
                </motion.a>
              </Magnetic>
            ))}
          </div>

          {/* Startup CTA - Request Access */}
          <div className="flex-1 flex items-center justify-end pr-4">
            <Magnetic strength={30}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden group/cta rounded-full bg-white text-black font-black uppercase tracking-[0.2em] text-[9px] px-8 py-3.5 transition-all duration-500 shadow-xl overflow-hidden"
              >
                <span className="relative z-10">Request Access</span>
                {/* Scanning Light Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 ease-in-out"
                />
              </motion.button>
            </Magnetic>
          </div>
          
          {/* Mobile Menu Icon */}
          <div 
            className="md:hidden glass p-3 rounded-full mr-4 interactive cursor-pointer text-white/60 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </div>
        </motion.div>
      </motion.nav>

      {/* Futuristic Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl md:hidden overflow-hidden"
          >
            <div className="absolute top-12 right-12 p-4 cursor-pointer text-white/40 hover:text-white transition-colors" onClick={() => setIsOpen(false)}>
              <X size={40} strokeWidth={1} />
            </div>

            {/* Background Grain/Noise */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
            
            <div className="flex flex-col h-full items-center justify-center space-y-16 px-12">
              <div className="flex flex-col space-y-4 items-center">
                {links.map((link, i) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex flex-col items-center"
                  >
                    <span className="text-sm font-black text-white/10 uppercase tracking-[1em] mb-[-10px] group-hover:text-white/40 transition-colors">0{i+1}</span>
                    <span className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter hover:italic transition-all inline-block hover:scale-110">
                      {link}
                    </span>
                  </motion.a>
                ))}
              </div>

              <motion.button 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="w-full max-w-sm h-20 border border-white/20 rounded-full text-sm font-black uppercase tracking-[0.5em] text-white hover:bg-white hover:text-black transition-all flex items-center justify-center"
              >
                Inquire
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

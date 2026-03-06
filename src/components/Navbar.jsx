import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Magnetic from './Magnetic'
import { Menu, X } from 'lucide-react'
import logoImg from '../assets/logo_original_user.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const links = ['Products', 'About', 'Contact']

  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [theme, setTheme] = useState('dark') // 'dark' or 'light'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Intersection Observer to detect section theme
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "-10% 0% -80% 0%" // Focus on the top part of the viewport where the navbar is
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTheme = entry.target.getAttribute('data-theme')
          if (sectionTheme) setTheme(sectionTheme)
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll('[data-theme]')
    sections.forEach((section) => observer.observe(section))

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-center pointer-events-none"
      >
        <div className="max-w-7xl w-full flex items-center justify-between pointer-events-auto relative">
          
          {/* Island 1: The Brand Identity */}
          <Magnetic strength={15}>
            <motion.div 
              animate={{ 
                scale: isScrolled ? 1 : 1.1
              }}
              className={`island-glass rounded-full px-8 py-3 flex items-center h-16 w-48 relative overflow-hidden group/logo transition-all duration-500 ${
                theme === 'light' 
                  ? 'bg-black/[0.03] border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]' 
                  : 'bg-white/5 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
              }`}
            >
              <img 
                src={logoImg} 
                alt="Veltrix Labs" 
                className={`absolute inset-0 w-full h-full object-contain scale-[2] transition-all duration-500 group-hover/logo:scale-[2.1] ${
                  theme === 'light' ? 'brightness-0 opacity-80' : 'mix-blend-screen brightness-150 group-hover/logo:brightness-200'
                }`}
              />
            </motion.div>
          </Magnetic>

          {/* Island 2: The Navigation Dock */}
          <motion.div 
            animate={{ 
              backgroundColor: theme === 'light' 
                ? (isScrolled ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.01)')
                : (isScrolled ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)'),
              padding: isScrolled ? '8px 12px' : '12px 24px',
              scale: isScrolled ? 0.95 : 1
            }}
            className={`hidden md:flex island-glass rounded-[40px] relative items-center justify-center min-h-[64px] transition-all duration-500 ${
              theme === 'light' 
                ? 'border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]' 
                : 'border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            }`}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Liquid Under-Indicator */}
            <AnimatePresence>
              {hoveredIndex !== null && (
                <motion.div
                  layoutId="liquid-nav"
                  className={`liquid-indicator ${theme === 'light' ? 'bg-black/5' : 'bg-white/10'}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
                  style={{
                    left: 12 + hoveredIndex * 140, // Precision alignment
                    width: '130px',
                    height: '40px'
                  }}
                />
              )}
            </AnimatePresence>

            <div className="flex space-x-2 relative z-10">
              {links.map((link, i) => (
                <div 
                  key={link}
                  className="w-[140px] flex justify-center"
                  onMouseEnter={() => setHoveredIndex(i)}
                >
                  <Magnetic strength={20}>
                    <motion.a
                      href={`#${link.toLowerCase()}`}
                      className="text-[10px] font-black tracking-[0.4em] uppercase py-3 transition-colors duration-500 transform"
                      style={{ 
                        color: hoveredIndex === i 
                          ? (theme === 'light' ? '#000' : '#fff') 
                          : (theme === 'light' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.3)') 
                      }}
                    >
                      {link}
                    </motion.a>
                  </Magnetic>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Island 3: The Action Station */}
          <div className="flex items-center space-x-4">
            <Magnetic strength={25}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`hidden md:flex island-glass rounded-full px-10 py-4 text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 group/cta relative overflow-hidden ${
                  theme === 'light' 
                    ? 'text-black border-black/10 hover:bg-black hover:text-white shadow-[0_8px_32px_rgba(0,0,0,0.1)]' 
                    : 'text-white border-white/10 hover:bg-white hover:text-black shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
                }`}
              >
                <span className="relative z-10">Request Access</span>
                {/* HUD Scanline */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-current opacity-10 to-transparent -translate-x-full group-hover/cta:translate-x-full transition-transform duration-1000 ease-in-out`} />
              </motion.button>
            </Magnetic>

            {/* Mobile Menu Trigger */}
            <div 
              className={`md:hidden island-glass p-5 rounded-full interactive cursor-pointer hover:scale-110 transition-all duration-500 ${
                theme === 'light' 
                  ? 'text-black border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)]' 
                  : 'text-white border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Bespoke Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[200] bg-black/98 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center"
          >
            <div className="absolute top-12 right-12 p-4 cursor-pointer text-white" onClick={() => setIsOpen(false)}>
              <X size={32} />
            </div>
            
            <div className="flex flex-col space-y-8 items-center">
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * i }}
                  className="text-6xl font-black text-white/10 hover:text-white uppercase tracking-tighter transition-all hover:scale-110"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

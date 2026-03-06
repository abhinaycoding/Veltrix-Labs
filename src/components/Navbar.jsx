import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Magnetic from './Magnetic'
import { Menu, X } from 'lucide-react'
import logoImg from '../assets/logo_original_user.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const navRef = useRef(null)
  const links = ['Products', 'About', 'Contact']

  // Mouse tracking for local glow effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleMouseMove = (e) => {
      if (!navRef.current) return
      const rect = navRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }

    const observerOptions = {
      threshold: [0, 0.1, 0.5, 0.9, 1],
      rootMargin: "-20% 0% -79% 0%"
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
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [mouseX, mouseY])

  const glowStyle = {
    '--x': `${mouseX.get()}px`,
    '--y': `${mouseY.get()}px`,
  }

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-center pointer-events-none"
      >
        <motion.div 
          ref={navRef}
          style={glowStyle}
          animate={{ 
            width: isScrolled ? 'auto' : '100%',
            maxWidth: isScrolled ? '600px' : '1200px',
            padding: isScrolled ? '8px 8px' : '12px 16px',
            borderRadius: isScrolled ? '100px' : '24px',
            backgroundColor: theme === 'light' 
              ? (isScrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.8)')
              : (isScrolled ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.3)'),
          }}
          className={`meta-glass flex items-center justify-between pointer-events-auto relative glow-follow group/nav shadow-2xl ${
            theme === 'light' ? 'border-black/10' : 'border-white/10'
          }`}
        >
          {/* Logo Section */}
          <Magnetic strength={10}>
            <div className="flex items-center px-4 shrink-0 cursor-pointer">
              <div className={`w-32 h-10 relative transition-all duration-500 ${isScrolled ? 'w-8 h-8 opacity-80' : 'w-32'}`}>
                <img 
                  src={logoImg} 
                  alt="Veltrix" 
                  className={`w-full h-full object-contain transition-all duration-500 ${
                    theme === 'light' ? 'brightness-0' : 'mix-blend-screen brightness-150'
                  }`}
                />
              </div>
            </div>
          </Magnetic>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center px-2">
            <div className="flex bg-black/5 dark:bg-white/5 rounded-full p-1 border border-current/5 backdrop-blur-sm">
              {links.map((link, i) => (
                <Magnetic key={link} strength={15}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative px-6 py-2 text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 rounded-full ${
                      theme === 'light' 
                        ? (hoveredIndex === i ? 'text-white bg-black' : 'text-black/60 hover:text-black')
                        : (hoveredIndex === i ? 'text-black bg-white' : 'text-white/60 hover:text-white')
                    }`}
                  >
                    {link}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* CTA / Action */}
          <div className="flex items-center px-2">
            <button className={`flex items-center justify-center px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
              theme === 'light'
                ? 'bg-black text-white hover:bg-black/80'
                : 'bg-white text-black hover:bg-white/80'
            } ${isScrolled ? 'px-4' : 'px-8'}`}>
              <span className={isScrolled ? 'hidden lg:block' : 'block'}>Access</span>
              <Menu className="md:hidden w-5 h-5 ml-0" onClick={() => setIsOpen(true)} />
            </button>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-3xl md:hidden flex flex-col items-center justify-center"
          >
            <X size={32} className="absolute top-12 right-12 cursor-pointer text-white" onClick={() => setIsOpen(false)} />
            <div className="flex flex-col space-y-8 items-center">
              {links.map((link, i) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-black text-white/20 hover:text-white uppercase tracking-tighter transition-all"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

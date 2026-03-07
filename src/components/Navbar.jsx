import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Magnetic from './Magnetic'
import { X, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(window.scrollY > 20)
  const [theme, setTheme] = useState('dark')
  const navRef = useRef(null)
  const location = useLocation()
  
  const links = [
    { name: 'Products', path: '/#products', num: '01' },
    { name: 'About', path: '/#about', num: '02' },
    { name: 'Contact', path: '/contact', num: '03' }
  ]

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    if (location.hash && location.pathname === '/') {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const handleMouseMove = (e) => {
      if (!navRef.current) return
      const rect = navRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }

    const sections = document.querySelectorAll('[data-theme]')
    
    const observer = new IntersectionObserver((entries) => {
      if (location.pathname === '/contact') {
        setTheme('dark')
        return
      }
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTheme = entry.target.getAttribute('data-theme')
          if (sectionTheme) setTheme(sectionTheme)
        }
      })
    }, {
      threshold: [0, 0.1, 0.5, 0.9, 1],
      rootMargin: "-20% 0% -79% 0%"
    })

    sections.forEach((section) => observer.observe(section))
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    // Initial check for contact page theme
    if (location.pathname === '/contact') setTheme('dark')

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [mouseX, mouseY, location.pathname])

  const background = useMotionTemplate`radial-gradient(120px circle at ${mouseX}px ${mouseY}px, rgba(173, 255, 47, 0.15), transparent)`

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 w-full z-[100] px-6 md:px-10 py-4 sm:py-6 flex justify-center pointer-events-none"
      >
        <motion.div 
          ref={navRef}
          style={{ willChange: 'transform, max-width, padding, background-color' }}
          animate={{ 
            width: '100%',
            maxWidth: isScrolled ? '640px' : '1280px',
            padding: isScrolled ? '10px 20px' : '14px 28px',
            backgroundColor: location.pathname === '/contact'
              ? 'rgba(0,0,0,0.95)'
              : (theme === 'light' 
                ? (isScrolled ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.02)')
                : (isScrolled ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.2)')),
            borderRadius: isScrolled ? '100px' : '24px',
            backdropFilter: 'blur(32px)',
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 30,
            mass: 0.8
          }}
          className={`nav-glass flex items-center justify-between pointer-events-auto relative group/nav shadow-2xl border ${
            theme === 'light' ? 'border-black/5' : 'border-white/5'
          }`}
        >
          {/* Radial Hover Glow Layer */}
          <motion.div 
            className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-500 rounded-[inherit]"
            style={{ background }}
          />

          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 cursor-pointer relative z-10 transition-transform hover:scale-105 active:scale-95">
             <span className={`text-xl font-black uppercase tracking-tighter ${
                theme === 'light' ? 'text-black' : 'text-white'
              }`}>
                Veltrix
              </span>
          </Link>

          {/* Hamburger Toggle */}
          <div className="flex items-center px-2 relative z-10">
            <Magnetic strength={20}>
              <button 
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className={`flex flex-col items-center justify-center gap-[5px] rounded-full shadow-lg transition-all duration-300 hover:scale-[1.1] active:scale-[0.95] ${
                   theme === 'light' ? 'bg-black text-white' : 'bg-[#ADFF2F] text-black'
                } ${isScrolled ? 'w-10 h-10' : 'w-11 h-11'}`}
              >
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 7, width: '60%' } : { rotate: 0, y: 0, width: '60%' }}
                  className="h-[2px] bg-current rounded-full block"
                  style={{ originX: 0.5 }}
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -7, width: '60%' } : { rotate: 0, y: 0, width: '40%' }}
                  className="h-[2px] bg-current rounded-full block"
                  style={{ originX: 0.5 }}
                />
              </button>
            </Magnetic>
          </div>
        </motion.div>
      </motion.nav>

      {/* Right-Side Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[190] bg-black/60 backdrop-blur-sm cursor-pointer"
            />

            {/* Drawer Panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              className="fixed top-0 right-0 h-full w-full max-w-[320px] sm:max-w-sm z-[200] bg-[#0a0a0a] border-l border-white/5 flex flex-col overflow-hidden shadow-[-20px_0_60px_rgba(0,0,0,0.8)]"
            >
              {/* Inner glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ADFF2F]/5 rounded-full blur-[100px] pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between px-8 pt-12 pb-8 border-b border-white/5">
                <div>
                  <div className="font-serif italic text-xs tracking-[0.2em] text-[#ADFF2F] mb-1">Navigation</div>
                  <div className="text-white font-black text-2xl tracking-tighter">VELTRIX</div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all shadow-xl"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-8 py-12 flex flex-col justify-start gap-4 overflow-y-auto custom-scrollbar">
                {links.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + (i * 0.08), type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between py-6 border-b border-white/5 hover:border-[#ADFF2F]/20 transition-all duration-300"
                    >
                      <div className="flex items-center gap-6">
                        <span className="text-[11px] text-[#ADFF2F]/40 font-bold tabular-nums tracking-widest group-hover:text-[#ADFF2F] transition-colors">{link.num}</span>
                        <span className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white group-hover:pl-2 transition-all duration-500">
                          {link.name}
                        </span>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-white/5 group-hover:text-[#ADFF2F] -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="px-8 py-10 border-t border-white/5 space-y-4 bg-black/40"
              >
                <div className="font-serif italic text-xs text-[#ADFF2F]/60 tracking-[0.1em]">Institutional Support</div>
                <a
                  href="mailto:hello@veltrix.com"
                  className="text-white/60 hover:text-white transition-colors font-bold text-lg block tracking-tight"
                >
                  hello@veltrix.com
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Magnetic from './Magnetic'
import { Menu, X } from 'lucide-react'
import logoImg from '../assets/logo_original_user.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const navRef = useRef(null)
  const location = useLocation()
  
  const links = [
    { name: 'Products', path: '/#products' },
    { name: 'About', path: '/#about' },
    { name: 'Contact', path: '/contact' }
  ]

  // Handle smooth scrolling for hash links
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Mouse tracking for local glow effect
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

  const background = useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, rgba(173, 255, 47, 0.15), transparent)`

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 w-full z-[100] flex justify-center pointer-events-none"
      >
        <motion.div 
          ref={navRef}
          animate={{ 
            y: 0,
            opacity: 1,
            width: '100%',
            maxWidth: '100%',
            padding: '20px 48px',
            backgroundColor: theme === 'light' 
              ? 'rgba(255,255,255,0.85)'
              : 'rgba(10,10,10,0.85)',
            backdropFilter: 'blur(32px) saturate(180%)',
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 30,
            mass: 0.8,
          }}
          className={`nav-glass flex items-center justify-between pointer-events-auto relative group/nav shadow-2xl border-b ${
            theme === 'light' ? 'border-black/5' : 'border-white/5'
          }`}
        >
          {/* Radial Hover Glow Layer */}
          <motion.div 
            className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-500"
            style={{ background }}
          />
          {/* Logo Section */}
          <Link to="/" className="flex items-center px-6 shrink-0 cursor-pointer">
            <motion.div 
              animate={{ opacity: 1 }}
              className="h-20 flex items-center justify-center"
            >
              <img 
                src={logoImg} 
                alt="Veltrix" 
                className={`w-auto h-full object-contain relative z-10 ${
                  theme === 'light' 
                    ? 'invert mix-blend-multiply' 
                    : 'mix-blend-screen'
                }`}
              />
            </motion.div>
          </Link>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center px-4 relative z-10">
            <div className={`flex rounded-full p-1.5 border transition-colors duration-500 shadow-inner ${
              theme === 'light' ? 'bg-black/5 border-black/5' : 'bg-white/5 border-white/5'
            }`}>
              {links.map((link, i) => (
                <Magnetic key={link.name} strength={10}>
                  <Link
                    to={link.path}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`relative px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 rounded-full ${
                      theme === 'light' 
                        ? (hoveredIndex === i ? 'text-white bg-black' : 'text-black/70')
                        : (hoveredIndex === i ? 'text-black bg-white' : 'text-white/70')
                    }`}
                  >
                    {link.name}
                  </Link>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* CTA / Action */}
          <div className="flex items-center px-4 relative z-10">
            <Link 
              to="/contact"
              className={`flex items-center justify-center rounded-full text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500 hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] active:scale-[0.95] ${
                theme === 'light'
                  ? 'bg-black text-white hover:bg-zinc-800'
                  : 'bg-white text-black hover:bg-zinc-100'
              } px-8 py-3`}
            >
              <span className="block">Access</span>
              <Menu className="md:hidden w-6 h-6 ml-4" onClick={(e) => { e.preventDefault(); setIsOpen(true); }} />
            </Link>
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
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                   onClick={() => setIsOpen(false)}
                  className="text-5xl font-black text-white/20 hover:text-white uppercase tracking-tighter transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

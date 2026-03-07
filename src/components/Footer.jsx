import { siteContent } from '../data/content'
import Magnetic from './Magnetic'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NewsletterForm = () => {
  const [status, setStatus] = useState('idle') // idle, submitting, success

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    
    try {
      const formData = new FormData(e.target)
      const response = await fetch('https://formspree.io/f/veltrixlabs.io@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      if (response.ok) setStatus('success')
      else setStatus('idle')
    } catch {
      setStatus('idle')
    }
  }

  return (
    <div className="relative w-full max-w-md">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[#ADFF2F] text-[10px] font-black uppercase tracking-[0.2em] py-3 h-[46px] flex items-center"
          >
            Transmission Secured.
          </motion.div>
        ) : (
          <motion.form 
            onSubmit={handleSubmit}
            className="flex w-full bg-transparent border border-white/20 focus-within:border-white transition-colors h-[46px]"
            exit={{ opacity: 0, x: -10 }}
          >
             <input 
               name="email"
               type="email" 
               placeholder="Enter your email" 
               className="bg-transparent text-white px-4 py-3 outline-none w-full text-sm font-light placeholder:text-white/30"
               required
               disabled={status === 'submitting'}
             />
             <button 
               type="submit" 
               disabled={status === 'submitting'}
               className="bg-white text-black font-black text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-[#ADFF2F] transition-colors disabled:opacity-50 min-w-[100px] flex items-center justify-center"
             >
               {status === 'submitting' ? (
                 <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
               ) : "Submit"}
             </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Footer() {
  const { footer } = siteContent

  return (
    <footer className="text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/10 relative z-10 w-full overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 pattern-footer -z-20" />
      <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] -z-10" />
      
      {/* Massive Brand Name - "Vooma" style */}
       <div className="w-full flex justify-center mb-16 md:mb-24">
         <Magnetic strength={10}>
           <h1 className="text-[15vw] leading-none font-black tracking-tighter text-white uppercase w-full max-w-[1400px] text-center">
             {footer.brand}
           </h1>
         </Magnetic>
       </div>

      {/* Grid Layout for details */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        
        {/* Left Col - Tagline / Info */}
        <div className="flex flex-col space-y-4">
          <p className="text-white/70 text-sm md:text-lg font-light max-w-xs">
            Architecting the infrastructure of tomorrow. Built for speed, scaled for the future.
          </p>
        </div>

        {/* Middle Col - Contact */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-white/50">
            Contact Us
          </h4>
          <div className="text-sm md:text-base text-white/80 space-y-1">
            <p>{footer.location.address1}</p>
            <p>{footer.location.address2}</p>
          </div>
           <Magnetic strength={20}>
             <a href={`mailto:${footer.location.email}`} className="text-sm md:text-base text-[#ADFF2F] hover:text-white transition-colors block">
               {footer.location.email}
             </a>
           </Magnetic>
        </div>

        {/* Right Col - Newsletter / Form */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-white/50">
            Stay up to date
          </h4>
          <NewsletterForm />
        </div>
        
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 uppercase tracking-widest gap-4">
         <p>© {new Date().getFullYear()} {footer.brand} LABS</p>
         
         <div className="flex space-x-8">
             {footer.links.map(link => (
               <Magnetic key={link} strength={15}>
                 <a href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors px-2">
                    {link}
                 </a>
               </Magnetic>
             ))}
         </div>
      </div>
    </footer>
  )
}

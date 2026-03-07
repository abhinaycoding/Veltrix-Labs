import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle, submitting, success

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('submitting')
    
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('_subject', 'New Waitlist Enrollment');
      
      const response = await fetch('https://formspree.io/veltrixlabs.io@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('idle')
      }
    } catch (error) {
      console.error('Waitlist Error:', error)
      setStatus('idle')
    }
  }

  return (
    <section className="py-32 px-6 md:px-10 relative z-10 max-w-4xl mx-auto w-full text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass p-8 md:p-24 rounded-3xl md:rounded-[48px] border border-white/10 relative overflow-hidden w-full min-h-[400px] flex flex-col justify-center"
      >
        {/* Glow Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ADFF2F]/40 to-transparent" />
        
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
               <div className="w-16 h-16 rounded-full border border-[#ADFF2F]/40 flex items-center justify-center mb-6">
                 <div className="w-8 h-8 bg-[#ADFF2F] rounded-full blur-sm opacity-50 absolute" />
                 <svg className="w-6 h-6 text-[#ADFF2F] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                 </svg>
               </div>
               <h3 className="text-2xl md:text-4xl font-black text-[#ADFF2F] uppercase tracking-widest mb-4">
                 Access Granted
               </h3>
               <p className="text-white/40 text-[10px] md:text-sm font-black tracking-[0.4em] uppercase">
                 Await transmission via secure channel.
               </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full"
            >
              <h2 className="text-3xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                 Join the <br /> <span className="opacity-20">Waitlist</span>
              </h2>
              <p className="text-white/40 text-[9px] md:text-[11px] font-black tracking-[0.2em] md:tracking-[0.5em] uppercase mb-10 md:mb-12">
                 Phase // Deployment 01
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-4 w-full">
                 <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER ACCESS CODE (EMAIL)"
                  disabled={status === 'submitting'}
                  required
                  className="w-full h-16 bg-white/[0.03] border border-white/10 rounded-2xl px-8 text-white font-black tracking-widest text-xs focus:outline-none focus:border-[#ADFF2F]/40 transition-colors uppercase disabled:opacity-50"
                 />
                 <motion.button
                  whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                  whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                  disabled={status === 'submitting'}
                  className="w-full md:w-auto min-w-[160px] h-16 px-12 bg-white text-black font-black tracking-[0.3em] uppercase text-[11px] rounded-2xl hover:bg-[#ADFF2F] transition-colors disabled:opacity-50 flex items-center justify-center"
                 >
                    {status === 'submitting' ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "ENROLL"
                    )}
                 </motion.button>
              </form>

              <p className="mt-8 text-[9px] font-black tracking-widest text-white/10 uppercase italic">
                 Security // Encrypted Gateway Active
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

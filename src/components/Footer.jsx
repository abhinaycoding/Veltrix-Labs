import { siteContent } from '../data/content'

export default function Footer() {
  const { footer } = siteContent

  return (
    <footer className="text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/10 relative z-10 w-full overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 pattern-footer -z-20" />
      <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] -z-10" />
      
      {/* Massive Brand Name - "Vooma" style */}
      <div className="w-full flex justify-center mb-16 md:mb-24">
         <h1 className="text-[15vw] leading-none font-black tracking-tighter text-white uppercase w-full max-w-[1400px] text-center">
           {footer.brand}
         </h1>
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
          <a href={`mailto:${footer.location.email}`} className="text-sm md:text-base text-[#ADFF2F] hover:text-white transition-colors">
            {footer.location.email}
          </a>
        </div>

        {/* Right Col - Newsletter / Form */}
        <div className="flex flex-col space-y-6">
          <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-white/50">
            Stay up to date
          </h4>
          <form className="flex w-full max-w-md bg-transparent border border-white/20 focus-within:border-white transition-colors">
             <input 
               type="email" 
               placeholder="Enter your email" 
               className="bg-transparent text-white px-4 py-3 outline-none w-full text-sm font-light placeholder:text-white/30"
               required
             />
             <button 
               type="submit" 
               className="bg-white text-black font-black text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-[#ADFF2F] transition-colors"
             >
               Submit
             </button>
          </form>
        </div>
        
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/40 uppercase tracking-widest gap-4">
         <p>© {new Date().getFullYear()} {footer.brand} LABS</p>
         
         <div className="flex space-x-8">
            {footer.links.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-white transition-colors">
                 {link}
              </a>
            ))}
         </div>
      </div>
    </footer>
  )
}

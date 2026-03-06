import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { siteContent } from '../data/content'
import notenookImg from '../assets/notenook.png'

const ProjectImages = {
  'src/assets/notenook.png': notenookImg
}

function ProjectCard({ project, index }) {
  const imageSrc = ProjectImages[project.image] || project.image;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative flex flex-col justify-between p-8 md:p-12 rounded-3xl glass border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden bg-[#111] min-h-[500px]"
    >
      {/* Background Image Layer */}
      {project.image && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={imageSrc} 
            alt=""
            className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent" />
        </div>
      )}

      {/* Dynamic Background Glow */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 opacity-0 group-hover:opacity-20 blur-3xl rounded-full transition-opacity duration-700 pointer-events-none translate-x-1/3 -translate-y-1/3" 
        style={{ backgroundColor: project.themeColor }}
      />

      {/* Header */}
      <div className="flex justify-between items-start z-10 mb-12">
        <div className="flex flex-col">
           <span className="font-black text-3xl tracking-tight leading-none mb-2" style={{ color: project.themeColor }}>
             {project.shortName}
           </span>
           <span className="text-white/80 text-[10px] font-bold tracking-[0.2em] uppercase">
             {project.title}
           </span>
        </div>
        
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white transition-all duration-300"
        >
          <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
        </a>
      </div>

      {/* Content */}
      <div className="z-10 mt-auto">
        <h3 
          className="font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight mb-6"
          dangerouslySetInnerHTML={{ __html: project.headline }}
        />
        
        <p className="text-white/70 text-sm md:text-base font-light tracking-wide leading-relaxed max-w-lg mb-8 line-clamp-3">
           {project.description}
        </p>

        <div className="flex flex-wrap gap-4">
           {project.navLinks.map((link) => (
             <span key={link} className="text-[10px] font-bold tracking-widest uppercase text-white/40 border border-white/10 rounded-full px-4 py-1.5 bg-black/50">
               {link}
             </span>
           ))}
        </div>
      </div>
      
      {/* Decorative Bottom Line */}
      <div 
        className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-500 ease-out group-hover:w-full"
        style={{ backgroundColor: project.themeColor }}
      />
    </motion.div>
  )
}

export default function ProductShowcase() {
  const { projects } = siteContent
  
  if (!projects || projects.length === 0) return null

  return (
    <section className="py-24 md:py-40 bg-[#0a0a0a] relative z-10 w-full flex flex-col items-center border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="mb-16 md:mb-24"
        >
          <span className="text-[10px] font-black tracking-[0.8em] text-[#ADFF2F] uppercase mb-4 block">
            {projects[0]?.category || "Our Work"}
          </span>
          <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.9]">
            Featured <br className="hidden md:block" /> <span className="text-white/20 italic">Projects</span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {projects.map((project, index) => (
            <ProjectCard key={project.id || index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

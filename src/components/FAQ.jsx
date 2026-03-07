import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';

const FAQItem = ({ faq, isOpen, onClick, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const background = useMotionTemplate`radial-gradient(150px circle at ${mouseX}px ${mouseY}px, rgba(173, 255, 47, 0.08), transparent)`;

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            onMouseMove={handleMouseMove}
            className="group relative meta-glass rounded-2xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#ADFF2F]/20 cursor-pointer"
            onClick={onClick}
        >
            {/* Hover Glow Effect */}
            <motion.div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background }}
            />

            <div className="relative p-6 px-8 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-6">
                    <span className="text-[10px] font-bold text-white/20 tabular-nums tracking-widest">0{index + 1}</span>
                    <span className={`text-base font-bold transition-colors duration-300 ${isOpen ? 'text-[#ADFF2F]' : 'text-white/80 group-hover:text-white'}`}>
                        {faq.q}
                    </span>
                </div>
                
                <motion.div
                    animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? '#ADFF2F' : 'rgba(255,255,255,0.2)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <Plus className="w-5 h-5" />
                </motion.div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        className="overflow-hidden"
                    >
                        <motion.div 
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="p-8 pt-0 pl-[76px] text-sm text-white/40 leading-relaxed font-medium max-w-2xl"
                        >
                            {faq.a}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        { 
            q: "How long does it take to build my website?", 
            a: "Basic projects typically take 5–7 business days. More complex custom builds range from 14–18 days. We prioritize high-velocity delivery without ever compromising on engineering standards." 
        },
        { 
            q: "Do I own the website after it's built?", 
            a: "Completely. Once the project is finalized, you own 100% of the architecture, design, and content. No hidden subscriptions, no platform lock-ins, no proprietary black boxes." 
        },
        { 
            q: "What about hosting and maintenance?", 
            a: "We deploy onto high-performance cloud infrastructure. We handle the entire technical setup and offer ongoing support to ensure your site remains optimized and secure as you scale." 
        },
        { 
            q: "Can I manage the content myself?", 
            a: "Yes. We can integrate lightweight, intuitive management systems that allow you to update text and imagery without needing a developer for every change." 
        },
        { 
            q: "How do you handle SEO and visibility?", 
            a: "Every line of code is written with performance and searchability in mind. We ensure your core technical SEO is perfect from day one, giving you the best possible foundation for growth." 
        }
    ];

    return (
        <section className="relative py-32 overflow-hidden bg-black flex flex-col items-center">
            {/* Atmospheric Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ADFF2F]/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-6 relative z-10 max-w-4xl">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 rounded-full text-[#ADFF2F]">
                        Common Inquiries
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
                        Clarifying the <span className="text-metallic italic">Process</span>
                    </h2>
                    <p className="text-white/30 max-w-xl mx-auto text-sm md:text-base font-medium leading-relaxed">
                        Answers to the most frequent questions regarding our engineering workflow and partnership models.
                    </p>
                </motion.div>

                <div className="space-y-4 mb-24">
                    {faqs.map((faq, i) => (
                        <FAQItem 
                            key={i} 
                            faq={faq} 
                            index={i}
                            isOpen={openFaq === i} 
                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        />
                    ))}
                </div>

                {/* Simplified refined CTA */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative p-[1px] rounded-[3rem] overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-[#ADFF2F]/20 to-white/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="relative bg-[#0a0a0a] p-12 md:p-16 rounded-[3rem] text-center">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">Ready to evolve your digital presence?</h3>
                        <p className="text-white/40 mb-10 max-w-lg mx-auto font-medium text-sm md:text-base leading-relaxed">
                            Discover how our strategic engineering can transform your vision into a high-performance reality.
                        </p>
                        <div className="flex justify-center">
                            <Link to="/contact" className="group/btn relative px-10 py-5 bg-[#ADFF2F] text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_40px_rgba(173,255,47,0.4)] transition-all duration-500 flex items-center gap-4 overflow-hidden">
                                <span className="relative z-10">Start the briefing</span>
                                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover/btn:translate-x-2" />
                                <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500" />
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;

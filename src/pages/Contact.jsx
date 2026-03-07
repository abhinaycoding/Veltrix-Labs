import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, Globe, Zap, Shield, ChevronRight, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';

const BentoCard = ({ title, content, icon: Icon, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay }}
        className="group relative overflow-hidden p-8 rounded-[2rem] bg-white/60 backdrop-blur-2xl border border-zinc-300/30 hover:border-[#ADFF2F] transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-[#ADFF2F]/5"
    >
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#ADFF2F]/5 rounded-full blur-3xl group-hover:bg-[#ADFF2F]/10 transition-colors duration-700" />
        <Icon className="w-5 h-5 text-[#ADFF2F] mb-6 opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 mb-2">{title}</div>
        <div className="text-xl font-bold tracking-tight text-zinc-800">{content}</div>
    </motion.div>
);

const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [focusedField, setFocusedField] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFocusedField(null);
        setStatus('submitting');
        
        try {
            const form = e.target;
            const data = {
                name: form.name.value,
                email: form.email.value,
                message: form.message.value,
                _captcha: "false"
            };

            const response = await fetch(form.action, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                setStatus('success');
                form.reset();
            } else {
                const errorData = await response.json();
                console.error('Formspree Error:', errorData);
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission Error:', error);
            setStatus('error');
        }
    };

    return (
        <div data-theme="light" className="bg-[#F1F1F3] min-h-screen text-zinc-800 selection:bg-[#ADFF2F]/40 selection:text-zinc-800 font-sans overflow-x-hidden relative">
            {/* Success Overlay */}
            <AnimatePresence>
                {status === 'success' && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-3xl flex items-center justify-center p-6 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="max-w-md w-full"
                        >
                            <div className="size-24 bg-[#ADFF2F]/10 rounded-[2.5rem] border border-[#ADFF2F]/20 flex items-center justify-center mx-auto mb-10 overflow-hidden relative group">
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1.5 }}
                                    className="absolute inset-0 bg-[#ADFF2F]/5 blur-xl"
                                />
                                <CheckCircle2 className="w-10 h-10 text-[#ADFF2F] relative z-10" />
                            </div>
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 mb-6 leading-none">
                                Transmission <br />
                                <span className="italic font-serif normal-case bg-gradient-to-r from-zinc-900 to-[#ADFF2F] bg-clip-text text-transparent">Complete.</span>
                            </h2>
                            <p className="text-zinc-500 font-medium mb-12 leading-relaxed">
                                Your inquiry has been secured. Our team will initiate contact via the provided channel shortly.
                            </p>
                            <button 
                                onClick={() => setStatus('idle')}
                                className="w-full bg-zinc-900 text-white font-black uppercase tracking-[0.4em] text-[10px] py-6 rounded-2xl hover:bg-black transition-all"
                            >
                                Return to Portal
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Soft Atmospheric Radiant Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ADFF2F]/5 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#ADFF2F]/3 rounded-full blur-[120px]" />
            </div>

            <main className="pt-32 sm:pt-48 md:pt-60 pb-32 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-stretch">
                        {/* Executive Inquiry Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.1 }}
                            className="lg:col-span-7 relative group"
                        >
                            <div className="absolute -inset-[1px] bg-zinc-200 rounded-[3rem] blur-[1px] group-hover:bg-[#ADFF2F]/30 transition-colors duration-1000"></div>
                            <div className="relative h-full p-8 md:p-16 rounded-[3rem] bg-white/90 backdrop-blur-3xl border border-zinc-200 shadow-2xl shadow-zinc-200/40">
                                <div className="mb-12">
                                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none text-zinc-900">
                                        Build Your <br />
                                        <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-[#ADFF2F]/70 bg-clip-text text-transparent italic font-serif normal-case">Legacy.</span>
                                    </h1>
                                    <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">Crafting refined digital experiences.</p>
                                </div>

                                <form 
                                    action="https://formspree.io/f/xlgpeplq"
                                    method="POST"
                                    onSubmit={handleSubmit}
                                    className="space-y-10"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center ml-1">
                                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Full Name / Organization</label>
                                                <AnimatePresence>
                                                    {focusedField === 'name' && (
                                                        <motion.span initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-[8px] text-[#ADFF2F] font-black uppercase tracking-widest flex items-center gap-1">
                                                            <div className="w-1 h-1 rounded-full bg-[#ADFF2F]" /> Required
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            <input 
                                                name="name"
                                                required
                                                onFocus={() => setFocusedField('name')}
                                                onBlur={() => setFocusedField(null)}
                                                type="text" 
                                                placeholder="Your Name"
                                                className="w-full bg-[#F8F8F9] border border-zinc-200 rounded-2xl px-7 py-6 outline-none focus:border-[#ADFF2F] focus:bg-white transition-all text-sm font-medium ring-0 focus:ring-4 focus:ring-[#ADFF2F]/10 placeholder:text-zinc-300"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center ml-1">
                                                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Email Address</label>
                                                <AnimatePresence>
                                                    {focusedField === 'email' && (
                                                        <motion.span initial={{ opacity: 0, x: 5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-[8px] text-[#ADFF2F] font-black uppercase tracking-widest flex items-center gap-1">
                                                            <div className="w-1 h-1 rounded-full bg-[#ADFF2F]" /> Required
                                                        </motion.span>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            <input 
                                                name="email"
                                                required
                                                onFocus={() => setFocusedField('email')}
                                                onBlur={() => setFocusedField(null)}
                                                type="email" 
                                                placeholder="hello@domain.com"
                                                className="w-full bg-[#F8F8F9] border border-zinc-200 rounded-2xl px-7 py-6 outline-none focus:border-[#ADFF2F] focus:bg-white transition-all text-sm font-medium ring-0 focus:ring-4 focus:ring-[#ADFF2F]/10 placeholder:text-zinc-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 ml-1">How can we help?</label>
                                        <textarea 
                                            name="message"
                                            required
                                            onFocus={() => setFocusedField('message')}
                                            onBlur={() => setFocusedField(null)}
                                            rows="6"
                                            placeholder="Tell us about the problem you're trying to solve..."
                                            className="w-full bg-[#F8F8F9] border border-zinc-200 rounded-2xl px-7 py-6 outline-none focus:border-[#ADFF2F] focus:bg-white transition-all text-sm font-medium resize-none ring-0 focus:ring-4 focus:ring-[#ADFF2F]/10 placeholder:text-zinc-300"
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full group relative overflow-hidden bg-zinc-900 border border-zinc-800 text-white font-black uppercase tracking-[0.5em] py-7 rounded-2xl transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] hover:bg-black hover:shadow-2xl hover:shadow-[#ADFF2F]/20 text-[11px] disabled:opacity-50"
                                    >
                                        <div className="absolute inset-[-100%] bg-gradient-to-r from-transparent via-[#ADFF2F]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12"></div>
                                        <span className="relative z-10 flex items-center justify-center gap-4">
                                            {status === 'submitting' ? (
                                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-[#ADFF2F] border-t-transparent rounded-full" />
                                            ) : (
                                                <>
                                                    Send Message
                                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                                </>
                                            )}
                                        </span>
                                    </button>
                                    
                                    {status === 'error' && (
                                        <p className="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">Transmission Error. Please retry or contact hello@veltrix.com directly.</p>
                                    )}
                                </form>
                            </div>
                        </motion.div>

                        {/* Strategic Contact Section */}
                        <div className="lg:col-span-5 flex flex-col gap-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="flex-grow flex flex-col"
                            >
                                <div className="p-12 rounded-[3rem] border border-zinc-200 bg-white/80 backdrop-blur-3xl flex-grow shadow-xl shadow-zinc-200/20">
                                    <h3 className="text-2xl font-black tracking-tight mb-6 italic font-serif text-zinc-800">Let's Connect</h3>
                                    <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-12 max-w-sm">
                                        We are always looking for ambitious projects and visionary partners. Tell us about your goals and how we can help.
                                    </p>
                                    
                                    <BentoCard 
                                        title="Direct Contact" 
                                        content="veltrixlabs.io@gmail.com" 
                                        icon={Mail} 
                                        delay={0.3} 
                                    />

                                    <div className="mt-12 flex items-center gap-4 group cursor-help transition-all opacity-60 hover:opacity-100">
                                        <div className="w-12 h-12 rounded-2xl bg-[#ADFF2F]/10 flex items-center justify-center border border-[#ADFF2F]/20 group-hover:scale-110 transition-transform">
                                            <Globe className="w-5 h-5 text-[#ADFF2F]" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">Location</div>
                                            <div className="text-sm font-bold tracking-tight text-zinc-800">Remote / Global</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            
            <Footer />
        </div>
    );
};

export default Contact;

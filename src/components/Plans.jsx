import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Minus, Zap, Shield, Activity, ArrowRight, Gift, Globe } from 'lucide-react';

const Plans = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [isUSD, setIsUSD] = useState(false);

    const pricingPlans = [
        {
            tier: "Basic",
            inr: "₹10,000",
            usd: "$250",
            note: "One-time Development · Annual Support",
            pitch: "Get online fast and look credible from Day 1.",
            for: "Best for: Shops · Tutors · Freelancers",
            features: [
                "Up to 5 Pages",
                "Mobile-Friendly Design",
                "WhatsApp Button & Contact Form",
                "Google Maps Integration",
                "Basic SEO Setup",
                "1 Revision Round",
                "Delivery: 5–7 Days"
            ],
            benefits: ["Customers can find you on Google", "Looks credible vs competitors", "Direct contact from mobile"],
            giveaways: ["Free .IN Domain (1 Year)", "Life-time SSL Security", "WhatsApp Support"],
            buttonText: "Get Started",
            popular: false,
            icon: <Zap className="w-5 h-5 text-[#ADFF2F]" />
        },
        {
            tier: "Professional",
            inr: "₹15,000",
            usd: "$499",
            note: "Best Value · Scale Ready",
            pitch: "The complete growth package — chosen by 80% of our clients.",
            for: "Best for: Dentists · Gyms · Clinics · Coaching",
            features: [
                "Up to 10 Pages incl. Testimonials & FAQ",
                "Premium Custom Design",
                "Appointment / Booking Form",
                "WhatsApp Chat + Click-to-Call",
                "Google Reviews Section",
                "Full SEO Optimisation",
                "Social Media Integration",
                "2 Revision Rounds",
                "Delivery: 7–10 Days"
            ],
            benefits: ["Customers book directly", "Instant trust with reviews", "Local search ranking", "24/7 Digital Salesperson"],
            giveaways: ["Free .COM Domain", "GST-Ready Invoicing", "15 Pro Emails"],
            buttonText: "Choose Professional",
            popular: true,
            icon: <Activity className="w-5 h-5 text-[#ADFF2F]" />
        },
        {
            tier: "Premium",
            inr: "Custom",
            usd: "Custom",
            note: "Enterprise Grade · Full Partnership",
            pitch: "For established businesses ready to dominate their market.",
            for: "Best for: Multi-Branch · Institutes · Global",
            features: [
                "Unlimited Pages",
                "Blog / Articles Section",
                "Online Payment (Razorpay / UPI)",
                "Live Chat Widget",
                "Advanced Animations & Premium UI",
                "Multi-Location Support",
                "Performance Optimisation",
                "3 Revision Rounds",
                "Delivery: 14–18 Days"
            ],
            benefits: ["Accept fees & payments online", "Google authority builds", "Impresses corporate clients"],
            giveaways: ["Full Brand Identity Suite", "Merchant Payment Setup", "Strategy Dashboard"],
            buttonText: "Inquire for Premium",
            popular: false,
            icon: <Shield className="w-5 h-5 text-[#ADFF2F]" />
        }
    ];

    const processSteps = [
        { 
            title: "You Share Your Details", 
            tag: "Step 01",
            desc: "Tell us about your business — your services, photos, contact info. A quick WhatsApp chat is all it takes." 
        },
        { 
            title: "We Design & Build", 
            tag: "Step 02",
            desc: "We build your custom website — mobile-ready, SEO-optimised. You get a preview to review before it goes live." 
        },
        { 
            title: "You Go Live & Grow", 
            tag: "Step 03",
            desc: "Your website goes live. Customers find you on Google and contact you directly — 24 hours a day." 
        }
    ];

    const faqs = [
        { 
            q: "How long does it take to build my website?", 
            a: "Basic: 5–7 days. Professional: 7–10 days. Premium: 14–18 days. We work fast without cutting corners on quality." 
        },
        { 
            q: "Do I own the website after it's built?", 
            a: "Yes, 100%. Once payment is complete, the website is entirely yours — all content, design, and code. No lock-ins, no ongoing fees to us." 
        },
        { 
            q: "What about hosting — do I need to pay for it?", 
            a: "Hosting is separate from the plan price. We help you set up reliable hosting at an affordable rate and handle the entire setup for you." 
        },
        { 
            q: "Can I make changes to the website later?", 
            a: "All plans include revision rounds during the build. After launch, small updates can be done at a minimal charge. Pro and Premium include free support." 
        },
        { 
            q: "Will my website show up on Google?", 
            a: "Yes. Every plan includes SEO setup. Professional and Premium include full SEO optimisation and Google Business Profile setup." 
        }
    ];

    return (
        <section className="relative py-24 overflow-hidden bg-black flex flex-col items-center">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ADFF2F]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-6 relative z-10 max-w-7xl">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 flex flex-col items-center"
                >
                    <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] uppercase bg-white/5 border border-white/10 rounded-full text-[#ADFF2F]">
                        Pricing & Plans
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight max-w-4xl">
                        Powering the <span className="text-metallic italic">Global Elite</span>
                    </h2>
                    
                    {/* Regional Toggle - Exact User Implementation */}
                    <div className="mt-8 mb-12 flex justify-center w-full">
                        <label className="switch">
                            <input 
                                className="cb" 
                                type="checkbox" 
                                checked={isUSD}
                                onChange={() => setIsUSD(!isUSD)}
                            />
                            <span className="toggle">
                                <span className="left">INR</span>
                                <span className="right">USD</span>
                            </span>
                        </label>
                    </div>

                    <p className="text-white/40 max-w-2xl mx-auto text-lg">
                        Venture-grade pricing models tailored for {isUSD ? 'international scaling' : 'the Indian growth engine'}.
                    </p>
                </motion.div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {pricingPlans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative meta-glass card-glow p-8 rounded-3xl border border-white/10 flex flex-col group hover:border-[#ADFF2F]/30 transition-colors duration-500 ${plan.popular ? 'bg-white/5' : ''}`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#ADFF2F] text-black text-[10px] font-bold rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}
                            
                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    {plan.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.tier}</h3>
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-4xl font-bold text-white tracking-tighter">
                                        {isUSD ? plan.usd : plan.inr}
                                    </span>
                                    {plan.price !== "Custom" && <span className="text-white/20 text-sm italic">/one-time</span>}
                                </div>
                                <div className="text-[#ADFF2F]/60 text-[10px] uppercase tracking-tighter mb-4 font-bold">{plan.note}</div>
                                <p className="text-white/40 text-sm leading-relaxed mb-4">{plan.pitch}</p>
                                <div className="text-[11px] text-white/30 border-t border-white/5 pt-4">{plan.for}</div>
                            </div>

                            <div className="space-y-3 mb-8 flex-grow">
                                <div className="text-[10px] text-white/20 uppercase tracking-widest mb-2 font-bold">Veltrix Giveaways</div>
                                <div className="bg-[#ADFF2F]/5 border border-[#ADFF2F]/10 rounded-xl p-4 mb-4">
                                    {plan.giveaways.map((gift, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-[11px] text-[#ADFF2F] font-bold">
                                            <Gift className="w-3 h-3" /> {gift}
                                        </div>
                                    ))}
                                </div>

                                <div className="text-[10px] text-white/20 uppercase tracking-widest mb-2 font-bold">Inclusions</div>
                                {plan.features.map((feat, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-sm text-white/60">
                                        <div className="flex-shrink-0 w-4 h-4 rounded-full bg-[#ADFF2F]/10 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-[#ADFF2F]" />
                                        </div>
                                        {feat}
                                    </div>
                                ))}
                                
                                <div className="text-[10px] text-white/20 uppercase tracking-widest mt-6 mb-2 font-bold">Business Benefits</div>
                                {plan.benefits?.map((ben, idx) => (
                                    <div key={idx} className="text-xs text-white/40 italic flex gap-2">
                                        <span className="text-[#ADFF2F]">•</span> {ben}
                                    </div>
                                ))}
                            </div>

                            <button className={`w-full py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                                plan.popular 
                                ? 'bg-[#ADFF2F] text-black hover:shadow-[0_0_20px_rgba(173,255,47,0.4)]' 
                                : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                            }`}>
                                {plan.buttonText}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Process Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 border-y border-white/5 py-20 px-4">
                    {processSteps.map((step, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="text-center md:text-left"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-5xl font-black text-white/5 leading-none">0{i+1}</span>
                                <span className="text-[10px] text-[#ADFF2F] uppercase tracking-[0.2em] font-bold">— {step.tag}</span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                            <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="max-w-3xl mx-auto mb-20">
                    <h3 className="text-2xl font-bold text-white mb-10 text-center">Informed Inquiries</h3>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div key={i} className="meta-glass rounded-2xl border border-white/5 overflow-hidden">
                                <button 
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="text-sm font-bold text-white/80">{faq.q}</span>
                                    {openFaq === i ? <Minus className="w-4 h-4 text-[#ADFF2F]" /> : <Plus className="w-4 h-4 text-white/20" />}
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-sm text-white/40 leading-relaxed">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Final CTA */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative meta-glass p-12 rounded-[40px] border border-[#ADFF2F]/20 text-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#ADFF2F]/5 via-transparent to-[#ADFF2F]/5 pointer-events-none" />
                    <h3 className="text-3xl font-bold text-white mb-4">Ready for the Next Paradigm?</h3>
                    <p className="text-white/40 mb-8 max-w-lg mx-auto">
                        Join the waiting list to secure early-stage access to the Veltrix Labs ecosystem.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button className="px-10 py-4 bg-[#ADFF2F] text-black font-black text-xs uppercase tracking-[0.2em] rounded-full hover:shadow-[0_0_30px_rgba(173,255,47,0.3)] transition-all flex items-center justify-center gap-2">
                            Initialize Access <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Plans;

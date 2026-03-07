import React from 'react';
import { siteContent } from '../data/content';

const TestimonialCard = ({ testimonial }) => (
    <div className="bg-gradient-to-b from-[#020204] to-[#191130] border border-white/10 rounded-2xl p-6 mb-4 hover:border-[#ADFF2F]/30 transition-all duration-300 group">
        <div className="mb-5">
            <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#ADFF2F" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 13.056c.464 0 .91-.131 1.237-.364.329-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88C7.91 6.97 7.464 6.838 7 6.838c-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.513-.879.328-.233.773-.364 1.237-.364.232 0 .455-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.619-.181c-1.392 0-2.728.393-3.712 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.513.88.328.233.773.364 1.237.364zm9.83 0c.465 0 .91-.131 1.238-.364.328-.234.513-.55.513-.88v-3.73c0-.33-.184-.647-.513-.88-.328-.233-.773-.364-1.237-.364-.232 0-.455-.066-.619-.182-.164-.117-.256-.275-.256-.44v-.622c0-.33.184-.646.512-.879.329-.233.774-.364 1.238-.364.232 0 .454-.066.619-.182.164-.117.256-.275.256-.44V2.485c0-.165-.092-.323-.256-.44a1.1 1.1 0 0 0-.62-.181c-1.391 0-2.727.393-3.711 1.092-.985.7-1.538 1.649-1.538 2.638v6.218c0 .33.184.646.512.88.329.233.774.364 1.238.364z"/>
                </g>
            </svg>
        </div>
        <p className="text-sm text-white/60 mb-6 leading-relaxed font-medium group-hover:text-white/80 transition-colors">
            {testimonial.content}
        </p>
        <div className="flex items-center gap-4">
            <div className="size-10 rounded-full overflow-hidden border border-white/10 group-hover:border-[#ADFF2F]/40 transition-colors">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
            </div>
            <div>
                <p className="text-sm font-bold text-white tracking-tight">{testimonial.name}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.1em] text-white/30">{testimonial.role}</p>
            </div>
        </div>
    </div>
);

const Testimonials = () => {
    const { testimonials } = siteContent;

    const columns = [
        { start: 0, end: 3, className: "animate-scroll-up-1" },
        { start: 3, end: 6, className: "hidden md:block animate-scroll-up-2" },
        { start: 6, end: 9, className: "hidden lg:block animate-scroll-up-3" }
    ];

    return (
        <section className="bg-black flex flex-col items-center justify-center py-32 px-6 font-['Geist'] overflow-hidden relative">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ADFF2F]/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="text-center mb-20 max-w-2xl relative z-10">
                <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 rounded-full text-[#ADFF2F]">
                    {testimonials.title}
                </span>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none uppercase">
                    Our Partners <span className="text-metallic italic">Speaks</span>
                </h2>
                <p className="text-white/30 text-sm md:text-base font-medium leading-relaxed">
                    {testimonials.description}
                </p>
            </div>

            <div className="relative w-full max-w-7xl overflow-hidden mt-10">
                {/* Vertical Fade Masks */}
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-20 pointer-events-none"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[700px] overflow-hidden relative z-10">
                    {columns.map((col, colIndex) => (
                        <div key={colIndex} className={`${col.className} flex flex-col`}>
                            {/* Double the items for seamless loop */}
                            {[...testimonials.items.slice(col.start, col.end), ...testimonials.items.slice(col.start, col.end)].map((testimonial, index) => (
                                <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

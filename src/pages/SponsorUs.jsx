// SponsorUs.jsx
// import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, LucideLink } from 'lucide-react';
import { HERO_DATA, SPONSORS_LOGOS, PERKS, WHAT_WE_PROVIDE, WHAT_WE_EXPECT } from '../data.js';

// Small Reveal helper consistent with Home.jsx
const Reveal = ({ children, delay = 0, duration = 0.5, amount = 0.1 }) => {
    const variants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration, delay } },
    };
    return (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount }} variants={variants}>
            {children}
        </motion.div>
    );
};

export default function SponsorUs() {
    const brochureUrl = (HERO_DATA && HERO_DATA.brochureLink) || '/sponsor-deck.pdf';

    return (
        <div className="w-full min-h-screen md:pt-32 pt-24 pb-12 text-white">
            {/* Header / Hero */}
            <section className="mx-auto max-w-[1500px] px-6 mb-12">
                {/* Removed 'text-center' from the main grid container to allow block-level centering on mobile */}
                <div className="grid mx-auto md:grid-cols-[55fr_60fr] gap-8 items-center">


                    <Reveal delay={0} duration={0.7}>
                        {/* Added 'text-center md:text-left' and 'mx-auto md:mx-0' to center content block on mobile */}
                        <div className="text-center md:text-left mx-auto md:mx-0">
                            <h1 className="text-4xl md:text-5xl font-bold"><span className="text-tech-gold">Sponsor</span> <span className="text-white">Us</span></h1>
                            <br />
                            {/* Added 'mx-auto md:mx-0' to center the paragraph (which has max-w) on mobile */}
                            <p className="text-slate-300 mb-6s max-w-xl mx-auto md:mx-0">
                                Support our team to accelerate innovation - through funding, hardware, software or mentorship.
                                We convert sponsorship into measurable outcomes: competitions won, talent developed, and technology demonstrated.
                            </p>

                            {/* Added 'justify-center md:justify-start' to center the buttons on mobile */}
                            <div className="flex gap-4 justify-center md:justify-start py-4">
                                <a
                                    href={brochureUrl}
                                    download
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-tech-accent to-brand-highlight py-3 px-6 rounded-full font-semibold shadow-lg hover:scale-[1.02] transition-transform"
                                >
                                    <Download size={18} /> Brochure
                                </a>

                                {/* Contact → use react-router Link so navigation works inside SPA */}
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 border border-slate-700 py-3 px-6 rounded-full font-semibold hover:bg-white/5 transition"
                                >
                                    <LucideLink size={18} /> Contact
                                </Link>
                            </div>

                            {/* Quick stats */}
                            {/* Added 'justify-center md:justify-start' to center stat cards on mobile */}
                            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
                                <motion.div whileHover={{ y: -3 }} className="bg-card-gradient py-2 px-4 rounded-lg shadow">
                                    <div className="text-xs text-slate-300">Team size</div>
                                    <div className="font-bold text-lg">45+ students</div>
                                </motion.div>
                                <motion.div whileHover={{ y: -3 }} className="bg-card-gradient py-2 px-4 rounded-lg shadow">
                                    <div className="text-xs text-slate-300">Reach</div>
                                    <div className="font-bold text-lg">Campus + National Events</div>
                                </motion.div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Photo placeholder (NOW A REAL IMAGE, same container & styling preserved) */}
                    <Reveal delay={0.15} duration={0.7}>
                        <div className="relative w-full h-full flex justify-end items-center">
                            <img
                                src={HERO_DATA.teamPhoto}
                                alt="Sponsor Visual"
                                className="max-h-full object-cover border border-slate-700 rounded-2xl"
                            />
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Perks */}
            <section className="py-5 relative">
                <div className="container mx-auto px-6">
                    <Reveal duration={0.5} delay={0.15}>
                        {/* Heading updated for consistency with the example */}
                        <h3 className="text-2xl font-bold mb-6 text-center">How you can help - and what we do with it</h3>
                    </Reveal>

                    <div className="grid md:grid-cols-4 gap-6">
                        {PERKS.map((p, i) => (
                            <Reveal key={i} delay={0.1} duration={0.5} amount={0.2}>
                                {/* Card structure updated: removed motion.div, added centered text, prominent hover/border */}
                                <div className="bg-card-gradient p-6 rounded-xl text-center hover:-translate-y-2 transition duration-300 shadow-lg border-t-2 border-transparent hover:border-tech-gold">
                                    {/* Icon sizing, centering, and spacing updated */}
                                    <p.icon size={40} className="mx-auto mb-4 text-slate-400" color="#E3AF64" />
                                    {/* Title styling updated */}
                                    <h4 className="text-xl font-bold text-white mb-2">{p.title}</h4>
                                    {/* Description styling updated */}
                                    <p className="text-md text-slate-400">{p.desc}</p>
                                    {/* Text content below here remains as-is, but list alignment is adjusted for the centered card */}
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
            {/* What we provide / expect */}
            <section className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <Reveal>
                        <div className="bg-card-gradient p-6 rounded-xl border border-slate-700 shadow-lg hover:border-tech-gold transition duration-300">
                            <h4 className="text-xl font-bold mb-3">What we provide</h4>
                            <ul className="list-disc list-inside text-slate-300 space-y-2">
                                {WHAT_WE_PROVIDE.map((w, i) => (
                                    <li key={i}>{w}</li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    <Reveal>
                        <div className="bg-card-gradient p-6 rounded-xl border border-slate-700 shadow-lg hover:border-tech-gold transition duration-300">
                            <h4 className="text-xl font-bold mb-3">What we expect</h4>
                            <ul className="list-disc list-inside text-slate-300 space-y-2">
                                {WHAT_WE_EXPECT.map((w, i) => (
                                    <li key={i}>{w}</li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* Sponsors */}
            <section className="py-16 relative">
                <div className="container mx-auto px-6 mb-8 text-center">
                    <Reveal delay={0.15} duration={0.5}>
                        <h2 className="text-3xl font-bold text-center mb-12 text-tech-gold">Our Current Sponsors</h2>
                    </Reveal>
                </div>

                <Reveal delay={0.15} duration={0.5}>
                    <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-8 max-w-8xl mx-auto px-6">
                        {SPONSORS_LOGOS.map((sponsor, i) => (
                            <Reveal key={i} delay={0.05} duration={0.5} once={false}>
                                <a href={sponsor.websiteUrl} target="_blank" rel="noopener noreferrer" className="block transform transition hover:scale-105">
                                    <img
                                        src={sponsor.logoUrl}
                                        alt={`Sponsor ${i + 1}`}
                                        className="h-15 max-w-[250px] opacity-70 hover:opacity-100 transition duration-300 rounded-lg"
                                    />
                                </a>
                            </Reveal>
                        ))}
                    </div>
                </Reveal>
            </section>
        </div>
    );
}

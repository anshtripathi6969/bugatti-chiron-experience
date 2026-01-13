'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import CipherReveal from '@/components/CipherReveal';

const HeroSection = memo(function HeroSection({ section }: { section: any }) {
    return (
        <section className="h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* Background Layer - Full Color & Visibility */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
            >
                <img src={section.image} className="w-full h-full object-cover brightness-[0.8]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            </motion.div>

            {/* Main Content Container */}
            <div className="relative z-10 w-full max-w-[90vw] h-full flex flex-col justify-between py-12 md:py-20 pointer-events-none">

                {/* Top Bar: Technical Data */}
                <div className="flex justify-between items-start text-[10px] md:text-xs font-mono tracking-widest text-white/70 uppercase mix-blend-difference">
                    <div className="flex flex-col gap-1">
                        <span>Sys.Online</span>
                        <span>Molsheim, France</span>
                        <span>48.52° N, 7.49° E</span>
                    </div>
                    <div className="flex flex-col gap-1 text-right">
                        <span>Chassis: Carbon-K</span>
                        <span>Engine: W16-8.0</span>
                        <span className="text-bugatti-light animate-pulse">Status: Ready</span>
                    </div>
                </div>

                {/* Center: Massive Glowing Logo with Blend Mode */}
                <div className="flex flex-col items-center justify-center -mt-10">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="text-[18vw] font-black italic tracking-tighter leading-none select-none text-white drop-shadow-[0_0_50px_rgba(34,211,238,0.8)] pr-14"
                    >
                        <CipherReveal text="BUGATTI" />
                    </motion.h1>

                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/50 to-transparent mt-4 mb-8 mix-blend-overlay"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="text-white font-mono tracking-[0.8em] text-xs md:text-sm uppercase mix-blend-difference"
                    >
                        Automobiles Ettore Bugatti
                    </motion.p>
                </div>

                {/* Bottom Bar: Manifesto */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end border-t border-white/20 pt-8 mix-blend-difference text-white">
                    <div className="hidden md:block">
                        <p className="text-xs leading-relaxed max-w-xs text-justify opacity-80">
                            "If comparable, it is no longer Bugatti." <br />
                            The pursuit of perfection is not a goal, but a requirement.
                            Engineering art since 1909.
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-end h-full">
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-[10px] tracking-[0.3em] uppercase opacity-50">Initialize_Scroll</span>
                            <div className="w-px h-12 bg-white" />
                        </motion.div>
                    </div>

                    <div className="hidden md:flex justify-end items-end gap-8">
                        <div>
                            <span className="block text-4xl font-black italic opacity-50">1500</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-80">Horsepower</span>
                        </div>
                        <div>
                            <span className="block text-4xl font-black italic opacity-50">420</span>
                            <span className="text-[10px] uppercase tracking-widest opacity-80">KM/H</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default HeroSection;

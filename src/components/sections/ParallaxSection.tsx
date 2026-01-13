'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxSection({ section, layout }: { section: any, layout: string }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    return (
        <section ref={ref} className={`min-h-screen relative flex items-center justify-center py-40 overflow-hidden ${layout === 'blueprint' ? 'bg-white text-black' : ''}`}>
            <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]) }} className="absolute inset-0 z-0">
                <img src={section.image} className={`w-full h-full object-cover ${layout === 'blueprint' ? '' : 'brightness-[0.5]'}`} />
            </motion.div>
            <div className="relative z-10 max-w-7xl mx-auto px-8 grid gap-20 items-center">
                <div>
                    <h3 className="text-8xl font-black italic uppercase leading-[0.85] mb-8">{section.title}</h3>
                    <p className="text-xl font-light leading-relaxed max-w-lg mb-12">{section.description}</p>
                </div>
            </div>
        </section>
    );
}

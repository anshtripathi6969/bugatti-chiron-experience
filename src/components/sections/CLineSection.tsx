'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function CLineSection({ section }: { section: any }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const pathLength = useSpring(useTransform(scrollYProgress, [0.2, 0.8], [0, 1]), { stiffness: 40, damping: 20 });

    return (
        <section ref={ref} className="h-screen bg-neutral-950 flex items-center justify-center relative overflow-hidden">

            <div className="absolute inset-0 opacity-20">
                <img src="/blueprint.png" className="w-full h-full object-cover grayscale invert" />
            </div>

            <div className="relative z-10 w-[60vh] h-[80vh]">
                <svg viewBox="0 0 100 200" className="w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    <motion.path
                        d="M 80 10 C 20 10, 10 50, 10 100 C 10 150, 20 190, 80 190"
                        fill="transparent"
                        stroke="#22D3EE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{ pathLength }}
                    />
                </svg>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <h2 className="text-8xl font-black italic text-stroke">THE C-LINE</h2>
                </div>
            </div>
        </section>
    )
}

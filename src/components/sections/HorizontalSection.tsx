'use client';

import { useRef, memo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Hyperspace from '@/components/Hyperspace';

const HorizontalSection = memo(function HorizontalSection({ section }: { section: any }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const xSpring = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]), { stiffness: 100, damping: 30 });

    return (
        <section ref={ref} className="h-[200vh] relative z-20">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center bg-neutral-900">
                <Hyperspace />
                <motion.div style={{ x: xSpring }} className="flex items-center gap-20 pl-[10vw] relative z-10">
                    <h2 className="text-[20vw] font-black italic whitespace-nowrap leading-none text-stroke">{section.title}</h2>
                    <div className="min-w-[50vw] h-[60vh] relative overflow-hidden skew-x-12 border-4 border-bugatti-light/20">
                        <img src={section.image} className="w-full h-full object-cover scale-125" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default HorizontalSection;

'use client';

import { useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import HeroSection from '@/components/sections/HeroSection';
import HorizontalSection from '@/components/sections/HorizontalSection';
import XRaySection from '@/components/sections/XRaySection';
import CLineSection from '@/components/sections/CLineSection';
import TelemetrySection from '@/components/sections/TelemetrySection';
import SplitSection from '@/components/sections/SplitSection';
import ParallaxSection from '@/components/sections/ParallaxSection';

export default function SectionDispatcher({ section, index, setActive }: { section: any, index: number, setActive: (i: number) => void }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        if (typeof v === 'number' && v > 0.2 && v < 0.8) setActive(index);
    });

    const content = (() => {
        switch (section.layout) {
            case 'hero': return <HeroSection section={section} />;
            case 'horizontal': return <HorizontalSection section={section} />;
            case 'xray': return <XRaySection section={section} />;
            case 'cline': return <CLineSection section={section} />;
            case 'telemetry': return <TelemetrySection section={section} />;
            case 'split': return <SplitSection section={section} />;
            default: return <ParallaxSection section={section} layout={section.layout} />;
        }
    })();

    return <div ref={ref} className="w-full relative">{content}</div>;
}

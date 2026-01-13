'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { SECTIONS } from '@/utils/assets';
import Lenis from 'lenis';
import { MoveRight } from 'lucide-react';
import Hyperspace from '@/components/Hyperspace';
import HeroSection from '@/components/sections/HeroSection';
import HorizontalSection from '@/components/sections/HorizontalSection';
import XRaySection from '@/components/sections/XRaySection';
import CLineSection from '@/components/sections/CLineSection';
import TelemetrySection from '@/components/sections/TelemetrySection';
import SplitSection from '@/components/sections/SplitSection';
import ParallaxSection from '@/components/sections/ParallaxSection';
import CustomCursor from '@/components/ui/CustomCursor';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  // Smooth Scroll Init
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <main ref={containerRef} className="bg-neutral-980 text-white min-h-[600vh] selection:bg-bugatti-light selection:text-black transition-all duration-1000">

      <CustomCursor />

      <div className={`transition-all duration-1000 ${activeSection === 8 ? 'blueprint-mode' : ''}`}>
        {SECTIONS.map((section, index) => (
          <SectionDispatcher
            key={section.id}
            section={section}
            index={index}
            setActive={setActiveSection}
          />
        ))}
      </div>

      <Footer />
    </main>
  );
}

function SectionDispatcher({ section, index, setActive }: { section: any, index: number, setActive: (i: number) => void }) {
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







// --- EXISTING SECTIONS (Simplified reuse) ---









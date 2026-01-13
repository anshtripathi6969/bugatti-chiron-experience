'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValue, useMotionValueEvent } from 'framer-motion';
import { SECTIONS } from '@/utils/assets';
import Lenis from 'lenis';
import { MoveRight } from 'lucide-react';
import Hyperspace from '@/components/Hyperspace';
import SectionDispatcher from '@/components/layout/SectionDispatcher';

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







// --- EXISTING SECTIONS (Simplified reuse) ---









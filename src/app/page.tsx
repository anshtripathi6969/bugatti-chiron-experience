'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent, useAnimationFrame } from 'framer-motion';
import { SECTIONS } from '@/utils/assets';
import Lenis from 'lenis';
import { MoveRight } from 'lucide-react';
import Hyperspace from '@/components/Hyperspace';
import HeroSection from '@/components/sections/HeroSection';
import HorizontalSection from '@/components/sections/HorizontalSection';
import XRaySection from '@/components/sections/XRaySection';
import CLineSection from '@/components/sections/CLineSection';
import TelemetrySection from '@/components/sections/TelemetrySection';

export default function Home() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  // Custom Cursor Logic
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

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

      <motion.div
        className="custom-cursor hidden md:block"
        style={{ x: cursorX, y: cursorY }}
      />

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

      <footer className="h-[80vh] bg-black flex flex-col items-center justify-center relative z-20 overflow-hidden border-t border-red-900/30">
        {/* Red Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black pointer-events-none" />

        <div className="relative z-10 text-center">
          <h1 className="text-[15vw] font-black italic tracking-tighter text-neutral-900 select-none leading-none opacity-50">BUGATTI</h1>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8 whitespace-nowrap mix-blend-screen">
            <p className="text-red-500 font-mono tracking-[0.5em] text-sm md:text-base uppercase animate-pulse shadow-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
              System Override // 0xFF
            </p>

            <div className="h-px w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent" />

            <a
              href="https://github.com/anshtripathi6969"
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center gap-2 group cursor-none"
            >
              <span className="text-3xl md:text-5xl font-black italic uppercase text-white group-hover:text-red-500 transition-colors duration-300 drop-shadow-2xl">
                BUILT BY <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">ANSH TRIPATHI</span>
              </span>
              <span className="text-neutral-500 text-xs font-mono tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                github.com/anshtripathi6969
              </span>
            </a>
          </div>
        </div>
      </footer>

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





function ParallaxSection({ section, layout }: { section: any, layout: string }) {
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

function SplitSection({ section }: { section: any }) {
  return (
    <section className="h-screen flex relative z-30 bg-black">
      <div className="w-1/2 h-full relative overflow-hidden border-r border-white/10 group">
        <img src={section.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 filter hue-rotate-180" />
      </div>
      <div className="w-1/2 h-full relative overflow-hidden group">
        <img src={section.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-8 py-4 border border-white/20">
        <span className="font-mono text-xs tracking-[0.5em] uppercase">VS</span>
      </div>
    </section>
  )
}

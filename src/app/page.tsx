'use client';

import { useState, useRef } from 'react';
import { SECTIONS } from '@/utils/assets';
import SectionDispatcher from '@/components/layout/SectionDispatcher';
import CustomCursor from '@/components/ui/CustomCursor';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/utils/SmoothScroll';

export default function Home() {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  return (
    <main ref={containerRef} className="bg-neutral-980 text-white min-h-[600vh] selection:bg-bugatti-light selection:text-black transition-all duration-1000">

      <SmoothScroll />
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

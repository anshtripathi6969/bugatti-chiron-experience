'use client';

import { useState, useRef } from 'react';
import { MoveRight } from 'lucide-react';

export default function XRaySection({ section }: { section: any }) {
    const [sliderPos, setSliderPos] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        setSliderPos(x);
    }

    return (
        <section className="h-screen flex flex-col items-center justify-center relative bg-neutral-900 overflow-hidden cursor-crosshair"
            ref={containerRef} onMouseMove={handleMouseMove}>

            <div className="absolute top-10 text-center z-20 mix-blend-difference">
                <h2 className="text-6xl font-black italic uppercase">{section.title}</h2>
                <p className="opacity-70 mt-4 tracking-widest uppercase text-sm">Drag to Reveal</p>
            </div>

            <div className="relative w-[90vw] h-[60vh]">
                {/* Bottom Layer: Carbon */}
                <img src={section.image2} className="absolute inset-0 w-full h-full object-contain pointer-events-none" />

                {/* Top Layer: Paint (Masked) */}
                <div className="absolute inset-0 w-full h-full" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                    <img src={section.image} className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                </div>

                {/* Slider Line */}
                <div className="absolute top-0 bottom-0 w-[2px] bg-bugatti-light/50 shadow-[0_0_20px_#22d3ee] pointer-events-none" style={{ left: `${sliderPos}%` }}>
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center bg-black/50 backdrop-blur-md">
                        <MoveRight className="w-4 h-4 text-white" />
                    </div>
                </div>
            </div>
        </section>
    );
}

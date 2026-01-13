'use client';

import { useState, useRef } from 'react';
import { useScroll, useTransform, useAnimationFrame } from 'framer-motion';

export default function TelemetrySection({ section }: { section: any }) {
    const [speed, setSpeed] = useState(0);
    const [rpm, setRpm] = useState(0);
    const [gear, setGear] = useState(1);
    const ref = useRef(null);
    const isInView = useTransform(useScroll({ target: ref }).scrollYProgress, [0, 1], [0, 1]);

    useAnimationFrame((t) => {
        // Simulate speed ramping up 0-420
        const ramp = (Math.sin(t / 2000) + 1) / 2; // 0 to 1
        setSpeed(Math.floor(ramp * 440));

        // Simulate RPM 1000-8000
        const rpmVal = (ramp * 8000) % 8000;
        setRpm(Math.floor(rpmVal < 1000 ? 1000 : rpmVal));

        // Simulate Gear
        setGear(Math.min(7, Math.floor((ramp * 440) / 60) + 1));
    });

    return (
        <section ref={ref} className="h-screen bg-black flex flex-col items-center justify-center relative border-y border-white/10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-bugatti-dark/30 to-black pointer-events-none" />

            <div className="grid grid-cols-3 gap-12 text-center z-10 w-full max-w-6xl px-12">

                <div className="flex flex-col items-center justify-center border border-white/10 p-12 bg-black/50 backdrop-blur-md">
                    <span className="text-bugatti-light tracking-[0.5em] text-xs font-bold mb-4 uppercase">Engine RPM</span>
                    <div className="text-7xl font-mono font-bold text-white tabular-nums">
                        {rpm}
                    </div>
                    <div className="w-full h-1 bg-neutral-800 mt-4 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: `${(rpm / 8000) * 100}%` }} />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center border-x border-bugatti-light/30 p-12 relative">
                    <span className="text-white tracking-[0.5em] text-xs font-bold mb-4 uppercase animate-pulse">Velocity</span>
                    <div className="text-9xl font-black italic text-bugatti-light tabular-nums drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                        {speed}
                    </div>
                    <span className="text-xl font-bold text-neutral-500">KM/H</span>
                </div>

                <div className="flex flex-col items-center justify-center border border-white/10 p-12 bg-black/50 backdrop-blur-md">
                    <span className="text-bugatti-light tracking-[0.5em] text-xs font-bold mb-4 uppercase">Transmission</span>
                    <div className="text-8xl font-black text-white tabular-nums">
                        {gear}
                    </div>
                    <span className="text-sm text-neutral-500 mt-2 uppercase">Dual Clutch</span>
                </div>

            </div>
        </section>
    )
}

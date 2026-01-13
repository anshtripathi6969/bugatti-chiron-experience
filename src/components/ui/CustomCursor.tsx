'use client';

import { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
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

    return (
        <motion.div
            className="custom-cursor hidden md:block"
            style={{ x: cursorX, y: cursorY }}
        />
    );
}

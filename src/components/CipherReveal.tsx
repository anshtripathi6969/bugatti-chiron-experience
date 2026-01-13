'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CipherRevealProps {
    text: string;
    className?: string;
}

export default function CipherReveal({ text, className }: CipherRevealProps) {
    const [display, setDisplay] = useState('');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplay(
                text.split('').map((char, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('')
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3; // Slower reveal
        }, 50);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {display}
        </motion.span>
    );
}

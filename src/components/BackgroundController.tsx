'use client';

import { motion, AnimatePresence } from 'framer-motion';

export default function BackgroundController({ activeImage }: { activeImage: string }) {
    return (
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-neutral-950">
            <AnimatePresence mode='popLayout'>
                <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <motion.img
                        src={activeImage}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1.0 }}
                        transition={{ duration: 10, ease: "linear" }} // Slow Ken Burns effect
                        className="w-full h-full object-cover brightness-[0.4]"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Cinematic Vignette only on edges */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#000000_150%)] pointer-events-none" />

            {/* Texture */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
            />
        </div>
    );
}

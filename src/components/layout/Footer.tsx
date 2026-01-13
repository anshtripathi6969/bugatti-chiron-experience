'use client';

export default function Footer() {
    return (
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
    );
}
